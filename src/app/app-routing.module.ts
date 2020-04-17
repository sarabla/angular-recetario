import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { DetalleRecetaComponent } from './detalle-receta/detalle-receta.component';
import { NuevaRecetaComponent } from './nueva-receta/nueva-receta.component';
import { EditarRecetaComponent } from './editar-receta/editar-receta.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'recetas', component: HomeComponent },
  { path: 'recetas/new', component: NuevaRecetaComponent },
  { path: 'recetas/edit/:id', component: EditarRecetaComponent },
  { path: 'recetas/:id', component: DetalleRecetaComponent },
  { path: '', redirectTo: 'recetas', pathMatch: 'full' },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: 'not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
