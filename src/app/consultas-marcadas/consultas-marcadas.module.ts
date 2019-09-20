import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ConsultasMarcadasPage } from './consultas-marcadas.page';

const routes: Routes = [
  {
    path: '',
    component: ConsultasMarcadasPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ConsultasMarcadasPage]
})
export class ConsultasMarcadasPageModule {}
