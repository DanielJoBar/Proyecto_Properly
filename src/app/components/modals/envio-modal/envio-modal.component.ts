import { ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonButton, IonHeader, IonItem, IonTitle, IonToolbar, IonButtons, IonContent } from "@ionic/angular/standalone";
import { Envio } from 'src/app/modelos/envio';
@Component({
  selector: 'app-envio-modal',
  templateUrl: './envio-modal.component.html',
  styleUrls: ['./envio-modal.component.scss'],
  imports: [IonContent, IonButtons, IonToolbar, IonTitle, IonItem, IonHeader, IonButton, CommonModule, FormsModule]
})
export class EnvioModalComponent  implements OnInit {

  id:number=1;
  comentarios: string="";
 

  constructor(private modalCtrl: ModalController) { }
  ngOnInit() {}
  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    let response:any = {
      id: 0,
      comentario: ''
    }
    return this.modalCtrl.dismiss(response, 'confirm');
  }
}
