import { Model, ModelObject } from "objection";
import { UsersModel } from "./users";
import { CarsModel } from "./cars";

export class OrdersModel extends Model {
  id!: number;
  user_id!: number;
  cars_id!: number;
  rent_date!: Date;
  return_date!: Date;
  total_price!: number;
  status!: string;
  created_at!: Date;
  updated_at!: Date;

  static get tableName() {
    return "orders";
  }

  static relationMappings = {
    cars: {
      relation: Model.BelongsToOneRelation,
      modelClass: CarsModel,
      join: {
        from: "orders.cars_id",
        to: "cars.id",
      },
    },

    users: {
      relation: Model.BelongsToOneRelation,
      modelClass: UsersModel,
      join: {
        from: "orders.user_id",
        to: "users.id",
      },
    },
  };
}

export type Orders = ModelObject<OrdersModel>;
