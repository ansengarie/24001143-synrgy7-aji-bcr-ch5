import { Router } from "express";

import upload from "../utils/upload.on.memory";
import { CarsController } from "../controllers/cars.controller";

export const route = Router();

route.get("/cars", new CarsController().carList);
route.get("/cars/:id", new CarsController().getCarByID);
route.delete("/cars/:id", new CarsController().deleteCarByID);
route.post("/cars", upload.single("image"), new CarsController().create);
route.put("/cars/:id", upload.single("image"), new CarsController().update);

export default route;
