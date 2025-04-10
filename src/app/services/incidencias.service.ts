import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DbInterfaceService } from '../service/db-interface.service';
import { Incidencia } from '../modelos/incidencia';

@Injectable({
  providedIn: 'root'
})
export class IncidenciaService {

  constructor(private dbService: DbInterfaceService) { }
  
  // BehaviorSubject inicializado con un ejemplo de incidencias
  private incidencias$ = new BehaviorSubject<Incidencia[]>([
    { id: 1, comentario: 'Incidencia Uno', timestamp: new Date() },
    { id: 2, comentario: 'Incidencia Dos', timestamp: new Date() },
    { id: 3, comentario: 'Incidencia Tres', timestamp: new Date() }
  ]);

  // Observable para obtener las incidencias
  _incidencias = this.incidencias$.asObservable();

  // Método para obtener todas las incidencias
  getAllIncidencias(): Observable<Incidencia[]> {
    this._incidencias.forEach((incidencias: Incidencia[]) => {
      incidencias.forEach((incidencia: Incidencia) => {
        console.log(incidencia);
      });
    });
    return this._incidencias;
  }

  // Método para crear una nueva incidencia
  createOneIncidencia(incidencia: Incidencia): void {
    incidencia.id = Math.floor(Math.random() * 10000); 
    incidencia.timestamp = new Date();
    incidencia.incidencia_anterior_id = Math.floor(Math.random() * 10000); 
    incidencia.user_id = Math.floor(Math.random() * 10000); 

    // Obtener la lista actual de incidencias
    const listaActual = this.incidencias$.getValue();
    // Crear una nueva lista con la nueva incidencia
    const nuevaLista = [...listaActual, incidencia];
    // Actualizar el BehaviorSubject
    this.incidencias$.next(nuevaLista);

    // Añadir la incidencia a la base de datos
    this.addObjectToDatabase(incidencia);
  }

  // Método para añadir la incidencia a la base de datos
  async addObjectToDatabase(incidencia: Incidencia) {
    await this.dbService.anadirObjeto('incidencia', incidencia);
  }
}
