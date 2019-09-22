import { Component, OnInit } from '@angular/core';
import { NavController, ActionSheetController } from '@ionic/angular';
import { MedicamentoService } from '../services/medicamento.service';
import { UtilService } from '../services/util.service';
import { DataProviderService } from '../services/data-provider.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';


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

    async showOptionsItem(medicamento) {
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
                    text: 'Registrar Uso',
                    icon: 'pulse',
                    handler: async () => {
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

        return false;
    }
}
