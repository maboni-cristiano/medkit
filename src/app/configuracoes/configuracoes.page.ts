import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NavController, ModalController } from '@ionic/angular';
import { UtilService } from '../services/util.service';
import { UsuarioService } from '../services/usuario.service';
import { MedicamentoService } from '../services/medicamento.service';
import { ConsultaService } from '../services/consulta.service';
import { VisualizarNotificacoesPendentesPage } from '../visualizar-notificacoes-pendentes/visualizar-notificacoes-pendentes.page';

@Component({
    selector: 'app-configuracoes',
    templateUrl: './configuracoes.page.html',
    styleUrls: ['./configuracoes.page.scss'],
})
export class ConfiguracoesPage implements OnInit {

    public form: FormGroup;


    constructor(
        public formBuilder: FormBuilder,
        private navCtrl: NavController, 
        public utilService: UtilService,
        private usuarioService: UsuarioService,
        private medicamentoService: MedicamentoService, 
        private consultaService: ConsultaService,
        private modalCtrl: ModalController
    ) { 
        this.form = formBuilder.group({
            email: new FormControl('', Validators.compose([
                Validators.required,
                Validators.email,
                Validators.maxLength(100),
                Validators.minLength(8),
              ])),
            nome: new FormControl('', Validators.compose([
              Validators.required,
              Validators.maxLength(100),
              Validators.minLength(2),
            ])),
            senha: new FormControl('', Validators.compose([
                Validators.required,
                Validators.maxLength(32),
                Validators.minLength(3),
            ])),
            st_notificacao: new FormControl('sim')
          })
    }

    async ngOnInit() {
        let loading = await this.utilService.showLoading();
        loading.present();

        this.usuarioService
            .getDadosUsuarioLogado()
            .then((usuario) => {
                this.setValueForm(usuario);
            })
            .catch((error) => this.utilService.showToast(error))
            .finally(() => loading.dismiss());
    }

    goBack() {
        this.navCtrl.back();
    }

    async salvar() {
        let loading = await this.utilService.showLoading();
        loading.present();

        this.usuarioService
            .salvarUsuario(this.form.value, false)
            .then((adicionarTodasNotificacoes) => {
                if (adicionarTodasNotificacoes) {
                    this.medicamentoService.adicionarNotificacaoParaTodosOsProdutos();
                    this.consultaService.adicionarNotificacaoParaTodasAsConsultas();
                }

                this.goBack();
            })
            .catch((error) => this.utilService.showToast(error))
            .finally(() => loading.dismiss())
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


    async goNotificacoesPendentes() {
        let modal = await this.modalCtrl.create({component: VisualizarNotificacoesPendentesPage});
        await modal.present();
    }
}
