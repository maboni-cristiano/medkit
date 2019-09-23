import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NotificacaoService } from './notificacao.service';
import { Constants } from './constants';
// import { ConsultaService } from './consulta.service';
// import { MedicamentoService } from './medicamento.service';

@Injectable({
    providedIn: 'root'
})
export class UsuarioService {
    _usuarioCollection: any[] = [];
    isLogged = false;

    authState = new BehaviorSubject(false);

    constructor(
        private notificacaoService: NotificacaoService,
        // private medicamentoService: MedicamentoService, 
        // private consultaService: ConsultaService
    ) { }


    salvarUsuario(usuarioForm: any, novoUsuario = true) {
        return new Promise<any>((resolve, reject) => {

            let dbUsuarioCollectionText = localStorage.getItem('usuarioCollection');
            let adicionarTodasNotificacoes = false;

            if (dbUsuarioCollectionText != null) {
                this._usuarioCollection = JSON.parse(dbUsuarioCollectionText);

                if (novoUsuario) {
                    let usuarioJaExiste = this._usuarioCollection.filter((usuario) => {
                        return usuario.email == usuarioForm.email;
                    });
    
                    if (usuarioJaExiste.length > 0) {
                        reject('Usuario já existe');
                        return;
                    }
                } else { //esta editando....

                    let usuarioBD: any = this._usuarioCollection.filter((usuario) => {
                        return usuario.email == usuarioForm.email;
                    });

                    if (usuarioBD && usuarioBD.length >= 0) {
                        usuarioBD = usuarioBD[0];

                        //NAO QUER MAIS RECEBER NOTIFICACAO
                        if (usuarioBD.st_notificacao && usuarioBD.st_notificacao === "SIM" 
                        && usuarioForm.st_notificacao && usuarioForm.st_notificacao === "NAO" ) {
                            console.log("REMOVE TODAS AS NOTIFICACOES")
                            this.notificacaoService.removeAllNotification();
                        } else if (usuarioBD.st_notificacao && usuarioBD.st_notificacao === "NAO" 
                        && usuarioForm.st_notificacao && usuarioForm.st_notificacao === "SIM" ) {
                            console.log("ADICIONA TODAS AS NOTIFICACOES")
                            // this.medicamentoService.adicionarNotificacaoParaTodosOsProdutos();
                            // this.consultaService.adicionarNotificacaoParaTodasAsConsultas();
                            // this.notificacaoService.addAllNotification();
                            adicionarTodasNotificacoes = true;
                        }
                    }

                    this._usuarioCollection = this._usuarioCollection.filter((usuario) => {
                        return usuario.email != usuarioForm.email;
                    });
                }
            }

            Constants.NOME_USUARIO = usuarioForm.nome;
            this._usuarioCollection.push(usuarioForm);
            localStorage.setItem('usuarioCollection', JSON.stringify(this._usuarioCollection));

            resolve(adicionarTodasNotificacoes);
        });
    }

    login(form: any) {
        return new Promise<any>((resolve, reject) => {
            let dbUsuarioCollectionText = localStorage.getItem('usuarioCollection');

            if (dbUsuarioCollectionText == null) {
                reject('Base de dados vazia.');
                return;
            }

            this._usuarioCollection = JSON.parse(dbUsuarioCollectionText);

            let encontrouLogin = this._usuarioCollection.filter((usuario) => {
                return usuario.email.toLowerCase() == form.email.toLowerCase() && usuario.senha == form.senha;
            });

            if (encontrouLogin && encontrouLogin.length > 0) {
                localStorage.setItem('usuarioLogado', form.email);
                this.authState.next(true);
                return resolve(form);
            }

            reject('Usuário/senha inválido ou não encontrado.');
        });
    }

    public static getIdUsuarioLogado(): String {
        return localStorage.getItem('usuarioLogado');
    }

    getDadosUsuarioLogado() {
        return new Promise((resolve, reject) => {
            let dbUsuarioCollectionText = localStorage.getItem('usuarioCollection');
            this._usuarioCollection = JSON.parse(dbUsuarioCollectionText);

            let email = UsuarioService.getIdUsuarioLogado();

            this._usuarioCollection.map((usuario) => {
                if (usuario.email.toLowerCase() == email.toLowerCase())
                    resolve(usuario);
            });

            reject('Caiu no reject....');
        });
    }

    ifLoggedIn() {
        let id = UsuarioService.getIdUsuarioLogado();
        
        if (id) {
            this.authState.next(true);
        }
    }

    logout() {
        localStorage.removeItem("usuarioLogado");
        this.authState.next(false);
        this.notificacaoService.removeAllNotification();
    }
    
    isAuthenticated() {
        return this.authState.value;
    }
}
