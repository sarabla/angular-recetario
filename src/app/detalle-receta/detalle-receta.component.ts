import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecetasService } from '../recetas.service';
import { Receta } from '../model/receta';

@Component({
  selector: 'app-detalle-receta',
  templateUrl: './detalle-receta.component.html',
  styleUrls: ['./detalle-receta.component.scss'],
})
export class DetalleRecetaComponent implements OnInit {
  id: number;
  receta: Receta;

  constructor(
    private activatedRoute: ActivatedRoute,
    private recetasService: RecetasService
  ) {}

  ngOnInit(): void {
    this.id = Number(this.activatedRoute.snapshot.params.id);
    this.receta = this.recetasService.getOne(this.id);
    if (this.receta.comensales > 1) {
      this.receta.ingredientes.map((ingrediente) => {
        ingrediente.cantidad = ingrediente.cantidad / this.receta.comensales;
      });
    }
  }

  modificarComensales(aumento: number): void {
    if (this.receta.comensales + aumento > 0 ) {
      this.receta.comensales = this.receta.comensales + aumento;
    }
  }

  addFav(): void {
    this.receta.favorita = true;
    this.recetasService.addRecetaFav(this.receta);
  }

  removeFav(): void {
    this.receta.favorita = false;
    this.recetasService.removeRecetaFav(this.receta);
  }
}
