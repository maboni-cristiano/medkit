
import { Injectable } from '@angular/core';
import { ToastController, AlertController, ModalController, LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  public loading: any;
  constructor(
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,



  ) { }

  async showAlert(message: string) {
    const alert = await this.alertCtrl.create({
      header: 'Atenção',
      //subHeader: 'Subtitle',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  async showAlertWithCallback(message: string, callback, title = "Atenção") {
    const alert = await this.alertCtrl.create({
      header: title,
      //subHeader: 'Subtitle',
      message: message,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            if (callback != null) {
              callback();
            }
          }
        }
      ]
    });

    await alert.present();
  }

  async showAlertYesNoWithCallback(message: string, callbackYes, callbackNo, title = "Atenção") {
    const alert = await this.alertCtrl.create({
      header: title,
      message: message,
      buttons: [
        {
          text: 'Sim',
          handler: () => {
            if (callbackYes != null) {
                callbackYes();
            }
          }
        },
        {
            text: 'Não',
            handler: () => {
              if (callbackNo != null) {
                callbackNo();
              }
            }
          }
      ]
    });

    await alert.present();
  }

  async showLoading(message: string = 'Processando...') {
    const loading = await this.loadingCtrl.create({
      message: message
    });
    return loading;
  }

  async showToast(message: string, duration = 2000) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: duration,
      color: 'secondary',
    });
    toast.present();
  }

  async showToastCallBack(message: string, duration = 2000, callback) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: duration,
      color: 'secondary',

    });
    toast.present();

    toast.onDidDismiss().then(() => {
      if (callback != null) {
        callback();
      }
    });
  }

  isOnline(): boolean {
    return navigator.onLine;
  }



}