/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

/* eslint-disable react/prop-types */
const UserTrip = ({ trip }) => {
  const [photoUrl, setPhotoUrl] = useState("");
  const navigate = useNavigate();

  const GoToTripPage = (id) => {
    navigate(`/trip/${id}`);
  };

  const getPlacePhoto = async () => {
    const BASE_URL = "https://api.pexels.com/v1/search";

    try {
      const response = await axios.get(BASE_URL, {
        params: {
          query: `${trip?.choice?.place} nature travel landscape`,
          per_page: 5,
        },
        headers: {
          Authorization: import.meta.env.VITE_PEXELS_API_KEY,
        },
      });

      const images = response.data.photos.map((photo) => photo.src.landscape);
      setPhotoUrl(images[1]);
    } catch (error) {
      toast.error(error.message || "Failed to fetch images");
    }
  };

  useEffect(() => {
    trip && getPlacePhoto();
  }, [trip]);

  return (
    <div
      onClick={() => GoToTripPage(trip?._id)}
      className="
        cursor-pointer 
        rounded-3xl overflow-hidden  
        backdrop-blur-xl bg-white/40 border border-white/20
        shadow-lg hover:shadow-2xl 
        hover:scale-[1.02]
        transition-all duration-300 
        animate-fade-in 
        w-full
      "
    >
      {/* Image */}
      <div className="w-full h-44 overflow-hidden rounded-t-3xl">
        <img
          src={photoUrl}
          alt="location"
          className="
            w-full h-full object-cover 
            hover:scale-105 transition-transform duration-500
          "
        />
      </div>

      {/* Trip Title */}
      <div className="p-4 text-center">
        <h1 className="text-xl font-semibold text-gray-900 capitalize tracking-wide">
          {trip?.trip?.trip_details?.location}
        </h1>
      </div>
    </div>
  );
};

export default UserTrip;
