import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

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
        private navCtrl: NavController
    ) {
        this.medicamentos = [
            { nome: "Puran", quantidade: 25 },
            { nome: "Cimelide", quantidade: 25 },

        ];
        this.medicamentosFiltrados = this.medicamentos;

    }

    ngOnInit() {
    }
    atualizarMedicamentos(event: any) {
        setTimeout(() => {
            event.target.complete();
        }, 1000);
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
}
