import dotenv from "dotenv";
dotenv.config({ override: true });
import express from "express";
import morgan from "morgan";
import DataBase from "./config/db.js";
import TripRoute from "./routes/trip.route.js";
import cors from "cors"



const app = express();
app.use(morgan("dev"));
app.use(cors())
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true
  })
);

import ChatRoute from "./routes/chatRoutes.js";

app.use("/trip", TripRoute);
app.use("/api/chat", ChatRoute);
app.listen(8000, () => {
  console.log("Listining 8000");
  DataBase();
});
