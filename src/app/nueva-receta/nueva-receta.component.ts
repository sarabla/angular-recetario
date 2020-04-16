import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormGroup,
  FormControl,
  FormArray,
  ValidatorFn,
  AbstractControl,
} from '@angular/forms';
import { RecetasService } from '../recetas.service';
import { Router } from '@angular/router';
import { UnidadMedida } from '../model/unidad-medida';
import { TipoAlergeno } from '../model/tipo-alergeno';

@Component({
  selector: 'app-nueva-receta',
  templateUrl: './nueva-receta.component.html',
  styleUrls: ['./nueva-receta.component.scss'],
})
export class NuevaRecetaComponent implements OnInit {
  id: number;
  recetaForm: FormGroup;
  alergenosData: string[];
  unidadesData: string[];
  error = false;

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
      comensales: new FormControl(4, [Validators.required, this.forbiddenValueValidator(/0/i)]),
      ingredientes: this.formBuilder.array([this.createIngrediente()]),
      pasos: this.formBuilder.array([this.createPaso()]),
      alergenos: this.formBuilder.array([]),
      imagen: new FormControl(''),
    });

    this.alergenosData = this.getAlergenoValues();
    this.unidadesData = this.getUnidadMedidaValues();
  }

  forbiddenValueValidator(nameRe: RegExp): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const forbidden = nameRe.test(control.value);
      return forbidden ? {forbiddenValue: {value: control.value}} : null;
    };
  }

  getUnidadMedidaValues(): string[] {
    const result = Object.keys(UnidadMedida).filter(
      (type) => type !== 'values'
    );
    return ['', ...result];
  }

  getAlergenoValues(): string[] {
    const result = Object.keys(TipoAlergeno).filter(
      (type) => type !== 'values'
    );
    return ['', ...result];
  }

  createIngrediente(): FormGroup {
    return this.formBuilder.group({
      ingrediente: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      cantidad: '',
      unidad: '',
    });
  }

  addIngrediente(): void {
    this.ingredientes.push(this.createIngrediente());
  }

  removeIngrediente(index: number): void {
    this.ingredientes.removeAt(index);
  }

  onUnidadSelected(event, index: number): void {
    this.ingredientes.value[index].unidad = event.target.value;
  }

  createPaso(): FormGroup {
    return this.formBuilder.group({
      paso: new FormControl('', Validators.required),
    });
  }

  addPaso(): void {
    this.pasos.push(this.createPaso());
  }

  removePaso(index: number): void {
    this.pasos.removeAt(index);
  }

  createAlergeno(texto: string = ''): FormGroup {
    return this.formBuilder.group({
      alergeno: new FormControl(texto, Validators.required),
    });
  }

  addAlergeno(texto: string = ''): void {
    this.alergenos.push(this.createAlergeno(texto));
  }

  removeAlergeno(index: number): void {
    this.alergenos.removeAt(index);
  }

  onAlergenosSelected(event): void {
    if (event.target.value !== '') {
      let repetido = false;
      for (const alergeno of this.alergenos.controls) {
        if (alergeno.value.alergeno === event.target.value) {
          repetido = true;
          break;
        }
      }
      if (!repetido) {
        this.addAlergeno(event.target.value);
      }
    }
  }

  onSubmit(): void {
    if (this.recetaForm.valid) {
      this.error = false;
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
    } else {
      this.error = true;
    }
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
