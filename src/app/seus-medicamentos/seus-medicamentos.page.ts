import { Component, OnInit } from '@angular/core';
import { NavController, ActionSheetController, ToastController, AlertController } from '@ionic/angular';
import { MedicamentoService } from '../services/medicamento.service';
import { UtilService } from '../services/util.service';
import { DataProviderService } from '../services/data-provider.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Button } from 'protractor';


@Component({
    selector: 'app-seus-medicamentos',
    templateUrl: './seus-medicamentos.page.html',
    styleUrls: ['./seus-medicamentos.page.scss'],
})
export class SeusMedicamentosPage implements OnInit {

    nome: string = '';
    medicamentos: any;
    medicamentosFiltrados: any;

    constructor(
        private navCtrl: NavController,
        private medicamentoService: MedicamentoService,
        private actionSheetCtrl: ActionSheetController,
        public utilService: UtilService,
        public dataProvider: DataProviderService,
        private iab: InAppBrowser,
        public toastController: ToastController,
        private alertCtrl: AlertController,
    ) {}

    ngOnInit(){}

    async ionViewDidEnter() {
        this.buscarMedicamentos();
    }

    async buscarMedicamentos() {
        this.medicamentos = await this.medicamentoService.buscarTodosMedicamentos();
        this.medicamentosFiltrados = this.medicamentos;
    }



    async atualizarMedicamentos(event: any) {
        await this.buscarMedicamentos();

        setTimeout(() => {
            event.target.complete();
        }, 500);
    }

    filtrarItens() {
        this.medicamentosFiltrados = this.filtrarMedicamentos(this.nome);
    }

    filtrarMedicamentos(nome) {
        this.medicamentosFiltrados = this.medicamentos;
        return this.medicamentosFiltrados.filter((item) => {
            return item.nome.toLowerCase().includes(nome.toLowerCase());
        });
    }

    goAdicionarMedicamento() {
        this.navCtrl.navigateForward('adicionar-medicamento');
    }

    async showActionSheetReabastecer(medicamento) {
        let actionSheet = await this.actionSheetCtrl.create({
            header: `Opções para medicamento: ${medicamento.nome}`,
            buttons: [
                {
                    text: 'Editar',
                    icon: 'create',
                    handler: () => {
                        this.dataProvider.payload = medicamento;
                        this.navCtrl.navigateBack('adicionar-medicamento');
                    }
                },
                {
                    text: 'Não',
                    handler: () => {
                    }
                }
            ]
        })
        await actionSheet.present();
    }

    async showOptionsItem(medicamento) {
        let actionSheet = await this.actionSheetCtrl.create({
            header: `Opções para medicamento: ${medicamento.nome}`,
            buttons: [

                {

                    text: 'Registrar Uso',
                    icon: 'pulse',
                    handler: async () => {
                        if (medicamento.estoque < 1) {
                        this.utilService.showToastError("Você não possui medicamentos!")

                                let alert = await this.alertCtrl.create({
                                    header: `Seu medicamento ${medicamento.nome} acabou!`,
                                    subHeader: `Deseja reabastecer o estoque?`,
                                    buttons: [
                                        {
                                            text: 'SIM',
                                            handler: () => {
                                                this.dataProvider.payload = medicamento;
                                                this.navCtrl.navigateBack('configurar-estoque');
                                                this.utilService.showAlert("Desça até a opção ESTOQUE para reabastecer!")

                                            }
                                        },
                                        {
                                            text: 'NÃO',
                                            handler: () => {
                                            }
                                        }
                                    ]
                                })
                                await alert.present();
                            }

                        if (medicamento && medicamento.estoque) {
                            let quantidade = medicamento.dosagem;

                            if (!quantidade) {
                                quantidade = 1;
                            }

                            if (medicamento.estoque > 0) {
                                medicamento.estoque = medicamento.estoque - quantidade;
                            }

                            if (medicamento.estoque < 0) {
                                medicamento.estoque = 0;

                            }


                            let loading = await this.utilService.showLoading();
                            loading.present();

                            this.medicamentoService
                                .salvarMedicamento(medicamento)
                                .then(() => {
                                    this.utilService.showToast("Registrado uso com sucesso!")
                                })
                                .catch((error) => this.utilService.showToast(error))
                                .finally(() => loading.dismiss())
                        } else {

                        }
                    }
                },
                {
                    text: 'Procurar Bula',
                    icon: 'paper',
                    handler: () => {
                        let nome = medicamento.nome;

                        if (nome) {
                            nome = nome.toLowerCase();
                            nome = this.utilService.retira_acentos(nome);
                            nome = nome.replace(" ", "-");

                            const browser = this.iab.create(`https://consultaremedios.com.br/${nome}/bula`);
                            browser.show()
                        }
                    }
                },
                {
                    text: 'Reabastecer Estoque',
                    icon: 'battery-charging',
                    handler: () => {
                        this.dataProvider.payload = medicamento;
                        this.navCtrl.navigateBack('adicionar-medicamento');
                        this.utilService.showAlert("Desça até a opção ESTOQUE para reabastecer!");
                    }
                },
                {
                    text: 'Editar',
                    icon: 'create',
                    handler: () => {
                        this.dataProvider.payload = medicamento;
                        this.navCtrl.navigateBack('adicionar-medicamento');
                    }
                },
                {
                    text: 'Excluir',
                    role: 'destructive',
                    icon: 'trash',
                    handler: () => {
                        this.utilService.showAlertYesNoWithCallback(
                            `Confirma EXCLUSÃO do medicamento ${medicamento.nome}`,
                            () => {
                                this.medicamentoService
                                    .excluirMedicamento(medicamento)
                                    .then(async () =>  {
                                        await this.buscarMedicamentos();
                                        //gambiarra para atualizar a lista... nunca vi ter q fazer isso :(
                                        document.getElementById("content-medicamentos").click();
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

    isMedicamentoEstoqueBaixo(medicamento) {
        try {
            if (medicamento) {
                if (medicamento.lembrete && medicamento.estoque) {
                    const lembrete = parseFloat(medicamento.lembrete);
                    const estoque = parseFloat(medicamento.estoque);

                    if (estoque <= lembrete) {
                        return true;
                    }
                }
            }
        } catch(e) {
            console.log("erro ao verificar estoque baixo", e);
        }
    }
        isMedicamentoSemEstoque(medicamento) {
            try {
                if (medicamento) {
                        if (medicamento.estoque == 0) {
                            return true;
                    }
                }
            } catch (e) {
                console.log("erro ao verificar estoque baixo", e);
            }

        return false;
    }
    async presentToast() {
        const toast = await this.toastController.create({
            message: 'Your settings have been saved.',
            duration: 2000
        });
        toast.present();
    }
}

