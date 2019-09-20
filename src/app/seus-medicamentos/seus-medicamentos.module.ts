import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SeusMedicamentosPage } from './seus-medicamentos.page';

const routes: Routes = [
  {
    path: '',
    component: SeusMedicamentosPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SeusMedicamentosPage]
})
export class SeusMedicamentosPageModule {}
