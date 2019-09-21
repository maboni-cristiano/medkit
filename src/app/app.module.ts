import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { LocalNotifications } from '@ionic-native/local-notifications/ngx'
import { Firebase } from '@ionic-native/firebase/ngx';
import { CoreModule } from './core/core.module';
import { UsuarioService } from './services/usuario.service';
import { MedicamentoService } from './services/medicamento.service';
import { DataProviderService } from './services/data-provider.service';
import { AuthGuard } from './services/auth.guard';
import { NotificacaoService } from './services/notificacao.service';

@NgModule({
  declarations: [AppComponent],
  imports: [CoreModule, AppRoutingModule],
  bootstrap: [AppComponent],
  providers: [
    Firebase,
    LocalNotifications,
    UsuarioService,
    MedicamentoService,
    DataProviderService,
    AuthGuard,
    NotificacaoService
  ]
})
export class AppModule { }
