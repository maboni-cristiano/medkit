import { Injectable } from '@angular/core';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class MedicamentoService {

  constructor(
      private usuarioService: UsuarioService
  ) { }

  salvarMedicamento(data) {
    return new Promise((resolve, reject) => {
        try {
            const idUsuarioLogado = this.usuarioService.getIdUsuarioLogado();
            let dbMedicamentoCollectionText = localStorage.getItem(`${idUsuarioLogado}/medicamentos`);      
            let collection = [];
            
            if (dbMedicamentoCollectionText) {
                collection = JSON.parse(dbMedicamentoCollectionText);
            }

            if (data.id) {
                //todos menos o id que esta editando.
                collection = collection.filter((medBD) => {
                    return data.id !== medBD.id;
                });
            } else {
                data.id = new Date().getTime();
            } 

            collection.push(data);
            localStorage.setItem(`${idUsuarioLogado}/medicamentos`, JSON.stringify(collection));
            resolve(data);
        } catch(e) {
            reject(e);
        }
    });
  }

  buscarTodosMedicamentos() {
    return new Promise((resolve, reject) => {
        const idUsuarioLogado = this.usuarioService.getIdUsuarioLogado();
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
        const idUsuarioLogado = this.usuarioService.getIdUsuarioLogado();
        let dbMedicamentoCollectionText = localStorage.getItem(`${idUsuarioLogado}/medicamentos`);      
        let collection = JSON.parse(dbMedicamentoCollectionText);

        let novaLista = collection.filter((medBD) => {
            return medicamento.id !== medBD.id;
        });

        if (novaLista.length === collection.length) {
            return reject("Item não encontrado!");
        }  

        localStorage.setItem(`${idUsuarioLogado}/medicamentos`, JSON.stringify(novaLista));
        resolve(true);
    });
  }
}
