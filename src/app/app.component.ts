import { Component } from '@angular/core';

import { Platform, NavController, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { UsuarioService } from './services/usuario.service';
import { AuthGuard } from './services/auth.guard';
import { UtilService } from './services/util.service';
import { NotificacaoService } from './services/notificacao.service';
@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html'
})
export class AppComponent {
    public appPages = [
        // {
        //   title: 'Início',
        //   url: '/home',
        //   icon: 'home',
        //   color: 'tertiary'
        // },
        {
            title: 'Medicamentos',
            url: '/seus-medicamentos',
            icon: 'medkit'
        },
        {
            title: 'Consultas',
            url: '/consultas',
            icon: 'contacts'
        },
        // {
        //     title: 'Procurar Bulas',
        //     url: '/bulas',
        //     icon: 'paper'
        // }
    ];



    constructor(
        private usuarioService: UsuarioService,
        private navController: NavController,
        private utilService: UtilService,
        private menu: MenuController,
        private notificacaoService: NotificacaoService
    ) { 

        this.usuarioService.authState.subscribe(state => {
            if (state) {
                this.navController.navigateRoot("seus-medicamentos");
                this.notificacaoService.clearAllNotification();
            } else {
                this.navController.navigateRoot("autenticacao");
                this.notificacaoService.removeAllNotification();
            }
        });

        //verifica se esta logado.
        this.usuarioService.ifLoggedIn();
    }

    async logout() {
        this.usuarioService.logout();

        try {
            const element = await this.menu.isOpen();
            if (element) {
                return this.menu.close();
            }

        } catch (error) { }
    }

    isLogged() {
        return this.usuarioService.isAuthenticated();
    }
}
