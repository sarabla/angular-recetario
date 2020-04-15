import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListadoRecetasComponent } from './listado-recetas/listado-recetas.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { DetalleRecetaComponent } from './detalle-receta/detalle-receta.component';
import { RecetasFavoritasComponent } from './recetas-favoritas/recetas-favoritas.component';
import { NuevaRecetaComponent } from './nueva-receta/nueva-receta.component';
import { EditarRecetaComponent } from './editar-receta/editar-receta.component';

const routes: Routes = [
  { path: 'recetas', component: ListadoRecetasComponent },
  { path: 'recetas/favoritas', component: RecetasFavoritasComponent },
  { path: 'recetas/new', component: NuevaRecetaComponent },
  { path: 'recetas/edit/:id', component: EditarRecetaComponent },
  { path: 'recetas/:id', component: DetalleRecetaComponent },
  // { path: 'help', component: HelpComponent },
  { path: '', redirectTo: 'recetas', pathMatch: 'full' },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: 'not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
