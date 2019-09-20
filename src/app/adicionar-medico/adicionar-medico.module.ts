import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AdicionarMedicoPage } from './adicionar-medico.page';

const routes: Routes = [
  {
    path: '',
    component: AdicionarMedicoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AdicionarMedicoPage]
})
export class AdicionarMedicoPageModule {}
