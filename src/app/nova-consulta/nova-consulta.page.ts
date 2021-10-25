import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { DataProviderService } from '../services/data-provider.service';
import { UtilService } from '../services/util.service';
import { NavController } from '@ionic/angular';
import { ConsultaService } from '../services/consulta.service';

@Component({
    selector: 'app-nova-consulta',
    templateUrl: './nova-consulta.page.html',
    styleUrls: ['./nova-consulta.page.scss'],
})
export class NovaConsultaPage implements OnInit {

    public form: FormGroup;

    constructor(
        public formBuilder: FormBuilder,
        public dataProvider: DataProviderService,
        private navCtrl: NavController,
        public utilService: UtilService,
        private consultaService: ConsultaService

    ) {

        this.form = formBuilder.group({
            id: new FormControl(''),
            descricao: new FormControl('', Validators.compose([
              Validators.required,
              Validators.maxLength(100),
              Validators.minLength(2),
            ])),
            data: new FormControl(''),
            hora: new FormControl(''),
            medico: new FormControl(''),
            observacao: new FormControl(''),
            consultaPresenca: new FormControl(''),
          })
    }

    ngOnInit() {
        const {payload} = this.dataProvider;

        if (payload) {
            this.setValueForm(payload);
            this.dataProvider.payload = null;
        }
    }

    async goBack() {
        this.navCtrl.back();
    }

    async salvar() {

        if (!this.form.valid) {
            return this.utilService.showToast("Informe a descrição da consulta");
        }

        let loadingCtrl = await this.utilService.showLoading("Aguarde...");
        loadingCtrl.present();

        this.consultaService
            .salvar(this.form.value)
            .then(() => {
                this.goBack();
            })
            .catch((error) => {
                this.utilService.showToast(error);
            })
            .finally(() => {
                loadingCtrl.dismiss();
            })
    }

    excluir() {
        const consulta = this.form.value;

        this.utilService.showAlertYesNoWithCallback(
            `Confirma EXCLUSÃO da consulta ${consulta.descricao}`,
            () => {
                this.consultaService
                    .excluir(consulta)
                    .then(() => this.goBack())
                    .catch((error) => this.utilService.showAlert(error))
            },
            null
        );
    }

    isEdicao() {
        const id = this.getValueForm('id');
        return id;
    }

    getValueForm(nameField) {
        return this.form.get(nameField).value;
    }

    setValueForm(obj) {
        for (var key in obj){
            var attrName = key;
            var attrValue = obj[key];

            const field = this.form.get(attrName);

            if (field)
                field.setValue(attrValue);
        }
    }
}
