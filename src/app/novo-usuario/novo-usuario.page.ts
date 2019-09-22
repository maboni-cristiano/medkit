import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, ModalController, Events, LoadingController, Platform } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { UsuarioService } from '../services/usuario.service';
import { UtilService } from '../services/util.service';


@Component({
    selector: 'app-novo-usuario',
    templateUrl: './novo-usuario.page.html',
    styleUrls: ['./novo-usuario.page.scss'],
})
export class NovoUsuarioPage implements OnInit {
    public form: FormGroup;


    constructor(
        public formBuilder: FormBuilder,
        private navController: NavController,
        private usuarioService: UsuarioService,
        private utilService: UtilService,
        private platform: Platform
    ) {

        // this.platform.backButton.subscribe(() => {
        //     console.log("gobacjjjjj")
        //     this.goBack();
        // });

        this.form = formBuilder.group({
            nome: new FormControl('', Validators.compose([
                Validators.required,
                Validators.maxLength(100),
                Validators.minLength(3),
            ])),

            email: new FormControl('', Validators.compose([
                Validators.required,
                Validators.email,
                Validators.maxLength(100),
                Validators.minLength(8),
            ])),


            senha: new FormControl('', Validators.compose([
                Validators.required,
                Validators.maxLength(12),
                Validators.minLength(3),
            ])),

        })

    }

    ngOnInit() {

    }

    ionViewDidEnter() {

    }


    async salvar() {
        console.log(this.form.value);
        let loadingCtrl = await this.utilService.showLoading();
        // let loadingCtrl = await this.loadingCtrl.create({
        //   message: 'Processando...',
        // });
        loadingCtrl.present();

        this.usuarioService
            .salvarUsuario(this.form.value)
            .then((response) => {
                loadingCtrl.dismiss();
                this.utilService.showAlertWithCallback('Operação realizada com sucesso!', () => this.navController.pop());
            })
            .catch((error) => {
                loadingCtrl.dismiss();
                this.utilService.showToast(error);
                console.log(error);
            });
    }

    goBack() {
        this.navController.pop();
    }

}

