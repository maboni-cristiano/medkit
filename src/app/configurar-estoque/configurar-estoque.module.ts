import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ConfigurarEstoquePage } from './configurar-estoque.page';

const routes: Routes = [
  {
    path: '',
    component: ConfigurarEstoquePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ConfigurarEstoquePage]
})
export class ConfigurarEstoquePageModule {}
