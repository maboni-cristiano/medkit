import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { LocalNotifications } from '@ionic-native/local-notifications/ngx'
import { Firebase } from '@ionic-native/firebase/ngx';
import { CoreModule } from './core/core.module';
import { UsuarioService } from './services/usuario.service';

@NgModule({
  declarations: [AppComponent],
  imports: [CoreModule, AppRoutingModule],
  bootstrap: [AppComponent],
  providers: [
    Firebase,
    LocalNotifications,
    UsuarioService
  ]
})
export class AppModule { }
