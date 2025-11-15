/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */

import axios from "axios";
import { useEffect, useState } from "react";
import { MdPlace } from "react-icons/md";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const PlanCard = ({ place, plan }) => {
  const [photoUrl, setPhotoUrl] = useState("");

  const getPlacePhoto = async () => {
    const BASE_URL = "https://api.pexels.com/v1/search";

    try {
      const response = await axios.get(BASE_URL, {
        params: {
          query: `${place?.placeName} nature landmark`,
          per_page: 5,
        },
        headers: {
          Authorization: import.meta.env.VITE_PEXELS_API_KEY,
        },
      });

      const images = response.data.photos.map((p) => p.src.medium);
      setPhotoUrl(images[1]);
    } catch (error) {
      toast.error(error.message || "Failed to fetch images");
    }
  };

  useEffect(() => {
    place && getPlacePhoto();
  }, [place]);

  return (
    <Link
      to={"https://www.google.com/maps/search/?api=1&query=" + place?.placeName}
      target="_blank"
      className="
        block w-full
        rounded-3xl overflow-hidden 
        backdrop-blur-xl bg-white/40 border border-white/20
        shadow-lg hover:shadow-xl 
        hover:scale-[1.02] transition-all duration-300
        animate-fade-in
      "
    >
      {/* Image Section */}
      <div className="w-full h-40 overflow-hidden rounded-t-3xl">
        <img
          src={photoUrl}
          alt="place"
          className="
            w-full h-full object-cover 
            hover:scale-105 
            transition-transform duration-500
          "
        />
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col gap-2">

        {/* Title */}
        <div className="text-xl font-semibold text-gray-900 capitalize">
          {place?.placeName}
        </div>

        {/* Details */}
        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
          {place?.placeDetails}
        </p>

        {/* Best Time */}
        <div className="flex justify-between items-center mt-2 text-blue-600 font-medium">
          <span>{plan?.best_time_to_visit}</span>
          <MdPlace className="text-xl text-red-500" />
        </div>

      </div>
    </Link>
  );
};

export default PlanCard;
