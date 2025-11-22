import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export const TripCreateThunk = createAsyncThunk("create/trip", async (data) => {
  try {
    const response = await axios.post(
      "http://localhost:8000/trip/create",
      data
    );
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message || "error find 😶");
    return null;
  }
});

export const FetchTripThunk = createAsyncThunk("fetch/trip", async (email) => {
  try {
    const response = await axios.get(
      `http://localhost:8000/trip/fetch-trip/${email}`
    );
    return response.data;
  } catch (error) {

    toast.error(error.response.data.message || "error find 😶");
    return null;
  }
});

export const GetTripById = createAsyncThunk("fetch-single/trip", async (id) => {
  try {
    const response = await axios.get(
      `http://localhost:8000/trip/fetch-one-trip/${id}`
    );

    return response.data;
  } catch (error) {
    toast.error(error.response.data.message || "error find 😶");
    return null;
  }
});

export const UpdateTripThunk = createAsyncThunk("update/trip", async ({ id, packageName, description }) => {
  try {
    const response = await axios.put(
      `http://localhost:8000/trip/update/${id}`,
      { packageName, description }
    );
    toast.success("Trip package updated successfully!");
    return response.data;
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to update trip");
    return null;
  }
});

export const DeleteTripThunk = createAsyncThunk("delete/trip", async (id) => {
  try {
    const response = await axios.delete(
      `http://localhost:8000/trip/delete/${id}`
    );
    toast.success("Trip package deleted successfully!");
    return { id, ...response.data };
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to delete trip");
    return null;
  }
});

const initialState = {
  trip: {},
  allTrip: {}
};

const TripSlice = createSlice({
  name: "trip",
  initialState,
  reducers: {
    setEmptyTrip(state) {
      state.trip = {};
      state.allTrip = {};
    },
    resetCurrentTrip(state) {
      state.trip = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(TripCreateThunk.fulfilled, (state, action) => {
        if (action.payload) {
          state.trip = action.payload.trip;
        }
      })
      .addCase(FetchTripThunk.fulfilled, (state, action) => {
        if (action.payload) {
          state.allTrip = action.payload.tripDetails;
        }
      })
      .addCase(GetTripById.fulfilled, (state, action) => {
        if (action.payload) {
          state.trip = action.payload.trip;
        }
      })
      .addCase(UpdateTripThunk.fulfilled, (state, action) => {
        if (action.payload) {
          state.trip = action.payload.trip;
          // Update in allTrip array if exists
          if (Array.isArray(state.allTrip)) {
            const index = state.allTrip.findIndex(t => t._id === action.payload.trip._id);
            if (index !== -1) {
              state.allTrip[index] = action.payload.trip;
            }
          }
        }
      })
      .addCase(DeleteTripThunk.fulfilled, (state, action) => {
        if (action.payload && Array.isArray(state.allTrip)) {
          state.allTrip = state.allTrip.filter(t => t._id !== action.payload.id);
        }
      });
  }
});

export const { setEmptyTrip, goToTrip, resetCurrentTrip } = TripSlice.actions;
export default TripSlice.reducer;
