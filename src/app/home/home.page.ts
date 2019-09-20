import { Component, OnInit } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  constructor(private navCtrl : NavController) {}

  ngOnInit() {
  }
  
  openAdicionarMedicamento(){
    this.navCtrl.navigateForward('adicionar-medicamento');
  }
    openSeusMedicamentos(){
      this.navCtrl.navigateForward('seus-medicamentos');

}

}
