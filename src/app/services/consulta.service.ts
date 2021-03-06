import { Injectable } from '@angular/core';
import { UsuarioService } from './usuario.service';
import { NotificacaoService } from './notificacao.service';
import * as moment from 'moment';
import { UtilService } from './util.service';

@Injectable({
    providedIn: 'root'
})
export class ConsultaService {

    constructor(
        private notificacaoService: NotificacaoService,
        private utilService: UtilService,
        private usuarioService: UsuarioService
    ) { }

    buscarTodos() {
        return new Promise<any[]>((resolve, reject) => {
            const idUsuarioLogado = UsuarioService.getIdUsuarioLogado();
            let dbCollectionText = localStorage.getItem(`${idUsuarioLogado}/consultas`);

            if (dbCollectionText) {
                let collection = JSON.parse(dbCollectionText);
                //ordena a lista
                collection = collection.sort((a, b) => a.descricao.localeCompare(b.descricao));
                resolve(collection);
                return;
            }

            resolve([]);
        });
    }

    salvar(data) {
        return new Promise((resolve, reject) => {
            try {
                const idUsuarioLogado = UsuarioService.getIdUsuarioLogado();
                let dbCollectionText = localStorage.getItem(`${idUsuarioLogado}/consultas`);
                let collection = [];

                if (dbCollectionText) {
                    collection = JSON.parse(dbCollectionText);
                }

                if (data.id) {
                    // localiza e seta todos os atributos, para remover as notificacoes.
                    collection.map((med) => {
                        if (data.id === med.id) {
                            this.removerNotificacoesConsulta(med);
                        }
                    })

                    //todos menos o id que esta editando.
                    collection = collection.filter((medBD) => {
                        return data.id !== medBD.id;
                    });
                } else {
                    data.id = new Date().getTime();
                }

                this.adicionarNotificacaoConsulta(data);
                collection.push(data);
                localStorage.setItem(`${idUsuarioLogado}/consultas`, JSON.stringify(collection));
                resolve(data);
            } catch (e) {
                reject(e);
            }
        });
    }

    excluir(consulta) {
        return new Promise((resolve, reject) => {
            const idUsuarioLogado = UsuarioService.getIdUsuarioLogado();
            let dbMedicamentoCollectionText = localStorage.getItem(`${idUsuarioLogado}/consultas`);
            let collection = JSON.parse(dbMedicamentoCollectionText);

            // localiza e seta todos os atributos, para remover as notificacoes.
            collection.map((med) => {
                if (consulta.id === med.id) {
                    consulta = med;
                }
            })

            let novaLista = collection.filter((medBD) => {
                return consulta.id !== medBD.id;
            });

            if (novaLista.length === collection.length) {
                return reject("Item n??o encontrado!");
            }

            this.removerNotificacoesConsulta(consulta);

            localStorage.setItem(`${idUsuarioLogado}/consultas`, JSON.stringify(novaLista));
            resolve(true);
        });
    }

    async adicionarNotificacaoConsulta(consulta, exibirToast = true) {

        let usuarioLogado :any = await this.usuarioService.getDadosUsuarioLogado();

        if (usuarioLogado
        && usuarioLogado.st_notificacao
        && usuarioLogado.st_notificacao === "NAO") {
            console.log("nao notifica")
            return;
        }

        try {
            if (consulta) {
                if (consulta.data) {
                    let momentDate = moment(consulta.data);

                    if (consulta.hora) {
                        let momentHora = moment(consulta.hora);
                        momentDate.hour(momentHora.hour());
                        momentDate.minute(momentHora.minute());


                        let momentComparacao = moment(momentDate);
                        momentComparacao.subtract(60, 'minute');

                        if (momentComparacao.isAfter(moment())) {
                            momentDate = momentComparacao;
                        }
                    } else {
                        momentDate.hour(7);
                        momentDate.minute(15);
                    }

                    if (momentDate.isAfter(moment())) {
                        this.notificacaoService.sendNotificacaoAtTime(
                            consulta.id,
                            "N??o esque??a de sua consulta!",
                            `Sua consulta: ${consulta.descricao} ?? hoje` + (consulta.hora ? ` as ${this.formatHora(consulta.hora)}.` : '.'),
                            momentDate.toDate()
                        );

                        if (exibirToast)
                            this.utilService.showToast(`Voc?? ser?? notificado em: ${momentDate.format("DD/MM/YY HH:mm")}`)
                    } else {
                        if (exibirToast)
                            this.utilService.showToast(`N??o ir?? exibir notifica????o, pois a data e hora j?? passaram.`);
                    }
                }
            }
        } catch(e) {
            console.log(e);
        }
    }

    removerNotificacoesConsulta(consulta) {
        try {

            this.notificacaoService.removeNotification(
                consulta.id
            );
        } catch(e) {
            console.log(e);
        }
    }

    async adicionarNotificacaoParaTodasAsConsultas() {
        const lista = await this.buscarTodos();

        for(let i=0; i<lista.length; i++){
            this.removerNotificacoesConsulta(lista[i]);
            this.adicionarNotificacaoConsulta(lista[i], false);
        }
    }

    formatData(data) {
        if (!data)
            return data;
        return moment(data).format("DD/MM/YYYY");
    }

    formatHora(data) {
        if (!data)
            return data;

        return moment(data).format("HH:mm");
    }
    }