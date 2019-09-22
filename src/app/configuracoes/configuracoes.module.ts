import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ConfiguracoesPage } from './configuracoes.page';
import { VisualizarNotificacoesPendentesPage } from '../visualizar-notificacoes-pendentes/visualizar-notificacoes-pendentes.page';

const routes: Routes = [
  {
    path: '',
    component: ConfiguracoesPage
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
  declarations: [ConfiguracoesPage, VisualizarNotificacoesPendentesPage],
  entryComponents: [VisualizarNotificacoesPendentesPage]
})
export class ConfiguracoesPageModule {}
