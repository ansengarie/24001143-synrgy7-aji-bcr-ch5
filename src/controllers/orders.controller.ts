import { Response, Request } from "express";

import { OrdersModel } from "../databases/models/orders";
import { CarsModel } from "../databases/models/cars";
import { ResponseHelper } from "../helpers/response.helper";
import { log } from "console";

export class OrdersController extends ResponseHelper {
  store = async (req: Request, res: Response) => {
    try {
      const cars = await CarsModel.query().findById(req.body.cars_id);

      if (cars === undefined) {
        return this.error("Cars not found", null, 404)(res);
      }

      let returnDate = new Date(req.body.return_date);
      let rentDate = new Date(req.body.rent_date);

      let timeDifference = returnDate.getTime() - rentDate.getTime();

      let dayDifference = timeDifference / (1000 * 60 * 60 * 24);

      const orders = await OrdersModel.query().insert({
        user_id: req.body.user_id,
        cars_id: req.body.cars_id,
        rent_date: req.body.rent_date,
        return_date: req.body.return_date,
        total_price: dayDifference * cars?.rent_per_day,
        status: req.body.status,
      });

      return this.success("Data ditambahkan", orders, 200)(res);
    } catch (err: Error | any) {
      return this.error(err.message, null, 400)(res);
    }
  };

  updateStatus = async (req: Request, res: Response) => {
    try {
      const orders = await OrdersModel.query().findById(req.params.id);
      if (orders === undefined) {
        return this.error("Data not found", null, 404)(res);
      }

      const update = await OrdersModel.query().patchAndFetchById(
        req.params.id,
        {
          status: req.body.status,
        }
      );
      return this.success("Data updated", update, 200)(res);
    } catch (err: Error | any) {
      return this.error(err.message, null, 400)(res);
    }
  };

  getAll = async (req: Request, res: Response) => {
    try {
      const orders = await OrdersModel.query().withGraphFetched("[cars,users]");
      return this.success("Data ditemukan", orders, 200)(res);
    } catch (error: Error | any) {
      return this.error(error.message, null, 404)(res);
    }
  };

  getOne = async (req: Request, res: Response) => {
    try {
      const orders = await OrdersModel.query()
        .withGraphFetched("[cars,users]")
        .findById(req.params.id);
      return this.success("Data ditemukan", orders, 200)(res);
    } catch (error: Error | any) {
      return this.error(error.message, null, 404)(res);
    }
  };
}
