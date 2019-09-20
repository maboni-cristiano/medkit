import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { NovaConsultaPage } from './nova-consulta.page';

const routes: Routes = [
  {
    path: '',
    component: NovaConsultaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [NovaConsultaPage]
})
export class NovaConsultaPageModule {}
