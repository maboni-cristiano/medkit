import { Component, OnInit } from '@angular/core';
import { Button } from 'protractor';

@Component({
  selector: 'app-bulas',
  templateUrl: './bulas.page.html',
  styleUrls: ['./bulas.page.scss'],
})
export class BulasPage implements OnInit {
  nome: string = ""
  bulas: any;
  bulasFiltradas: any;

  constructor() {
    this.bulas = [

    ];
    this.bulasFiltradas = this.bulas;

  }

  ngOnInit() {
  }
  atualizarBulas(event: any) {
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }

  filtrarItens() {
    this.bulasFiltradas = this.filtrarBulas(this.nome);

  }

  filtrarBulas(nome) {
    this.bulasFiltradas = this.bulas;
    return this.bulasFiltradas.filter((item) => {
      return item.nome.toLowerCase().includes(nome.toLowerCase());

    });

  }
}
