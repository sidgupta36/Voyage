/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */

import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const HotelCard = ({ hotel }) => {
  const [photoUrl, setPhotoUrl] = useState("");

  const getPlacePhoto = async () => {
    const BASE_URL = "https://api.pexels.com/v1/search";

    try {
      const response = await axios.get(BASE_URL, {
        params: {
          query: `${hotel?.hotel_name} hotel building`,
          per_page: 5
        },
        headers: {
          Authorization: import.meta.env.VITE_PEXELS_API_KEY
        }
      });

      const images = response.data.photos.map((photo) => photo.src.medium);
      setPhotoUrl(images[1]);
    } catch (error) {
      toast.error(error.message || "Failed to fetch hotel images");
    }
  };

  useEffect(() => {
    hotel && getPlacePhoto();
  }, [hotel]);

  return (
    <Link
      to={
        "https://www.google.com/maps/search/?api=1&query=" +
        hotel?.hotel_name +
        "," +
        hotel?.hotel_address
      }
      target="_blank"
      className="block h-full"
    >
      <div
        className="
          w-full h-full flex flex-col rounded-3xl overflow-hidden 
          backdrop-blur-xl bg-white/40 dark:bg-gray-800/40 border border-white/20 dark:border-gray-700
          shadow-lg hover:shadow-xl transition-all cursor-pointer 
          animate-fade-in
        "
      >
        {/* Hotel Image */}
        <div className="w-full h-44 rounded-t-3xl overflow-hidden flex-shrink-0">
          <img
            src={photoUrl}
            alt="Hotel"
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Card Content */}
        <div className="p-5 space-y-2 flex-1 flex flex-col">
          <div className="text-lg font-semibold text-gray-900 dark:text-white capitalize">
            {hotel?.hotel_name}
          </div>

          <div className="text-gray-600 dark:text-gray-400 text-sm flex-1">
            📍 {hotel?.hotel_address}
          </div>

          <div className="text-blue-600 font-semibold text-md mt-auto">
            💰 {hotel?.price}
          </div>

          <div className="text-yellow-500 font-medium">
            ⭐ {hotel?.rating}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default HotelCard;
