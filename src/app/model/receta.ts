import { Ingrediente } from './Ingrediente';
import { Alergeno } from './alergeno';

export class Receta {
  id: number;
  nombre: string;
  ingredientes: Array<Ingrediente>;
  comensales: number;
  pasos: Array<string>;
  alergenos: Array<Alergeno>;
  imagen: string;
  favorita: boolean;
}
