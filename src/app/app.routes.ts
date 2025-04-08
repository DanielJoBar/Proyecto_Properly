import { Routes } from '@angular/router';

export const routes: Routes = [
  
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'interfaz',
    loadComponent: () => import('./interfaz/interfaz.page').then( m => m.InterfazPage)
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'envio',
    loadComponent: () => import('./pages/envio/envio.page').then( m => m.EnvioPage)
  },
  {
    path: 'incidentes',
    loadComponent: () => import('./pages/incidentes/incidentes.page').then( m => m.IncidentesPage)
  },
];
