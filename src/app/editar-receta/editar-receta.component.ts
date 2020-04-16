import { Component, OnInit } from '@angular/core';
import { Receta } from '../model/receta';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
  FormArray,
  ValidatorFn,
  AbstractControl,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RecetasService } from '../recetas.service';
import { UnidadMedida } from '../model/unidad-medida';
import { TipoAlergeno } from '../model/tipo-alergeno';

@Component({
  selector: 'app-editar-receta',
  templateUrl: './editar-receta.component.html',
  styleUrls: ['./editar-receta.component.scss'],
})
export class EditarRecetaComponent implements OnInit {
  id: number;
  receta: Receta;
  recetaForm: FormGroup;
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
      comensales: new FormControl(this.receta.comensales, [Validators.required, this.forbiddenValueValidator(/0/i)]),
      ingredientes: this.formBuilder.array([]),
      pasos: this.formBuilder.array([]),
      alergenos: this.formBuilder.array([]),
      imagen: new FormControl(this.receta.imagen),
    });

    this.receta.ingredientes.map(ing => {
      this.ingredientes.push(this.formBuilder.group({
        ingrediente: new FormControl(
          ing.ingrediente,
          Validators.required
        ),
        cantidad: new FormControl(ing.cantidad, Validators.required),
        unidad: new FormControl(ing.unidad, Validators.required),
      }));
    });

    this.receta.pasos.map(p => {
      this.pasos.push(this.formBuilder.group({
        paso: new FormControl(
          p.paso,
          Validators.required
        )
      }));
    });

    this.receta.alergenos.map(alerg => {
      this.alergenos.push(this.formBuilder.group({
        alergeno: new FormControl(
          alerg.alergeno,
          Validators.required
        )
      }));
    });

    this.unidadesData = this.getUnidadMedidaValues();
    this.alergenosData = ['', ...this.getAlergenoValues()];

    console.log(this.recetaForm);
  }

  forbiddenValueValidator(nameRe: RegExp): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const forbidden = nameRe.test(control.value);
      return forbidden ? {forbiddenValue: {value: control.value}} : null;
    };
  }

  getUnidadMedidaValues(): string[] {
    return Object.keys(UnidadMedida).filter((type) => type !== 'values');
  }

  getAlergenoValues(): string[] {
    return Object.keys(TipoAlergeno).filter((type) => type !== 'values');
  }

  createIngrediente(): FormGroup {
    return this.formBuilder.group({
      ingrediente: new FormControl(
        '',
        Validators.required
      ),
      cantidad: new FormControl(null),
      unidad: new FormControl(null),
    });
  }

  addIngrediente(): void {
    this.ingredientes.push(this.createIngrediente());
  }

  removeIngrediente(index: number): void {
    this.ingredientes.removeAt(index);
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
      alergeno: new FormControl(texto, Validators.required)
    });
  }

  addAlergeno(texto: string = ''): void {
    this.alergenos.push(this.createAlergeno(texto));
  }

  removeAlergeno(index: number): void {
    this.alergenos.removeAt(index);
  }

  onAlergenosSelected(event): void {
    this.addAlergeno(event.target.value);
  }

  onSubmit(): void {
    if (this.recetaForm.valid) {
      const recetaNew = {
        id: this.receta.id,
        nombre: this.nombre.value,
        comensales: this.comensales.value,
        ingredientes: this.ingredientes.value,
        pasos: this.pasos.value,
        alergenos: this.alergenos.value,
        imagen: this.imagen.value,
        favorita: false,
      };
      this.recetasService.editReceta(recetaNew);
      this.router.navigate(['/recetas']);
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
