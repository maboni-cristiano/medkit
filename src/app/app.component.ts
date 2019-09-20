import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Início',
      url: '/home',
      icon: 'home',
      color: 'tertiary'
    },
    {
      title: 'Medicamentos',
      url: '/medicamentos',
      icon: 'medkit'
    },
    {
      title: 'Consultas',
      url: '/consultas',
      icon: 'contacts'
    },
    {
      title: 'Procurar Bulas',
      url: '/bulas',
      icon: 'paper'
    }
  ];
  constructor(
  ){}
  }
