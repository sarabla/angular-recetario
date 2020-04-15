import { Component, OnInit } from '@angular/core';
import { Receta } from '../model/receta';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
  FormArray,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RecetasService } from '../recetas.service';
import { UnidadMedida } from '../model/unidad-medida';
import { Alergeno } from '../model/alergeno';
import { Ingrediente } from '../model/Ingrediente';

@Component({
  selector: 'app-editar-receta',
  templateUrl: './editar-receta.component.html',
  styleUrls: ['./editar-receta.component.scss'],
})
export class EditarRecetaComponent implements OnInit {
  id: number;
  receta: Receta;
  recetaForm: FormGroup;
  ingredientesArray: FormArray;
  pasosArray: FormArray;
  alergenosArray: FormArray;
  alergenosData: string[];
  unidadesData: string[];

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private recetasService: RecetasService
  ) {}

  ngOnInit(): void {
    const paramId = this.activatedRoute.snapshot.params.id;
    if (paramId !== null && paramId >= 0) {
      this.id = Number(paramId);
      this.receta = this.recetasService.getOne(this.id);
    }

    this.recetaForm = this.formBuilder.group({
      nombre: new FormControl(this.receta.nombre, [
        Validators.required,
        Validators.minLength(3),
      ]),
      comensales: new FormControl(this.receta.comensales, Validators.required),
      ingredientes: this.formBuilder.array([
        this.receta.ingredientes.map((ingrediente) => {
          return this.createIngrediente(ingrediente);
        })
      ]),
      pasos: this.formBuilder.array([
        this.receta.pasos.map((paso) => {
          return this.createPaso(paso);
        })
      ]),
      alergenos: this.formBuilder.array([this.receta.alergenos.map((alergeno) => {
        return this.createAlergeno(alergeno);
      })]),
      imagen: new FormControl(this.receta.imagen),
    });
  }
  getUnidadMedidaValues(): string[] {
    return Object.keys(UnidadMedida).filter((type) => type !== 'values');
  }

  getAlergenoValues(): string[] {
    return Object.keys(Alergeno).filter((type) => type !== 'values');
  }

  newIngrediente(): FormGroup {
    return this.formBuilder.group({
      ingrediente: new FormControl('', Validators.required),
      cantidad: new FormControl(0, Validators.required),
      unidad: new FormControl(0, Validators.required),
    });
  }

  newPaso(): FormGroup {
    return this.formBuilder.group({
      paso: new FormControl('', Validators.required),
    });
  }

  newAlergeno(): FormGroup {
    return this.formBuilder.group({
      alergeno: new FormControl('', Validators.required),
    });
  }


  createIngrediente(ingrediente: Ingrediente): FormGroup {
    return this.formBuilder.group({
      ingrediente: new FormControl(
        ingrediente.ingrediente,
        Validators.required
      ),
      cantidad: new FormControl(ingrediente.cantidad, Validators.required),
      unidad: new FormControl(ingrediente.unidad, Validators.required),
    });
  }

  createPaso(paso: string): FormGroup {
    return this.formBuilder.group({
      paso: new FormControl(paso, Validators.required),
    });
  }

  createAlergeno(alergeno: string): FormGroup {
    return this.formBuilder.group({
      alergeno: new FormControl(alergeno, Validators.required),
    });
  }

  addIngrediente(): void {
    // this.ingredientesArray = this.recetaForm.get('ingredientes') as FormArray;
    // this.ingredientesArray.push(this.createIngrediente());
    this.ingredientes.push(this.newIngrediente());
  }

  removeIngrediente(index: number): void {
    this.ingredientesArray.removeAt(index);
  }

  addPaso(): void {
    this.pasosArray = this.recetaForm.get('pasos') as FormArray;
    this.pasosArray.push(this.newPaso());
  }

  removePaso(index: number): void {
    this.pasosArray.removeAt(index);
  }

  addAlergeno(): void {
    this.alergenosArray = this.recetaForm.get('alergenos') as FormArray;
    this.alergenosArray.push(this.newAlergeno());
  }

  removeAlergeno(index: number): void {
    this.alergenosArray.removeAt(index);
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
