import { CanActivate } from '@angular/router';
import { UsuarioService } from './usuario.service';
import { Injectable } from '@angular/core';
import { NavController } from '@ionic/angular';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private navController: NavController,

    ) {}

    canActivate(): boolean {
        const id = UsuarioService.getIdUsuarioLogado();
        if (id)
            return true;
      
        this.navController.navigateForward('autenticacao');
        return false;
    }

    public static getIdUsuarioLogado() {
        return UsuarioService.getIdUsuarioLogado();
    }

    

}