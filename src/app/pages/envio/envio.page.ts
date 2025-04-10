import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonTitle, IonToolbar, IonContent, IonButton, IonIcon } from '@ionic/angular/standalone';
import { Observable } from 'rxjs';
import { Envio } from 'src/app/modelos/envio';
import { EnvioService } from 'src/app/services/envio.service';
import { CardsComponent } from 'src/app/components/cards/cards.component';
import { SharedModule } from 'src/app/shared.module';
import { AppComponent } from 'src/app/app.component';
import { ModalController } from '@ionic/angular';
import { EnvioModalComponent } from 'src/app/components/modals/envio-modal/envio-modal.component';

@Component({
  selector: 'app-envio',
  templateUrl: './envio.page.html',
  styleUrls: ['./envio.page.scss'],
  standalone: true,
  imports: [SharedModule, CommonModule, FormsModule, CardsComponent],
})
export class EnvioPage implements OnInit {

  envios$: Observable<Envio[]> | undefined ;

  constructor(private enviosService: EnvioService,private modalCtrl: ModalController) {  }

  ngOnInit():void{
    this.envios$ = this.enviosService.getAllEnvios();

  }
  async openModal() {
    const modal = await this.modalCtrl.create({
      component: EnvioModalComponent,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();
    //Comprueba que rol le llega del modal(si se ha hehcoo desde x sitio
    //  o si se a confirmado o cancelado)
    if (role === 'confirm') {
      let envio:Envio = {'id':data.id,'comentario':data.comentario}
      this.enviosService.createOneEnvio(envio);
    }
  }
}
