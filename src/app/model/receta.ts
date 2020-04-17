import { UnidadMedida } from './unidad-medida';
import { TipoAlergeno } from './tipo-alergeno';

export interface Receta {
  id: number;
  nombre: string;
  ingredientes: Array<Ingrediente>;
  comensales: number;
  pasos: Array<Paso>;
  alergenos: Array<Alergeno>;
  imagen: string;
  favorita: boolean;
}

export interface Ingrediente {
  ingrediente: string;
  cantidad: number;
  unidad: UnidadMedida;
}

export interface Paso {
  paso: string;
}

export interface Alergeno {
  alergeno: TipoAlergeno;
}

