import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-configurar-estoque',
  templateUrl: './configurar-estoque.page.html',
  styleUrls: ['./configurar-estoque.page.scss'],
})
export class ConfigurarEstoquePage implements OnInit {

  constructor(private navgCtrl : NavController) { }

  ngOnInit() {
  }
    salvarEstoque() {
    this.navgCtrl.navigateBack ('adicionar-medicamento');
  }

}
