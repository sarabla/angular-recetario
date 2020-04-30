import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-barra-busqueda',
  templateUrl: './barra-busqueda.component.html',
  styleUrls: ['./barra-busqueda.component.scss'],
})
export class BarraBusquedaComponent implements OnInit {
  @Output() mensajeDesdeBarra = new EventEmitter<string>();

  constructor(private router: Router) {}

  ngOnInit(): void {}

  buscarPalabra(palabraBuscada: string) {
    this.mensajeDesdeBarra.emit(palabraBuscada);
  }
}
