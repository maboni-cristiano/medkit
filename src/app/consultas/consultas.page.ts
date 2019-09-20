import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-consultas',
  templateUrl: './consultas.page.html',
  styleUrls: ['./consultas.page.scss'],
})
export class ConsultasPage implements OnInit {

  constructor(private navCtrl : NavController) { }

  ngOnInit() {
  }

  openNovaConsulta(){
    this.navCtrl.navigateForward('nova-consulta')
  }

  openAdicionarMedico(){
    this.navCtrl.navigateForward('adicionar-medico')
  }

  openConsultasMarcadas(){
    this.navCtrl.navigateForward('consultas-marcadas')
  }

}
