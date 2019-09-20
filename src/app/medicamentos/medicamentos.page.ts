import { Component, OnInit, } from '@angular/core';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-medicamentos',
  templateUrl: './medicamentos.page.html',
  styleUrls: ['./medicamentos.page.scss'],
})
export class MedicamentosPage implements OnInit {

  constructor(private navCtrl : NavController) { }

  ngOnInit() {
  }

  openAdicionarMedicamento(){
    this.navCtrl.navigateForward('adicionar-medicamento');
  }
    openSeusMedicamentos(){
      this.navCtrl.navigateForward('seus-medicamentos');

}


}
