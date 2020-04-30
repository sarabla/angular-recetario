import { Component, OnInit, ViewChildren, Input } from '@angular/core';
import { Receta } from '../model/receta';
import { Router } from '@angular/router';
import { RecetasService } from '../recetas.service';

@Component({
  selector: 'app-listado-recetas',
  templateUrl: './listado-recetas.component.html',
  styleUrls: ['./listado-recetas.component.scss'],
})
export class ListadoRecetasComponent implements OnInit {

  selectedReceta: Receta;
  recetas: Array<Receta>;
  @Input()
  busquedaBarra: string;

  constructor(private router: Router, private recetasService: RecetasService) {}

  ngOnInit(): void {
    this.getRecetas();
  }

  getRecetas(): void {
    this.recetasService
      .getAll()
      .subscribe((recetasList) => (this.recetas = recetasList));
  }

  filter(listaRecetas: Array<Receta>): Array<Receta> {
    if ( this.busquedaBarra !== null && this.busquedaBarra !== '') {
      const lista = listaRecetas.filter(receta => {
        if (this.busquedaBarra.includes(receta.nombre) || receta.nombre.includes(this.busquedaBarra)) {
          return receta;
        }
      });
      return lista;
    } else {
      return this.recetas;
    }

  }

  selectReceta(receta: Receta): void {
    this.selectedReceta = receta;
    this.router.navigate(['recetas', receta.id]);
  }

  editReceta(receta: Receta): void {
    this.selectedReceta = receta;
    this.router.navigate(['recetas/edit', receta.id]);
  }

  addFav(receta: Receta): void {
    this.recetasService.addRecetaFav(receta);
  }

  removeFav(receta: Receta): void {
    this.recetasService.removeRecetaFav(receta);
  }

  removeReceta(receta: Receta): void {
    this.recetasService.removeReceta(receta);
  }
}
