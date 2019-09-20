import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class UsuarioService {
    _usuarioCollection: any[] = [];

    constructor() { }


    adicionar(form: any) {
        return new Promise<any>((resolve, reject) => {
            let dbUsuarioCollectionText = localStorage.getItem('usuarioCollection');

            if (dbUsuarioCollectionText == null) {
                this._usuarioCollection.push(form);

                let convertJsonToText = JSON.stringify(this._usuarioCollection);

                localStorage.setItem('usuarioCollection', convertJsonToText);
            }
            else {
                this._usuarioCollection = JSON.parse(dbUsuarioCollectionText);

                let usuarioJaExiste = this._usuarioCollection.filter((usuario) => {
                    return usuario.email == form.email;
                });

                if (usuarioJaExiste.length > 0) {
                    reject('Usuario já existe');
                    return;
                }

                this._usuarioCollection.push(form);
                localStorage.setItem('usuarioCollection', JSON.stringify(this._usuarioCollection));
            }

            resolve(form);
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
                return resolve(form);
            }

            reject('Usuário/senha inválido ou não encontrado.');
        });
    }
}
