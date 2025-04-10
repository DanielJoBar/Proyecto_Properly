import { Envio } from '../modelos/envio';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DbInterfaceService } from '../service/db-interface.service';

@Injectable({
  providedIn: 'root'
})
export class EnvioService {

  constructor(private dbService:DbInterfaceService) { }
  
    // BehaviorSubject inicializado con un ejemplo de envios
  private envios$ = new BehaviorSubject<Envio[]>([
    { id: 1, comentario: 'Envio Uno' },
    { id: 2, comentario: 'Envio Dos' },
    { id: 3, comentario: 'Envio Tres' }
  ]);
    // Observable para obtener los envios
  _envios = this.envios$.asObservable();

    // Método para obtener todos los envios
  getAllEnvios():Observable<Envio[]> {
    this._envios.forEach((envios:Envio[])=>{
      envios.forEach((envio:Envio)=>{console.log(envio)})
    })
    return this._envios;
  }
    // Método para crear un nuevo envio
  createOneEnvio(envio:Envio):void{
    envio.fichero_id = Math.random()*1000;
    envio.id  = Math.random()*10000;
    envio.procesado = false;
    envio.timestamp = new Date();
    //Actualiza el behaviour
      //Obtiene la lista actual
      const listaActual = this.envios$.getValue(); 
      ///Agrega el nuevo envio
      const nuevaLista = [...listaActual, envio]; 
      //Actualiza la lista
      this.envios$.next(nuevaLista);
    
      //Añade el objeto Envio a la base de datos (REVISAR)
      this.addObjectToDatabase(envio);
  }
  async addObjectToDatabase(envio:Envio){
    await this.dbService.anadirObjeto('envio', envio);
  }
}
