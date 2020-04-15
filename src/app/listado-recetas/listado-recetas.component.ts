import { Component, OnInit, ViewChildren } from '@angular/core';
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
  recetasFav: Array<Receta>;

  constructor(private router: Router, private recetasService: RecetasService) {}

  ngOnInit(): void {
    this.getRecetas();
    this.getFavs();
  }

  getRecetas(): void {
    this.recetasService
      .getAll()
      .subscribe((recetasList) => (this.recetas = recetasList));
  }

  getFavs(): void {
    this.recetasService
      .getFavs()
      .subscribe((recetasList) => (this.recetasFav = recetasList));
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
