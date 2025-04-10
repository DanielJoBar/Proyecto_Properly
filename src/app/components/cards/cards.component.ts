import { incidencia } from './../../service/index-db';
import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonCard } from '@ionic/angular/standalone';
import { Envio } from 'src/app/modelos/envio';
import { SharedModule } from 'src/app/shared.module';
import { Incidencia } from 'src/app/modelos/incidencia';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
  imports: [CommonModule, FormsModule,IonCard]
})
export class CardsComponent implements OnInit {

  @Input() objeto!: Envio|Incidencia;
  constructor() {}

  ngOnInit() { console.log("Objecto receptor  " +this.objeto)}

}
