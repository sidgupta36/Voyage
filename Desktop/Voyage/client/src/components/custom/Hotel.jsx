import { HotelWrapper } from "@/css-sheets/css-styles";
import HotelCard from "./HotelCard";
import { useState } from "react";
import { Button } from "../ui/button";
import { FaGoogle } from "react-icons/fa";

const HotelRecommendations = ({ trip }) => {
  const [visibleHotels, setVisibleHotels] = useState(6);

  const handleSeeMore = () => {
    setVisibleHotels((prev) => prev + 3);
  };

  return (
    <HotelWrapper className="w-full py-14 px-6 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      {/* Heading */}
      <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white text-center mb-10">
        <span className="text-blue-600">Hotel</span> Recommendations
      </h1>

      {/* Hotel Grid */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 
        animate-fade-in"
      >
        {trip?.hotel_options?.slice(0, visibleHotels).map((hotel, index) => (
          <div
            key={index}
            className="backdrop-blur-xl bg-white/40 dark:bg-gray-800/40 border border-white/20 dark:border-gray-700
              rounded-3xl shadow-lg hover:shadow-xl transition-all p-4"
          >
            <HotelCard hotel={hotel} />
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col items-center gap-4 mt-12">
        {visibleHotels < trip?.hotel_options?.length && (
          <Button
            onClick={handleSeeMore}
            className="px-8 py-6 text-lg rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-blue-500/30 transition-all"
          >
            See More Hotels
          </Button>
        )}

        <a
          href={`https://www.google.com/travel/hotels?q=hotels+in+${trip?.trip_details?.location}`}
          target="_blank"
          rel="noreferrer"
        >
          <Button variant="outline" className="px-8 py-6 text-lg rounded-full gap-3">
            <FaGoogle className="text-blue-600" />
            See More on Google
          </Button>
        </a>
      </div>
    </HotelWrapper>
  );
};

export default HotelRecommendations;
