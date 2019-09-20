import { Component, OnInit } from '@angular/core';
import { ActionSheetController, NavController, AlertController, Platform } from '@ionic/angular';
import { LocalNotifications, ELocalNotificationTriggerUnit } from '@ionic-native/local-notifications/ngx';

@Component({
  selector: 'app-adicionar-medicamento',
  templateUrl: './adicionar-medicamento.page.html',
  styleUrls: ['./adicionar-medicamento.page.scss'],
})

export class AdicionarMedicamentoPage implements OnInit {

  scheduled = [];
  result: any;
  tipo: false;
  constructor(private plt: Platform, private localNotifications: LocalNotifications, private actionSheetCtrl: ActionSheetController, private navCtrl: NavController, private alertCtrl: AlertController) { }
  ngOnInit() {

  }

   openConfigurarEstoque(){
    this.navCtrl.navigateForward('configurar-estoque');
  };

  async salvarMedicamento() {
    let actionSheet = await this.actionSheetCtrl.create({
      header: 'Deseja salvar esse medicamento?',
      buttons: [{
        text: 'Salvar',
        role: 'destructive',
        icon: 'save',
        handler: () => {
          this.controladorAlert();
        }
      },
      {
        text: 'Cancelar',
        role: 'cancel',
        icon: 'close',
        handler: () => {
          close();
        }
      }

      ]


    })

    await actionSheet.present();
  }

  async cancelarMedicamento() {

    let actionSheet = await this.actionSheetCtrl.create({
      header: 'Deseja cancelar?',
      buttons: [{
        text: 'Sim',
        role: 'destructive',
        icon: 'checkmark',
        handler: () => {
          this.navCtrl.navigateBack('medicamentos');
        }
      },
      {
        text: 'Não',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          close();
        }

      }

    ]
    })
    await actionSheet.present();
  }

  async controladorAlert() {
    let alert = await this.alertCtrl.create({
      header: 'Medicamento Salvo com Sucesso!',
      buttons: [{
        text: 'OK',
      }
    ]
        })
        await alert.present();
        this.navCtrl.navigateBack('medicamentos');
   }

   async adicionarEmail(){
      let alertEmail = await this.alertCtrl.create({
        header: 'Adicionar E-mail Familiar',
        message : 'Nesse campo você adiciona o e-mail de um familiar para caso esqueça de tomar uma medicação, um alerta será enviado ao e-mail dele.',
        inputs:[
          {
            name : 'e-mail',
            type: 'text',
            placeholder : 'Informe o E-mail de seu familiar'
          }
        ],
        buttons : [
          {
            text: 'Cancelar',
            role: 'cancel',
            handler: () =>{
              console.log("Cancelado")
            }
          },
            {
            text: 'Adicionar',
            handler: (data) =>{
              console.log("Adicionado", data)
            }
          }
        ]
   })
   await alertEmail.present();
  }
}
