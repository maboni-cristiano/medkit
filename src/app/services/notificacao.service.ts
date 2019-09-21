import { Injectable } from '@angular/core';
import { LocalNotifications, ELocalNotificationTriggerUnit } from '@ionic-native/local-notifications/ngx';

@Injectable({
    providedIn: 'root'
})
export class NotificacaoService {

    constructor(
        private localNotifications: LocalNotifications
    ) { }

    sendNotificacaoAtTime(id: number, title: string, text: string, atTime: Date) {
        this.localNotifications.schedule({
            id,
            title,
            text,
            trigger: { at: atTime },
            foreground: true // Show the notification while app is open
        });
    }

    sendNotificacaoRepeatly(id: number, title: string, text: string, hour: number, minute: number, group = "lembrete_medicamento") {
        this.localNotifications.schedule({
            id,
            title,
            text,
            group,
            trigger: { count: 1,  every: { hour, minute } },
            foreground: true,
            lockscreen: true

        });
    }

    /**
     * Remove apenas a notificacao que corresponda o ID.
     * Pode ser que nao exista, isso nao dará problema.
     */
    removeNotification(id: number) {
        this.localNotifications.cancel(id)
    }

    /**
     * Remove todas as notificacoes programadas.
     */
    removeAllNotification() {
        this.localNotifications.cancelAll();
    }

    /**
     * Limpa todas as notificacoes que estão sendo exibidas agora.
     */
    clearAllNotification() {
        this.localNotifications.clearAll();
    }

    async getAll() {
        return await this.localNotifications.getAll()
    }

}
