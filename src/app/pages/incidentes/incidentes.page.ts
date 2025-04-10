import { Incidencia } from './../../modelos/incidencia';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { Observable } from 'rxjs';
import { IncidenciaService } from 'src/app/services/incidencias.service';
import { ModalController } from '@ionic/angular';
import { SharedModule } from 'src/app/shared.module';
import { CardsComponent } from 'src/app/components/cards/cards.component';
import { EnvioModalComponent } from 'src/app/components/modals/envio-modal/envio-modal.component';

@Component({
  selector: 'app-incidentes',
  templateUrl: './incidentes.page.html',
  styleUrls: ['./incidentes.page.scss'],
  standalone: true,
  imports: [SharedModule, CommonModule, FormsModule,CardsComponent]
})
export class IncidentesPage implements OnInit {

  incidencias$: Observable<Incidencia[]> | undefined;
  constructor(private incidenciaService: IncidenciaService, private modalCtrl: ModalController) { }

  ngOnInit() {
    this.incidencias$ = this.incidenciaService.getAllIncidencias();
  }
  async openModal() {
    const modal = await this.modalCtrl.create({
      component: EnvioModalComponent,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();
    // Comprobar el rol que llega del modal
    if (role === 'confirm') {
      let incidencia:Incidencia = {'id':data.id,'comentario':data.comentario}
      this.incidenciaService.createOneIncidencia(incidencia);
    }
  }
}
