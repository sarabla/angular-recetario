import { Injectable } from '@angular/core';
import { Receta } from './model/receta';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { UnidadMedida } from './model/unidad-medida';
import { Alergeno } from './model/alergeno';
import { TipoAlergeno } from './model/tipo-alergeno';

@Injectable({
  providedIn: 'root',
})
export class RecetasService {
  recetas: Array<Receta> = [
    {
      id: 1,
      nombre: 'Espaguetis a la carbonara',
      ingredientes: [
        {
          ingrediente: 'Espaguetis',
          cantidad: 200,
          unidad: UnidadMedida.gramos,
        },
        {
          ingrediente: 'Bacon',
          cantidad: 100,
          unidad: UnidadMedida.gramos,
        },
        {
          ingrediente: 'Nata de cocinar',
          cantidad: 200,
          unidad: UnidadMedida.mililitros,
        },
      ],
      comensales: 1,
      pasos: [
        {paso: 'Se ponen a cocer los espaguetis.'},
        {paso: 'Se fríe el bacon.'},
        {paso: 'Se cuelan los espaguetis.'},
        {paso: 'Se añade la nata y el bacon frito.'},
      ],
      alergenos: [{alergeno: TipoAlergeno.leche}],
      imagen: '',
      favorita: false,
    },
    {
      id: 2,
      nombre: 'Sopas de ajo',
      ingredientes: [
        {
          ingrediente: 'Ajo',
          cantidad: 50,
          unidad: UnidadMedida.gramos,
        },
        {
          ingrediente: 'Pan de molde',
          cantidad: 200,
          unidad: UnidadMedida.gramos,
        },
        {
          ingrediente: 'Caldo de pollo',
          cantidad: 400,
          unidad: UnidadMedida.mililitros,
        },
      ],
      comensales: 1,
      pasos: [
        {paso: 'Se ponen a cocer el caldo'},
        {paso: 'Se pica el ajo.'},
        {paso: 'Se añade el ajo y el pan'},
        {paso: 'Se deja cocer unos minutos.'},
      ],
      alergenos: [],
      imagen: '',
      favorita: false,
    },
    {
      id: 3,
      nombre: 'Ensalada de pasta',
      ingredientes: [
        {
          ingrediente: 'Tirabuzones de colores',
          cantidad: 300,
          unidad: UnidadMedida.gramos,
        },
        {
          ingrediente: 'Salsa rosa',
          cantidad: 200,
          unidad: UnidadMedida.mililitros,
        },
        {
          ingrediente: 'Tomate',
          cantidad: 100,
          unidad: UnidadMedida.gramos,
        },
        {
          ingrediente: 'Cebolla',
          cantidad: 50,
          unidad: UnidadMedida.gramos,
        },
        {
          ingrediente: 'Aceitunas',
          cantidad: 50,
          unidad: UnidadMedida.gramos,
        },
        {
          ingrediente: 'Jamón cocido',
          cantidad: 100,
          unidad: UnidadMedida.gramos,
        },
      ],
      comensales: 1,
      pasos: [
        {paso: 'Se ponen a cocer los tirabuzones.'},
        {paso: 'Se pican todos los ingredientes.'},
        {paso: 'Se cuelan los tirabuzones.'},
        {paso: 'Se añade los ingredientes picados y se adereza con la salsa.'},
      ],
      alergenos: [{alergeno: TipoAlergeno.leche}],
      imagen: '',
      favorita: true,
    },
  ];

  recetasFavs: Array<Receta> = [
    {
      id: 3,
      nombre: 'Ensalada de pasta',
      ingredientes: [
        {
          ingrediente: 'Tirabuzones de colores',
          cantidad: 300,
          unidad: UnidadMedida.gramos,
        },
        {
          ingrediente: 'Salsa rosa',
          cantidad: 200,
          unidad: UnidadMedida.mililitros,
        },
        {
          ingrediente: 'Tomate',
          cantidad: 100,
          unidad: UnidadMedida.gramos,
        },
        {
          ingrediente: 'Cebolla',
          cantidad: 50,
          unidad: UnidadMedida.gramos,
        },
        {
          ingrediente: 'Aceitunas',
          cantidad: 50,
          unidad: UnidadMedida.gramos,
        },
        {
          ingrediente: 'Jamón cocido',
          cantidad: 100,
          unidad: UnidadMedida.gramos,
        },
      ],
      comensales: 1,
      pasos: [
        {paso: 'Se ponen a cocer los tirabuzones.'},
        {paso: 'Se pican todos los ingredientes.'},
        {paso: 'Se cuelan los tirabuzones.'},
        {paso: 'Se añade los ingredientes picados y se adereza con la salsa.'},
      ],
      alergenos: [{alergeno: TipoAlergeno.leche}],
      imagen: '',
      favorita: true,
    },
  ];

  constructor() {}

  getAll(): Observable<Array<Receta>> {
    return of(this.recetas);
  }

  getOne(id: number): Receta {
    return this.recetas.find((element) => element.id === id);
  }

  addReceta(receta: Receta) {
    this.recetas.push(receta);
  }

  editReceta(receta: Receta) {
    this.removeReceta(receta);
    this.recetas.push(receta);
    if (receta.favorita) {
      this.addRecetaFav(receta);
    }
  }

  removeReceta(receta: Receta) {
    this.removeRecetaFav(receta);
    const index = this.recetas.findIndex((element) => element.id === receta.id);
    if (index > -1) {
      this.recetas.splice(index, 1);
    }
  }

  getFavs(): Observable<Array<Receta>> {
    return of(this.recetasFavs);
  }

  addRecetaFav(receta: Receta) {
    this.recetasFavs.push(receta);
    receta.favorita = true;
  }

  removeRecetaFav(receta: Receta) {
    const index = this.recetasFavs.findIndex(
      (element) => element.id === receta.id
    );
    if (index > -1) {
      this.recetasFavs.splice(index, 1);
      receta.favorita = false;
    }

  }
}
