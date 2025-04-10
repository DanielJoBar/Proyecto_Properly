import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonInput, IonButton, IonList, IonItem, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent } from '@ionic/angular/standalone';
import { Router } from "@angular/router"; //Con esto nos movemos entre paginas
import { DbInterfaceService } from '../service/db-interface.service'; //Traigo mis metodos de interface.service


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonCardContent, IonCardSubtitle, IonCardTitle, IonCardHeader, IonCard, IonButton, IonContent, IonHeader, CommonModule, FormsModule]
})
export class LoginPage implements OnInit {

    username: string = ""; //recojo usuario y contraseñ
    password: string= "";

  constructor(private dbService: DbInterfaceService, private router:Router) { }
  //Meto el servicio DbInterfaceService y router para interactuar
  async login(){   
    const valido = await this.dbService.validarCredenciales(this.username,this.password);
    if (valido) {
      //me muevo a mi pagina interfaz
      this.router.navigate(['/interfaz']);
      
      
    } else {
      
      alert('Usuario o contraseña incorrecto')
    }
  }

  //Un usuario de prueba
//Le digo que cuando inicie, tenga ya el usuario creado
  ngOnInit() {
    this.usuarioPrueba();
  }

  //Creamos el metodo y le añadimos el metodo para que entre en la bbdd
  async usuarioPrueba() {
    const usuario = { username: 'javi', password: 'javi' }; 
    await this.dbService.anadirObjeto('usuarios', usuario);
    
  }
  

}
