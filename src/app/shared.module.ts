import { IonTitle, IonCard, IonHeader } from '@ionic/angular/standalone';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { CardsComponent } from './components/cards/cards.component';

@NgModule({
  declarations: [
   
  ],
  imports: [CommonModule, IonicModule, FormsModule, 
    ReactiveFormsModule,RouterModule,CardsComponent,
    IonTitle,
    IonCard,
    IonHeader
  ],
  exports: [
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    CardsComponent,
    IonTitle,
    IonCard,
    IonHeader
  ]
})
export class SharedModule {}