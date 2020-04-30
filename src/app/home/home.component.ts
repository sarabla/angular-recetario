import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  busqueda: string;

  constructor() { }

  ngOnInit(): void {
  }

  enviarBusqueda(mensaje: string){
    this.busqueda = mensaje;
  }

}
