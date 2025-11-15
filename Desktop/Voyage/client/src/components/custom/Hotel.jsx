/* eslint-disable react/prop-types */
import { HotelWrapper } from "@/css-sheets/css-styles";
import HotelCard from "./HotelCard";

const HotelRecommendations = ({ trip }) => {
  return (
    <HotelWrapper className="w-full py-14 px-6 bg-gradient-to-b from-blue-50 to-white">
      
      {/* Heading */}
      <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 text-center mb-10">
        <span className="text-blue-600">Hotel</span> Recommendations
      </h1>

      {/* Hotel Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 
        animate-fade-in">
        {trip?.hotel_options?.map((hotel, index) => (
          <div
            key={index}
            className="backdrop-blur-xl bg-white/40 border border-white/20 
              rounded-3xl shadow-lg hover:shadow-xl transition-all p-4"
          >
            <HotelCard hotel={hotel} />
          </div>
        ))}
      </div>

    </HotelWrapper>
  );
};

export default HotelRecommendations;
