import { Component, OnInit } from '@angular/core';
import { Receta } from '../model/receta';
import { Router } from '@angular/router';
import { RecetasService } from '../recetas.service';

@Component({
  selector: 'app-recetas-favoritas',
  templateUrl: './recetas-favoritas.component.html',
  styleUrls: ['./recetas-favoritas.component.scss']
})
export class RecetasFavoritasComponent implements OnInit {

  selectedReceta: Receta;
  recetas;

  constructor(private router: Router, private recetasService: RecetasService) { }

  ngOnInit(): void {
    this.recetasService.getFavs().subscribe(recetasList => this.recetas = recetasList);

  }

  selectReceta(receta: Receta): void {
    this.selectedReceta = receta;
    this.router.navigate(['recetas', receta.id]);
  }


}
