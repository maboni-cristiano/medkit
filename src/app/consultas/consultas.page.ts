import { Component, OnInit } from '@angular/core';
import { NavController, ActionSheetController, AlertController } from '@ionic/angular';
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
        private utilService: UtilService,
        private alertCtrl: AlertController
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
                    text: 'Registrar Presença',
                    icon: 'checkmark-circle-outline',
                    handler: async () => {
                        let alert = await this.alertCtrl.create({
                            header: `Você presenciou à consulta do(a) ${consulta.descricao} ${consulta.medico} ?`,

                            buttons: [


                                {

                                    text: 'SIM',
                                    handler: () => {

                                        consulta.valor = 1;

                                        this.consultaService
                                            .salvar(consulta)
                                            .then(() => {
                                                this.utilService.showToastSuccess(`Parabéns, você presenciou à consulta do(a) ${consulta.descricao} ${consulta.medico} , continue assim!`)
                                                /*this.consultaService
                                                    .excluir(consulta)
                                                    .then(async () => {
                                                        await this.buscarListaConsulta()
                                                        document.getElementById("content-consulta").click();
                                                    })
                                                    .catch((error) => this.utilService.showAlert(error))*/

                                            })
                                            .catch((error) => this.utilService.showToast(error))
                                    }
                                },
                                {
                                    text: 'NÃO',
                                    handler: async () => {

                                        let alert = await this.alertCtrl.create({
                                            header: `Deseja remarcar?`,

                                            buttons: [
                                                {
                                                    text: 'SIM',
                                                    handler: () => {
                                                        this.dataProvider.payload = consulta;
                                                        this.navCtrl.navigateBack('nova-consulta');

                                                    }
                                                },
                                                {
                                                    text: 'NÃO',

                                                    handler: () => {

                                                        consulta.valor = 2;

                                                        this.consultaService
                                                            .salvar(consulta)
                                                            .then(() => {
                                                                this.utilService.showToastError(`Você não compareceu á consulta do(a) ${consulta.descricao} ${consulta.medico}, fique atento!`)



                                                            })
                                                            .catch((error) => this.utilService.showToast(error))
                                                    }
                                                }
                                            ]
                                        })
                                        await alert.present();

                                            }



                                },

                            ]
                        })
                        await alert.present();
                    }
                },
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
                            `Confirma EXCLUSÃO da consulta? ${consulta.descricao}`,
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

consultaPresenca(consulta) {
            try {

                        if (consulta.valor == 1) {
                            return true;
                }

            } catch (e) {
                console.log("erro ao verificar estoque baixo", e);
            }
            return false;
    }


    consultaNaoPresenca(consulta) {
        try {

            if (consulta.valor == 2) {
                return true;
            }

        } catch (e) {
            console.log("erro ao verificar estoque baixo", e);
        }
        return false;
    }

}