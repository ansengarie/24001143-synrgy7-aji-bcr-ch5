import { Response, Request } from "express";

import { CarsModel } from "../databases/models/cars";
import { ResponseHelper } from "../helpers/response.helper";
import {
  uploadImageToCloudinary,
  deleteImageFromCloudinary,
} from "../utils/file.manipulate";

export class CarsController extends ResponseHelper {
  carList = async (req: Request, res: Response) => {
    try {
      const cars = await CarsModel.query();
      return this.success("Data ditemukan", cars, 200)(res);
    } catch (error: Error | any) {
      return this.error(error.message, null, 404)(res);
    }
  };

  getCarByID = async (req: Request, res: Response) => {
    try {
      const id: string = req.params.id;
      const cars = await CarsModel.query().findById(id);
      return this.success("Data ditemukan", cars, 200)(res);
    } catch (error: Error | any) {
      return this.error(error.message, null, 404)(res);
    }
  };

  deleteCarByID = async (req: Request, res: Response) => {
    try {
      const id: string = req.params.id;
      const data = await CarsModel.query().findById(id);
      if (data?.image) {
        deleteImageFromCloudinary(data.image_public_id);
      }
      const cars = await CarsModel.query().deleteById(id);
      if (!cars) return this.error("Data tidak ditemukan", null, 404)(res);
      return this.success(
        `Data dengan id ${id} berhasil dihapus`,
        cars,
        200
      )(res);
    } catch (error: Error | any) {
      return this.error(error.message, null, 404)(res);
    }
  };

  create = async (req: Request, res: Response) => {
    try {
      const optionsJson = JSON.stringify(req.body.options);
      const specsJson = JSON.stringify(req.body.specs);
      const gambar = await uploadImageToCloudinary(req.file, "cars");
      const cars = await CarsModel.query().insert({
        ...req.body,
        image: gambar.secure_url,
        image_public_id: gambar.public_id,
        options: optionsJson,
        specs: specsJson,
      });

      return this.success("Data berhasil ditambahkan", cars, 200)(res);
    } catch (error: Error | any) {
      return this.error(error.message, null, 404)(res);
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const id: string = req.params.id;
      const optionsJson = JSON.stringify(req.body.options);
      const specsJson = JSON.stringify(req.body.specs);
      const carByid = await CarsModel.query().findById(id);
      if (carByid?.image) {
        deleteImageFromCloudinary(carByid.image_public_id);
      }
      const gambar = await uploadImageToCloudinary(req.file, "cars");

      const cars = await CarsModel.query().patchAndFetchById(id, {
        ...req.body,
        image: gambar.secure_url,
        image_public_id: gambar.public_id,
        options: optionsJson,
        specs: specsJson,
      });
      if (!cars) return this.error("Data tidak ditemukan", null, 404)(res);
      return this.success(
        `Data dengan id ${id} berhasil diubah`,
        cars,
        200
      )(res);
    } catch (error: Error | any) {
      return this.error(error.message, null, 404)(res);
    }
  };
}
