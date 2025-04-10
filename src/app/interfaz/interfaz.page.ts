import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {  IonTitle, IonToolbar, IonContent } from '@ionic/angular/standalone';
import { SharedModule } from '../shared.module';

@Component({
  selector: 'app-interfaz',
  templateUrl: './interfaz.page.html',
  styleUrls: ['./interfaz.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule,SharedModule],
})
export class InterfazPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
