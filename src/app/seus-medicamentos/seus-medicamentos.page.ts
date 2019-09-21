import { Component, OnInit } from '@angular/core';
import { NavController, ActionSheetController } from '@ionic/angular';
import { MedicamentoService } from '../services/medicamento.service';
import { UtilService } from '../services/util.service';
import { DataProviderService } from '../services/data-provider.service';

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
                    text: 'Procurar Bula',
                    icon: 'paper',
                    handler: () => {
                        console.log("Abre o link", `https://consultaremedios.com.br/${medicamento.nome.toLowerCase()}/bula`)
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
                                    .then(() => this.buscarMedicamentos())
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
