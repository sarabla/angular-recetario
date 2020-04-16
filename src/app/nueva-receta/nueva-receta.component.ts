import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormGroup,
  FormControl,
  FormArray,
} from '@angular/forms';
import { RecetasService } from '../recetas.service';
import { Router } from '@angular/router';
import { Ingrediente } from '../model/Ingrediente';
import { Alergeno } from '../model/alergeno';
import { UnidadMedida } from '../model/unidad-medida';

@Component({
  selector: 'app-nueva-receta',
  templateUrl: './nueva-receta.component.html',
  styleUrls: ['./nueva-receta.component.scss'],
})
export class NuevaRecetaComponent implements OnInit {
  id: number;
  recetaForm: FormGroup;
  ingredientesArray: FormArray;
  pasosArray: FormArray;
  alergenosArray: FormArray;
  alergenosData: string[];
  unidadesData: string[];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private recetasService: RecetasService
  ) {}

  ngOnInit(): void {
    this.recetaForm = this.formBuilder.group({
      nombre: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      comensales: new FormControl(4, Validators.required),
      ingredientes: this.formBuilder.array([this.createIngrediente()]),
      pasos: this.formBuilder.array([this.createPaso()]),
      alergenos: this.formBuilder.array([]),
      imagen: new FormControl(''),
    });

    this.ingredientesArray = this.recetaForm.get('ingredientes') as FormArray;
    this.alergenosData = this.getAlergenoValues();
    this.unidadesData = this.getUnidadMedidaValues();
  }

  getUnidadMedidaValues(): string[] {
    const result = Object.keys(UnidadMedida).filter((type) => type !== 'values');
    return ['', ...result];
  }

  getAlergenoValues(): string[] {
    const result = Object.keys(Alergeno).filter((type) => type !== 'values');
    return ['', ...result];
  }

  createIngrediente(): FormGroup {
    return this.formBuilder.group({
      ingrediente: '',
      cantidad: 0,
      unidad: '',
    });
  }

  addIngrediente(): void {
    this.ingredientesArray = this.recetaForm.get('ingredientes') as FormArray;
    this.ingredientesArray.push(this.createIngrediente());
  }

  removeIngrediente(index: number): void {
    this.ingredientesArray.removeAt(index);
  }

  onUnidadSelected(event, index): void {
    this.ingredientes.value[index].unidad = event.target.value;
    console.log(this.ingredientes.value);
  }

  createPaso(): FormGroup {
    return this.formBuilder.group({
      // paso: new FormControl('', Validators.required),
      paso: ''
    });
  }

  addPaso(): void {
    this.pasosArray = this.recetaForm.get('pasos') as FormArray;
    this.pasosArray.push(this.createPaso());
  }

  removePaso(index: number): void {
    this.pasosArray.removeAt(index);
  }

  createAlergeno(texto: string = ''): FormGroup {
    return this.formBuilder.group({
      // alergeno: new FormControl(texto, Validators.required)
      alergeno: texto
    });
  }

  addAlergeno(texto: string = ''): void {
    this.alergenosArray = this.recetaForm.get('alergenos') as FormArray;
    this.alergenosArray.push(this.createAlergeno(texto));
  }

  removeAlergeno(index: number): void {
    this.alergenosArray.removeAt(index);
  }

  onAlergenosSelected(event): void {
    this.addAlergeno(event.target.value);
  }

  onSubmit(): void {
    const recetaNew = {
      id: Math.floor(Math.random() * (1000 + 1)),
      nombre: this.nombre.value,
      comensales: this.comensales.value,
      ingredientes: this.ingredientes.value,
      pasos: this.pasos.value,
      alergenos: this.alergenos.value,
      imagen: this.imagen.value,
      favorita: false,
    };
    this.recetasService.addReceta(recetaNew);
    this.router.navigate(['/recetas']);
  }

  get nombre() {
    return this.recetaForm.get('nombre');
  }

  get comensales() {
    return this.recetaForm.get('comensales');
  }

  get ingredientes() {
    return this.recetaForm.get('ingredientes') as FormArray;
  }

  get pasos() {
    return this.recetaForm.get('pasos') as FormArray;
  }

  get alergenos() {
    return this.recetaForm.get('alergenos') as FormArray;
  }

  get imagen() {
    return this.recetaForm.get('imagen');
  }
}
