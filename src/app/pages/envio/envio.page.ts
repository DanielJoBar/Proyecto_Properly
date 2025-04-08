import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { BehaviorSubject, Observable } from 'rxjs';
import { Carta } from 'src/app/modelos/carta';
import { CartaService } from 'src/app/services/carta.service';
import { SharedModule } from 'src/app/shared.module';

@Component({
  selector: 'app-envio',
  templateUrl: './envio.page.html',
  styleUrls: ['./envio.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,SharedModule],
})
export class EnvioPage implements OnInit {

  cartas$: Observable<Carta[]>;

  constructor(private cartaService: CartaService) {
    this.cartas$ = this.cartaService.cartas$;
  }
  ngOnInit(): void {}

}
