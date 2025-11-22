import TripModal from "../models/trip.model.js";
import mongoose from "mongoose";

export const createTrip = async (req, res) => {
  const { trip, choice, email, packageName, description } = req.body;

  try {
    if (!trip || !choice || !email || !packageName) {
      return res.status(400).json({
        message: "Please provide all required data (trip, choice, email, packageName)"
      });
    }

    const createTrip = await TripModal.create({
      packageName,
      description: description || "",
      trip,
      choice,
      email
    });

    return res.status(201).json({
      success: true,
      trip: createTrip
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

export const fetchAllTrip = async (req, res) => {
  const email = req.params.email;

  if (!email) {
    return res.status(400).json({
      message: "Please provide the value"
    });
  }

  try {
    const tripDetails = await TripModal.find({
      email
    });

    if (!tripDetails.length) {
      return res.status(400).json({
        success: false,
        message: "User do not create any trip😑"
      });
    }

    return res.status(200).json({
      success: true,
      tripDetails
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

export const singleTrip = async (req, res) => {
  let id = req.params.id;
  console.log("ID : ", id);

  try {
    const trip_details = await TripModal.findOne({
      _id: id
    });

    if (!trip_details) {
      return res.status(400).json({
        success: false,
        message: "Trip not found"
      });
    }

    return res.status(200).json({
      success: true,
      trip: trip_details
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Trip is not found 😗"
    });
  }
};

export const updateTrip = async (req, res) => {
  const { id } = req.params;
  const { packageName, description } = req.body;

  try {
    if (!packageName) {
      return res.status(400).json({
        success: false,
        message: "Package name is required"
      });
    }

    const updatedTrip = await TripModal.findByIdAndUpdate(
      id,
      { packageName, description },
      { new: true, runValidators: true }
    );

    if (!updatedTrip) {
      return res.status(404).json({
        success: false,
        message: "Trip not found"
      });
    }

    return res.status(200).json({
      success: true,
      trip: updatedTrip,
      message: "Trip package updated successfully"
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

export const deleteTrip = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTrip = await TripModal.findByIdAndDelete(id);

    if (!deletedTrip) {
      return res.status(404).json({
        success: false,
        message: "Trip not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Trip package deleted successfully"
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
};
