import { Component, OnInit, ElementRef, Input, HostListener } from '@angular/core';
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
import { Router, ActivatedRoute } from '@angular/router';
import { UnidadMedida } from '../model/unidad-medida';
import { TipoAlergeno } from '../model/tipo-alergeno';
import { Receta } from '../model/receta';

@Component({
  selector: 'app-nueva-receta',
  templateUrl: './nueva-receta.component.html',
  styleUrls: ['./nueva-receta.component.scss']
})
export class NuevaRecetaComponent implements OnInit {
  id: number;
  receta: Receta;
  recetaForm: FormGroup;
  alergenosData: string[];
  unidadesData: string[];
  modoEdicion = false;
  error = false;

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private recetasService: RecetasService
  ) {}

  ngOnInit(): void {
    const paramId = this.activatedRoute.snapshot.params.id;
    if (paramId !== null && paramId >= 0) {
      this.modoEdicion = true;
      this.id = Number(paramId);
      this.receta = this.recetasService.getOne(this.id);

      this.recetaForm = this.formBuilder.group({
        nombre: new FormControl(this.receta.nombre, [
          Validators.required,
          Validators.minLength(3),
        ]),
        comensales: new FormControl(this.receta.comensales, [
          Validators.required,
          this.forbiddenValueValidator(/0/i),
        ]),
        ingredientes: this.formBuilder.array([]),
        pasos: this.formBuilder.array([]),
        alergenos: this.formBuilder.array([]),
        imagen: new FormControl(this.receta.imagen),
      });

      this.darValoresIniciales();
      console.log(this.ingredientes);
      // console.log(this.imagen);

    } else {
      this.recetaForm = this.formBuilder.group({
        nombre: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
        ]),
        comensales: new FormControl(4, [
          Validators.required,
          this.forbiddenValueValidator(/0/i),
        ]),
        ingredientes: this.formBuilder.array([this.createIngrediente()]),
        pasos: this.formBuilder.array([this.createPaso()]),
        alergenos: this.formBuilder.array([]),
        imagen: new FormControl(''),
      });
    }

    this.unidadesData = this.getUnidadMedidaValues();
    this.alergenosData = ['', ...this.getAlergenoValues()];
  }

  forbiddenValueValidator(nameRe: RegExp): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const forbidden = nameRe.test(control.value);
      return forbidden ? { forbiddenValue: { value: control.value } } : null;
    };
  }

  formatUnid(unidad: string): string {
    if (unidad.includes(':')) {
      return unidad;
    }
    const unidades = Object.keys(UnidadMedida).filter(
      (type) => type !== 'values'
    );
    const unid = unidad.toLowerCase();
    for (let i = 0; i < unidades.length; i++) {
      const unidadData = unidades[i];
      if (unid === unidadData) {
        return i.toString() + ': ' + unid;
      }
    }
    return unidad;
  }

  darValoresIniciales(): void {
    this.receta.ingredientes.map((ing) => {
      this.ingredientes.push(
        this.formBuilder.group({
          ingrediente: new FormControl(ing.ingrediente, Validators.required),
          cantidad: new FormControl(ing.cantidad, Validators.required),
          unidad: new FormControl(
            this.formatUnid(ing.unidad),
            Validators.required
          ),
        })
      );
    });

    this.receta.pasos.map((p) => {
      this.pasos.push(
        this.formBuilder.group({
          paso: new FormControl(p.paso, Validators.required),
        })
      );
    });

    this.receta.alergenos.map((alerg) => {
      this.alergenos.push(
        this.formBuilder.group({
          alergeno: new FormControl(alerg.alergeno, Validators.required),
        })
      );
    });
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

  handleImagen(event): void {
    const file = event.dataTransfer ? event.dataTransfer.files[0] : event.target.files[0];
    const reader = new FileReader();

    const fileDto = {
        fileAsBase64: null
    };

    reader.onload = (ev: ProgressEvent) => {
        fileDto.fileAsBase64 = reader.result;
        this.receta.imagen = reader.result.toString();
    };

    reader.readAsDataURL(file);
  }

  onSubmit(): void {
    if (this.recetaForm.valid) {
      this.error = false;
      // console.log(this.modoEdicion);
      if ( this.modoEdicion ) {
       this.recetasService.editReceta(this.recetaForm.value);
      } else {
        const recetaNew: Receta = {
          id: Math.floor(Math.random() * (1000 + 1)),
          ...this.recetaForm.value,
        };
        this.recetasService.addReceta(recetaNew);
      }
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
