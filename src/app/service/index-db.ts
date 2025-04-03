import {DBSchema} from "idb";
//importamos el DBSchema desde idb




//Interfaces

export interface usuario {  //Definimos la estructura de los objetos
    username: string; //pk
    password: string; //contra
}

export interface fichero {
    id:number, //PK
    nombre: string,
    extension: "jpg" | "pdf" | "png" | "doc" | "xlsx"
}

export interface envio {
    id:number, //pk
    timestamp: Date,
    comentarios: string,
    procesado: boolean,
    fichero_id:number //Relacionamos con tabla fichero
    // Es opcional por la ?
}

export interface proyecto{
    id: number,
    nombre: string,
    descripcion: string,
    envio_id?: number //relacionamos con envio

}

export interface incidencia {
    id:number,
    timestamp:Date,
    comentarios: string,
    //Relaciones
    user_id?:number,
    incidencia_anterior_id?: number,
    proyecto_id?: number
}

export interface MyDB {
//Definimos el esquema general de la base de datos
    usuarios:{  //tabla usuarios
        key:string; //PK
        value: usuario; //Valores = a los almacenados ariba
    }

    fichero:{
        key:number;
        value: fichero;
    };
    envio:{
        key:number;
        value: envio;
    };
    proyecto:{
        key:number;
        value:proyecto;
    };
    incidencia:{
        key:number;
        value:incidencia;
    };





}