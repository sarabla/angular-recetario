import { Ingrediente } from './Ingrediente';
import { Alergeno } from './alergeno';
import { Paso } from './paso';

export class Receta {
  id: number;
  nombre: string;
  ingredientes: Array<Ingrediente>;
  comensales: number;
  pasos: Array<Paso>;
  alergenos: Array<Alergeno>;
  imagen: string;
  favorita: boolean;
}
