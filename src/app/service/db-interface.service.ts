import { Injectable } from '@angular/core';
//Importamos la libreria
import { openDB, IDBPDatabase } from "idb";
//Importamos el esquema hecho
import {MyDB} from './index-db';

@Injectable({
  providedIn: 'root'
})
export class DbInterfaceService {

  private db: Promise <IDBPDatabase<MyDB>>; //Conexion con la bbdd
  private nombreDB = 'DDBB'; //Nombre de la bbdd
  

  constructor() {
    //iniciamos la bbdd
    this.db = this.createDatabase(); //inicio la base de dato
   }
   //Esto debe crear nuestra DB
   private async createDatabase() {
    return openDB<MyDB>(this.nombreDB, 1, {
      upgrade(db) {
        // Creamos las tablas verificando si existen
        if(!db.objectStoreNames.contains('usuarios')){
          db.createObjectStore('usuarios',{keyPath: 'username'});
          console.log('Tabla usuarios creada');
        }

        if (!db.objectStoreNames.contains('fichero')) {
          const ficheroContenedor  = db.createObjectStore('fichero', { keyPath: 'id' });  
          ficheroContenedor.createIndex('nombre','nombre',{unique:false});
        }
        if(!db.objectStoreNames.contains('envio')){
          const envioContenedor = db.createObjectStore('contenedor',{keyPath:'id'})
          envioContenedor.createIndex('timestamp','timestamp',{unique:false}) //indice por timestamp
          envioContenedor.createIndex('fichero_id','fichero_id',{unique:false}) //relacion con fichero
        }
        if(!db.objectStoreNames.contains('proyecto')){
          const proyectoContenedor = db.createObjectStore('proyecto',{keyPath:'id'})
          proyectoContenedor.createIndex('nombre','nombre',{unique:false})
          proyectoContenedor.createIndex('envio_id','envio_id',{unique:false})

        }
        if(!db.objectStoreNames.contains('incidencia')){
          const inciContenedor = db.createObjectStore('incidencia',{keyPath:'id'})
          inciContenedor.createIndex('timestamp', 'timestamp', { unique: false }); // Índice por timestamp
          inciContenedor.createIndex('user_id', 'user_id', { unique: false }); // Relación con usuario
          inciContenedor.createIndex('incidencia_anterior_id', 'incidencia_anterior_id', { unique: false }); // Relación con incidencia anterior
          inciContenedor.createIndex('proyecto_id', 'proyecto_id', { unique: false }); // Relación con proyecto
        }
      }
    });
  }

    //Metodo de insert
    //El storeName es la tabla, al poner any puede ser cualquiera pero tiene que 
    //coincidir con lo que tenemos. Any puede ser cualquier objeto
  public async anadirObjeto(storeName:any,item:any){
    try {
      const db = await this.db;
      await db.put(storeName, item);
      console.log('Objeto añadido');
    } catch (error) {
      console.error('error al añadir', error);
      throw error;
    }
  }
  
  //metodo update
  public async updateObjeto (storeName:any,item:any){
    try {
      const db = await this.db;
      const existe = await db.get(storeName, item.id); // Cambiamos segun la id
      if (existe) {
        await db.put(storeName, item);
        console.log('Objeto actualizado');
      } else {
        console.warn('El objeto no existe ');
      }
    } catch (error) {
      console.error('error');
      throw error;
    }
  }
  //metodo delete
  public async borrarObjeto (storeName:any,key:any){
    try{
    const db = await this.db;
    await db.delete (storeName,key);
    console.log('El objeto se ha eliminado correctamente')
    }catch(error){
      console.error('Error al eliminar')
    }
  }


  //registrar usuario
  public async validarCredenciales(username: string, password: string): Promise<boolean> {
    try {
      const db = await this.db;
      const usuario = await db.get('usuarios', username); // Busca al usuario en la tabla
      console.log('Usuario recuperado de la base de datos:', usuario); // Agrega este log
      return usuario && usuario.password === password; // Compara la contraseña
    } catch (error) {
      console.error('Error al validar credenciales:', error);
      throw error;
    }
  }

  // Ver las tablas oara ver si se han creado
// Ver las tablas y además obtener los datos de 'usuarios'
public async Tablas(): Promise<{ tablas: string[], usuarios: any[] }> {
  const db = await this.db; // esperamos la conexión con la base de datos

  const tablas = Array.from(db.objectStoreNames); // obtenemos los nombres de las tablas

  let usuarios: any[] = []; // inicializamos el arreglo de usuarios

  // Verificamos si existe la tabla 'usuarios' antes de intentar obtener los datos
  if (tablas.includes('usuarios')) {
    const tx = db.transaction('usuarios', 'readonly'); // iniciamos una transacción de solo lectura
    const store = tx.objectStore('usuarios'); // accedemos a la tabla 'usuarios'
    usuarios = await store.getAll(); // obtenemos todos los datos de la tabla 'usuarios'
  }

  return { tablas, usuarios }; // retornamos un objeto con los nombres de las tablas y los datos de 'usuarios'
}


  

}

