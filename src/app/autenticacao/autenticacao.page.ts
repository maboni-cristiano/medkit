import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, ModalController, Events } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { UsuarioService } from '../services/usuario.service';
import { UtilService } from '../services/util.service';
import { MedicamentoService } from '../services/medicamento.service';
import { ConsultaService } from '../services/consulta.service';


@Component({
  selector: 'app-autenticacao',
  templateUrl: './autenticacao.page.html',
  styleUrls: ['./autenticacao.page.scss'],
})
export class AutenticacaoPage implements OnInit {
  public loginForm: FormGroup;


  constructor(
    public formBuilder: FormBuilder,
    private navController: NavController,
    private usuarioService: UsuarioService,
    private utilService: UtilService,
    private medicamentoService: MedicamentoService,
    private consultaService: ConsultaService,
    
) {


    this.loginForm = formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.email,
        Validators.maxLength(100),
        Validators.minLength(8),
        
      ])),


      senha: new FormControl('', Validators.compose([
        Validators.required,
        Validators.maxLength(32),
        Validators.minLength(3),
      ])),

    })

  }

  ngOnInit() {

  }

  ionViewDidEnter() {

  }


  async fazerLogin() {

    if (!this.loginForm.valid) {
        return this.utilService.showToast("Informe o e-mail e senha válidos para continuar.");
    }

    console.log(this.loginForm.value);

    let loadingCtrl = await this.utilService.showLoading("Aguarde...");
    loadingCtrl.present();

    this.usuarioService
        .login(this.loginForm.value)
        .then(() => {
            //adiciona notificações para todos os produtos, pq pode ser que ja tenha algum cadastrado, e esteja sem notificacao....
            this.medicamentoService.adicionarNotificacaoParaTodosOsProdutos();
            this.consultaService.adicionarNotificacaoParaTodasAsConsultas();
            
        })
        .catch((error) => {
            this.utilService.showToast(error);
            console.log(error);
        })
        .finally(() => loadingCtrl.dismiss())

  }

  showNovoUsuario() {
    this.navController.navigateForward('novo-usuario');
  }

} // fim classe

