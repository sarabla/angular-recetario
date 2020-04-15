import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';

import { ListadoRecetasComponent } from './listado-recetas/listado-recetas.component';
import { RecetasFavoritasComponent } from './recetas-favoritas/recetas-favoritas.component';
import { DetalleRecetaComponent } from './detalle-receta/detalle-receta.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { NuevaRecetaComponent } from './nueva-receta/nueva-receta.component';
import { EditarRecetaComponent } from './editar-receta/editar-receta.component';

@NgModule({
  declarations: [
    AppComponent,
    ListadoRecetasComponent,
    RecetasFavoritasComponent,
    DetalleRecetaComponent,
    NotFoundComponent,
    NuevaRecetaComponent,
    EditarRecetaComponent
  ],
  imports: [
    BrowserAnimationsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
