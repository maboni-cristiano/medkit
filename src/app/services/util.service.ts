
import { Injectable } from '@angular/core';
import { ToastController, AlertController, ModalController, LoadingController, NavController } from '@ionic/angular';
import { DataProviderService } from './data-provider.service';


@Injectable({
    providedIn: 'root'
})
export class UtilService {
    public loading: any;
    constructor(
        private toastCtrl: ToastController,
        private alertCtrl: AlertController,
        private loadingCtrl: LoadingController,
        private navCtrl: NavController,
        private dataProvider: DataProviderService,


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

    async showToast(message: string, duration = 3000) {
        const toast = await this.toastCtrl.create({
            message: message,
            duration: duration,
            color: 'secondary',
        });
        toast.present();
    }

    async showToastError(message: string, duration = 3000) {
        const toast = await this.toastCtrl.create({
            message: message,
            duration: duration,
            color: 'danger',
        });
        toast.present();
    }

    async showToastSuccess(message: string, duration = 3000) {
        const toast = await this.toastCtrl.create({
            message: message,
            duration: duration,
            color: 'success',
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



    hashCode(s: any): number {
        let h = 0;

        for(let i = 0; i < s.length; i++)
            h = Math.imul(31, h) + s.charCodeAt(i) | 0;

        return h;
    }


    public static minuteToTime(minute) {
        let hour = minute / 60;
        hour = parseInt(hour.toString());
        minute = minute % 60;
        return this.doisDigitos(this.abs(hour)) + ":" + this.doisDigitos(this.abs(minute));
    }

    public static minuteToObject(minute) {
        let hour = minute / 60;
        hour = parseInt(hour.toString());
        minute = minute % 60;
        return {hour: this.abs(hour), minute: this.abs(minute)};
    }

    /**
     * Minimo Dois digitos.
     *
     * Se menor igual a 9 fica 09
     * Se o tamanho (lengt) menor que 2 adiciona 0 depois.
     *
     * @param {type} valor
     * @returns {String}
     */
    private static doisDigitos(valor) {
        if (valor !== null) {
            if (valor <= 9) {
                return "0" + valor;
            } else if (valor.toString().length < 2) {
                return valor + "0";
            }
        }

        return valor;
    }

     /**
     * Valor absoluto, removendo sinais negativos.
     * @type type
     */
    private static abs(valor) {
        if (valor !== null) {
            if (valor < 0) {
                return valor * -1;
            }
        }

        return valor;
    }

    public static timeToMinute(time: string): number {
        if (!time)
            return 0;

        const hour = parseInt(time.substring(0, time.indexOf(":")));
        const minute = parseInt(time.substring(time.indexOf(":") + 1));

        return (hour * 60) + minute;
    }


    retira_acentos(str) {
        let com_acento = "ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝŔÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿŕ";
        let sem_acento = "AAAAAAACEEEEIIIIDNOOOOOOUUUUYRsBaaaaaaaceeeeiiiionoooooouuuuybyr";

        let novastr = "";
        for(let i=0; i<str.length; i++) {
            let troca=false;
            for (let a=0; a<com_acento.length; a++) {
                if (str.substr(i,1)==com_acento.substr(a,1)) {
                    novastr+=sem_acento.substr(a,1);
                    troca=true;
                    break;
                }
            }
            if (troca==false) {
                novastr+=str.substr(i,1);
            }
        }

        return novastr;
    }


}