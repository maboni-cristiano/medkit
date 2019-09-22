import { Injectable } from '@angular/core';
import { UsuarioService } from './usuario.service';
import { UtilService } from './util.service';
import { NotificacaoService } from './notificacao.service';

@Injectable({
    providedIn: 'root'
})
export class MedicamentoService {

    constructor(
        private utilService: UtilService,
        private notificacaoService: NotificacaoService
    ) { }

    salvarMedicamento(data) {
        return new Promise((resolve, reject) => {
            try {
                const idUsuarioLogado = UsuarioService.getIdUsuarioLogado();
                let dbMedicamentoCollectionText = localStorage.getItem(`${idUsuarioLogado}/medicamentos`);
                let collection = [];

                if (dbMedicamentoCollectionText) {
                    collection = JSON.parse(dbMedicamentoCollectionText);
                }

                if (data.id) {
                    // localiza e seta todos os atributos ao medicamento, para remover as notificacoes.
                    collection.map((med) => {
                        if (data.id === med.id) {
                            this.removerNotificacoesMedicamento(med);
                        }
                    })

                    //todos menos o id que esta editando.
                    collection = collection.filter((medBD) => {
                        return data.id !== medBD.id;
                    });
                } else {
                    data.id = new Date().getTime();
                }

                this.adicionarNotificacaoHorario(data);
                collection.push(data);
                localStorage.setItem(`${idUsuarioLogado}/medicamentos`, JSON.stringify(collection));
                resolve(data);
            } catch (e) {
                reject(e);
            }
        });
    }

    adicionarNotificacaoParaTodosOsProdutos() {
        const idUsuarioLogado = UsuarioService.getIdUsuarioLogado();
        let dbMedicamentoCollectionText = localStorage.getItem(`${idUsuarioLogado}/medicamentos`);
        let collection = [];

        if (dbMedicamentoCollectionText) {
            collection = JSON.parse(dbMedicamentoCollectionText);

            for (let i = 0; i < collection.length; i++) {
                this.removerNotificacoesMedicamento(collection[i]);
                this.adicionarNotificacaoHorario(collection[i]);
            }
        }
    }

    adicionarNotificacaoHorario(medicamento) {
        if (medicamento) {
            if (medicamento.horarios && medicamento.horarios.length > 0) {
                for (let i = 0; i < medicamento.horarios.length; i++) {
                    const horario = medicamento.horarios[i];

                    const id = medicamento.id + this.utilService.hashCode(horario);
                    let minute = UtilService.timeToMinute(horario);

                    //diminui 3 minutos para notificar..
                    minute = minute - 3;
                    let time = UtilService.minuteToObject(minute);

                    this.notificacaoService
                        .sendNotificacaoRepeatly(
                            id,
                            "Hora de se medicar!",
                            `Lembre se de tomar seu medicamento: ${medicamento.nome} as ${horario}`,
                            time.hour,
                            time.minute
                        )
                }
            }
        }
    }

    removerNotificacoesMedicamento(medicamento) {
        if (medicamento) {
            if (medicamento.horarios && medicamento.horarios.length > 0) {
                for (let i = 0; i < medicamento.horarios.length; i++) {
                    const horario = medicamento.horarios[i];

                    const id = medicamento.id + this.utilService.hashCode(horario);
                    this.notificacaoService.removeNotification(id);
                }
            }
        }
    }

    buscarTodosMedicamentos() {
        return new Promise((resolve, reject) => {
            const idUsuarioLogado = UsuarioService.getIdUsuarioLogado();
            let dbMedicamentoCollectionText = localStorage.getItem(`${idUsuarioLogado}/medicamentos`);

            if (dbMedicamentoCollectionText) {
                let collection = JSON.parse(dbMedicamentoCollectionText);
                //ordena a lista
                collection = collection.sort((a, b) => a.nome.localeCompare(b.nome));
                resolve(collection);
                return;
            }

            resolve([]);
        });
    }

    excluirMedicamento(medicamento) {
        return new Promise((resolve, reject) => {
            const idUsuarioLogado = UsuarioService.getIdUsuarioLogado();
            let dbMedicamentoCollectionText = localStorage.getItem(`${idUsuarioLogado}/medicamentos`);
            let collection = JSON.parse(dbMedicamentoCollectionText);

            // localiza e seta todos os atributos ao medicamento, para remover as notificacoes.
            collection.map((med) => {
                if (medicamento.id === med.id) {
                    medicamento = med;
                }
            })

            let novaLista = collection.filter((medBD) => {
                return medicamento.id !== medBD.id;
            });

            if (novaLista.length === collection.length) {
                return reject("Item não encontrado!");
            }

            this.removerNotificacoesMedicamento(medicamento);

            localStorage.setItem(`${idUsuarioLogado}/medicamentos`, JSON.stringify(novaLista));
            resolve(true);
        });
    }
}
