import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { NotificacaoService } from '../services/notificacao.service';

@Component({
    selector: 'app-visualizar-notificacoes-pendentes',
    templateUrl: './visualizar-notificacoes-pendentes.page.html',
    styleUrls: ['./visualizar-notificacoes-pendentes.page.scss'],
})
export class VisualizarNotificacoesPendentesPage implements OnInit {

    lista = [];

    constructor(
        private modalCtrl: ModalController,
        private notificacaoService: NotificacaoService
    ) { }

    ngOnInit() {
    }

    async ionViewDidEnter() {
        this.lista = await this.notificacaoService.getAll();
    }

    goBack() {
        this.modalCtrl.dismiss();
    }

    stringify(obj) {
        return JSON.stringify(obj);
    }
}
