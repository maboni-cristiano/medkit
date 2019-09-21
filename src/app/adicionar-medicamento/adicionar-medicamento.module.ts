import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AdicionarMedicamentoPage } from './adicionar-medicamento.page';

const routes: Routes = [
  {
    path: '',
    component: AdicionarMedicamentoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AdicionarMedicamentoPage]
})
export class AdicionarMedicamentoPageModule {}
