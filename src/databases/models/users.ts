import { Model, ModelObject } from "objection";

export class UsersModel extends Model {
  id!: number;
  name!: string;
  email!: string;
  phone_number!: string;
  password!: string;
  created_at!: Date;
  updated_at!: Date;

  static get tableName() {
    return "users";
  }
}

export type Users = ModelObject<UsersModel>;
