/* eslint-disable react-hooks/exhaustive-deps */

import HotelRecommendations from "@/components/custom/Hotel";
import Itinerary from "@/components/custom/Itinerary";
import Share from "@/components/custom/Share";
import { TripWrapper } from "@/css-sheets/css-styles";
import { GetTripById } from "@/store/slices/TripSlice";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const Trip = () => {
  const { id } = useParams();
  const [headingImage, setHeadingImage] = useState("");

  const dispatch = useDispatch();
  const trip = useSelector((state) => state.trip.trip);

  // Fetch Trip Data
  useEffect(() => {
    dispatch(GetTripById(id));
  }, [id]);

  // Fetch Header Image
  useEffect(() => {
    Object.keys(trip).length > 0 && getPlacePhoto();
  }, [trip]);

  const getPlacePhoto = async () => {
    const BASE_URL = "https://api.pexels.com/v1/search";

    try {
      const response = await axios.get(BASE_URL, {
        params: {
          query: `${trip?.trip?.trip_details?.location} nature travel landscape`,
          per_page: 5,
        },
        headers: {
          Authorization: import.meta.env.VITE_PEXELS_API_KEY,
        },
      });

      const images = response.data.photos.map((photo) => photo.src.original);
      setHeadingImage(images[1]);
    } catch (error) {
      toast.error(error.message || "Error fetching images");
    }
  };

  return (
    <TripWrapper
      className="
        w-full min-h-screen 
        bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800
        pb-20 animate-fade-in transition-colors duration-300
      "
    >
      {/* Header Image */}
      <div className="w-full h-[50vh] overflow-hidden rounded-b-3xl shadow-xl relative">
        <img
          src={headingImage}
          alt="location"
          className="w-full h-full object-cover brightness-95"
        />

        {/* Overlay Title */}
        <div
          className="
            absolute bottom-8 left-8 
            backdrop-blur-xl bg-white/40 dark:bg-gray-900/60 border border-white/20 dark:border-gray-700
            shadow-xl rounded-3xl 
            px-8 py-4
          "
        >
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-1">
            {trip?.packageName}
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 capitalize">
            📍 {trip?.trip?.trip_details?.location}
          </p>
        </div>
      </div>

      {/* Share Section */}
      <div className="mt-10 px-6">
        <Share choice={trip && trip.choice} />
      </div>

      {/* Hotel Section */}
      <div className="mt-10 px-6 max-w-7xl mx-auto">
        <HotelRecommendations trip={trip && trip.trip} />
      </div>

      {/* Itinerary Section */}
      <div className="mt-16 px-6 max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white text-center mb-10">
          <span className="text-blue-600">Places</span> to Visit 🚀
        </h1>

        {Object.keys(trip).length > 0 &&
          Object.keys(trip?.trip?.itinerary).map((day, index) => (
            <Itinerary
              key={index}
              day={day}
              plan={trip?.trip?.itinerary[day]}
            />
          ))}
      </div>
    </TripWrapper>
  );
};

export default Trip;
