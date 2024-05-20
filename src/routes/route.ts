import { Router } from "express";

import upload from "../utils/upload.on.memory";
import { CarsController } from "../controllers/cars.controller";
import { UsersController } from "../controllers/users.controller";
import { OrdersController } from "../controllers/orders.controller";

export const route = Router();
``;

// cars
route.get("/cars", new CarsController().carList);
route.get("/cars/:id", new CarsController().getCarByID);
route.delete("/cars/:id", new CarsController().deleteCarByID);
route.post("/cars", upload.single("image"), new CarsController().create);
route.put("/cars/:id", upload.single("image"), new CarsController().update);

// users
route.post("/users", new UsersController().register);

// orders
route.post("/orders", new OrdersController().store);
route.get("/orders", new OrdersController().getAll);
route.get("/orders/:id", new OrdersController().getOne);
route.put("/orders/status/:id", new OrdersController().updateStatus);
export default route;
