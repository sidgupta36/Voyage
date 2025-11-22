import express from "express";
import { createTrip, fetchAllTrip, singleTrip, updateTrip, deleteTrip } from "../controllers/trip.controllers.js";

const TripRoute = express.Router();


TripRoute.post("/create", createTrip);
TripRoute.get("/fetch-trip/:email", fetchAllTrip);
TripRoute.get("/fetch-one-trip/:id", singleTrip);
TripRoute.put("/update/:id", updateTrip);
TripRoute.delete("/delete/:id", deleteTrip);





export default TripRoute