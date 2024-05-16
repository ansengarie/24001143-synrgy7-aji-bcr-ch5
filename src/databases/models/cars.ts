import { Model, ModelObject } from "objection";

export class CarsModel extends Model {
  id!: number;
  name!: string;
  type!: string;
  price!: number;
  size!: string;
  image!: string;
  image_public_id!: string;

  static get tableName() {
    return "cars";
  }
}

export type Cars = ModelObject<CarsModel>;
