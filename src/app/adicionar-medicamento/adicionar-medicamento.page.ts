import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { UtilService } from '../services/util.service';
import * as moment from 'moment';
import { MedicamentoService } from '../services/medicamento.service';
import { DataProviderService } from '../services/data-provider.service';

@Component({
    selector: 'app-adicionar-medicamento',
    templateUrl: './adicionar-medicamento.page.html',
    styleUrls: ['./adicionar-medicamento.page.scss'],
})

export class AdicionarMedicamentoPage implements OnInit {

    public medicamentoForm: FormGroup;
    _horario = "";

    constructor(
        private navCtrl: NavController,
        public formBuilder: FormBuilder,
        public utilService: UtilService,
        public medicamentoService: MedicamentoService,
        public dataProvider: DataProviderService,
    ) {

        this.medicamentoForm = formBuilder.group({
            id: new FormControl(''),
            nome: new FormControl('', Validators.compose([
              Validators.required,
              Validators.maxLength(100),
              Validators.minLength(3),
            ])),
            tipo_medicamento: new FormControl(''),
            duracao: new FormControl(''),
            horarios: new FormControl([]),
            tipo_dosagem: new FormControl(''),
            dosagem: new FormControl(''),
            estoque: new FormControl(''),
            miligramas: new FormControl(''),
            MG: new FormControl(''),
            lembrete: new FormControl('2'),
            horario: ['']
          })
    }

    ngOnInit() {
        const {payload} = this.dataProvider;

        if (payload) {
            this.setValueForm(payload);
            this.dataProvider.payload = null;
        }
    }

    async salvarMedicamento() {

        console.log("Print: ", this.medicamentoForm.value);

        if (!this.medicamentoForm.valid) {
            return this.utilService.showToast("Informe o nome do medicamento");
        }

        let loadingCtrl = await this.utilService.showLoading("Aguarde...");
        loadingCtrl.present();

        this.medicamentoService
            .salvarMedicamento(this.medicamentoForm.value)
            .then(() => {
                this.navCtrl.back();
            })
            .finally(() => loadingCtrl.dismiss());
    }

    async cancelarMedicamento() {
        this.navCtrl.back();
    }

    addHorario({detail}) {

        if (!detail.value || detail.value === null)
            return;

        const time = moment(detail.value).format("HH:mm");

        console.log(event);
        let horarios = this.getValueForm("horarios");

        if (horarios) {
            const idx = horarios.indexOf(time);

            if (idx >= 0) {
                this.setValueForm({"horario": null});
                return this.utilService.showToast("Horário informado já existe");
            }

            horarios.push(time);
        } else {
            horarios = [
                time
            ]
        }

        //ordena a lista...
        horarios = horarios.sort((a, b) => a.localeCompare(b));
        this.setValueForm({
            "horarios": horarios,
            "horario": null
        });
    }
    removerHorario(horario) {
        console.log(horario);
        let horarios = this.getValueForm("horarios");

        if (horarios) {
            const idx = horarios.indexOf(horario);

            if (idx >= 0) {
                horarios.splice(idx, 1);
            }
        }

        this.setValueForm({
            "horarios": horarios
        });
    }

    visualizarDuracao() {
        const tipo = this.getValueForm('tipo_medicamento');

        if (tipo && tipo === "temporario") {
            return true;
        }

        return false;
    }

    visualizarMiligramas() {
        const tipo = this.getValueForm('tipo_dosagem');

        if (tipo && tipo === "CP") {
            return true;
        }

        return false;
    }

    visualizarCP() {
        const tipo = this.getValueForm('tipo_dosagem');

        if (tipo && tipo === "CP") {
            return true;
        }

        return false;
    }
     visualizarML() {
        const tipo = this.getValueForm('tipo_dosagem');

        if (tipo && tipo === "ML") {
            return true;
        }

        return false;
    }

    isEdicao() {
        const id = this.getValueForm('id');
        return id;
    }

    excluirMedicamento() {
        const medicamento = this.medicamentoForm.value;

        this.utilService.showAlertYesNoWithCallback(
            `Confirma EXCLUSÃO do medicamento ${medicamento.nome}`,
            () => {
                this.medicamentoService
                    .excluirMedicamento(medicamento)
                    .then(() => this.navCtrl.back())
                    .catch((error) => this.utilService.showAlert(error))
            },
            null
        );
    }

    getValueForm(nameField) {
        return this.medicamentoForm.get(nameField).value;
    }

    setValueForm(obj) {
        for (var key in obj){
            var attrName = key;
            var attrValue = obj[key];

            const field = this.medicamentoForm.get(attrName);

            if (field)
                field.setValue(attrValue);
        }
    }
    openConfigurarEstoque() {
        this.navCtrl.navigateForward('configurar-estoque');
    }
}
