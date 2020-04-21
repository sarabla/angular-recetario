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
import { HomeComponent } from './home/home.component';
import { BarraBusquedaComponent } from './barra-busqueda/barra-busqueda.component';
import { FilterPipe } from './barra-busqueda/filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ListadoRecetasComponent,
    RecetasFavoritasComponent,
    DetalleRecetaComponent,
    NotFoundComponent,
    NuevaRecetaComponent,
    HomeComponent,
    BarraBusquedaComponent,
    FilterPipe
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
