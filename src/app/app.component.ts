import { Component, QueryList, ViewChildren } from '@angular/core';

import { Platform, NavController, MenuController, ModalController, ActionSheetController, PopoverController, IonRouterOutlet } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { UsuarioService } from './services/usuario.service';
import { AuthGuard } from './services/auth.guard';
import { UtilService } from './services/util.service';
import { NotificacaoService } from './services/notificacao.service';
import { Constants } from './services/constants';
import { Router } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html'
})
export class AppComponent {
    // set up hardware back button event.
    lastTimeBackPress = 0;
    timePeriodToExit = 2000;

    @ViewChildren(IonRouterOutlet) routerOutlets: QueryList<IonRouterOutlet>;

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
        {
            title: 'Configurações',
            url: '/configuracoes',
            icon: 'settings'
        },
        // {
        //     title: 'Procurar Bulas',
        //     url: '/bulas',
        //     icon: 'paper'
        // }
    ];

    nomeUsuario: String = "";

    constructor(
        private usuarioService: UsuarioService,
        private navController: NavController,
        private utilService: UtilService,
        private menu: MenuController,
        private notificacaoService: NotificacaoService,
        private platform: Platform,
        public modalCtrl: ModalController,
        private actionSheetController: ActionSheetController,
        private popoverCtrl: PopoverController,
        private router: Router,
    ) { 

        this.usuarioService.authState.subscribe(state => {
            if (state) {
                this.navController.navigateRoot("seus-medicamentos");
                this.notificacaoService.clearAllNotification();

                this.usuarioService
                    .getDadosUsuarioLogado()
                    .then((usuario: any) => {
                        Constants.NOME_USUARIO = usuario.nome;
                        this.nomeUsuario = Constants.NOME_USUARIO;
                    });
            } else {
                this.navController.navigateRoot("autenticacao");
                this.notificacaoService.removeAllNotification();
            }
        });

        //verifica se esta logado.
        this.usuarioService.ifLoggedIn();

        this.backButtonEvent();
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

    async verNotificacoes() {
        this.utilService.showAlert(JSON.stringify(await this.notificacaoService.getAll()));
    }

    isLogged() {
        return this.usuarioService.isAuthenticated();
    }

    menuIonDidOpen() {
        this.nomeUsuario = Constants.NOME_USUARIO;
    }

    // active hardware back button
    backButtonEvent() {
        this.platform.backButton.subscribe(async () => {
            // close action sheet
            try {
                const element = await this.actionSheetController.getTop();
                if (element) {
                    return element.dismiss();
                }
            } catch (error) {}

            // close popover
            try {
                const element = await this.popoverCtrl.getTop();
                if (element) {
                    return element.dismiss();
                }
            } catch (error) {}

            // close modal
            try {
                const element = await this.modalCtrl.getTop();
                if (element) {
                    return element.dismiss();
                }
            } catch (error) {
                console.log(error);
            }

            // close side menu
            try {
                const element = await this.menu.isOpen();
                if (element) {
                    return this.menu.close();
                }

            } catch (error) {}

            let podeFecharAppAoVoltar = 
                       this.router.url === '/'
                    || this.router.url === '/login'
                    || this.router.url === '/consultas'
                    || this.router.url === '/seus-medicamentos';


            if (podeFecharAppAoVoltar) {
                this.routerOutlets.forEach((outlet: IonRouterOutlet) => {
                    if (outlet && outlet.canGoBack()) {
                         return outlet.pop();
                     } 
     
                     if (podeFecharAppAoVoltar) {
                         if (new Date().getTime() - this.lastTimeBackPress < this.timePeriodToExit) {
                             navigator['app'].exitApp(); // work in ionic 4
     
                         } else {
                             this.utilService.showToast(`Pressione novamente para fechar o app.`)
                             this.lastTimeBackPress = new Date().getTime();
                         }
                     }
                 });
            } else {
                this.navController.back();
            }
        });
    }
}
