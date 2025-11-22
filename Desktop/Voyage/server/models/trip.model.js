import mongoose from "mongoose";

const tripSchema = new mongoose.Schema(
  {
    packageName: {
      type: String,
      required: true
    },
    description: {
      type: String,
      default: ""
    },
    trip: {
      type: Object,
      required: true
    },
    choice: {
      type: Object,
      required: true
    },
    email: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const TripModal = mongoose.model("trip", tripSchema);
export default TripModal;
