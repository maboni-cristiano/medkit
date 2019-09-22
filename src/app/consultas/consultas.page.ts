import { Component, OnInit } from '@angular/core';
import { NavController, ActionSheetController } from '@ionic/angular';
import { ConsultaService } from '../services/consulta.service';
import { DataProviderService } from '../services/data-provider.service';
import { UtilService } from '../services/util.service';
import * as moment from 'moment';


@Component({
    selector: 'app-consultas',
    templateUrl: './consultas.page.html',
    styleUrls: ['./consultas.page.scss'],
})
export class ConsultasPage implements OnInit {

    lista: any;
    listaFiltrada: any;
    nome: string = '';

    constructor(
        private navCtrl: NavController,
        private consultaService: ConsultaService,
        private actionSheetCtrl: ActionSheetController, 
        private dataProvider: DataProviderService,
        private utilService: UtilService
    ) { }

    ngOnInit() {
    }

    goFormulario() {
        this.navCtrl.navigateForward('nova-consulta');
    }

    async ionViewDidEnter() {
        console.log("ionViewDidEnter")
        await this.buscarListaConsulta();
        document.getElementById("content-consulta").click();
    }

    async buscarListaConsulta() {
        this.lista = await this.consultaService.buscarTodos();
        this.listaFiltrada = this.lista;
    }



    async atualizarLista(event: any) {
        await this.buscarListaConsulta();

        setTimeout(() => {
            event.target.complete();
        }, 500);
    }

    filtrarItens() {
        this.listaFiltrada = this.filtrarLista(this.nome);
    }

    filtrarLista(nome) {
        this.listaFiltrada = this.lista;
        return this.listaFiltrada.filter((item) => {
            return item.descricao.toLowerCase().includes(nome.toLowerCase());
        });
    }

    async showOptionsItem(consulta) {
        let actionSheet = await this.actionSheetCtrl.create({
            header: `Opções para consulta: ${consulta.descricao}`,
            buttons: [
                {
                    text: 'Editar',
                    icon: 'create',
                    handler: () => {
                        this.dataProvider.payload = consulta;
                        this.navCtrl.navigateBack('nova-consulta');
                    }
                },
                {
                    text: 'Excluir',
                    role: 'destructive',
                    icon: 'trash',
                    handler: () => {
                        this.utilService.showAlertYesNoWithCallback(
                            `Confirma EXCLUSÃO do medicamento ${consulta.descricao}`,
                            () => {
                                this.consultaService
                                    .excluir(consulta)
                                    .then(async () => {
                                        await this.buscarListaConsulta()
                                        document.getElementById("content-consulta").click();
                                    })
                                    .catch((error) => this.utilService.showAlert(error))
                            }, 
                            null
                        );
                        
                    }
                },
                {
                    text: 'Cancelar',
                    icon: 'close',
                    role: 'cancel',
                }
            ]
        })
        await actionSheet.present();
    }

    formatData(data) {
        if (!data)
            return data;
        return moment(data).format("DD/MM/YYYY");
    }

    formatHora(data) {
        if (!data)
            return data;
            
        return moment(data).format("HH:mm");
    }
}
