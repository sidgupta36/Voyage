import { HotelWrapper } from "@/css-sheets/css-styles";
import HotelCard from "./HotelCard";
import { useState } from "react";
import { Button } from "../ui/button";
import { FaGoogle } from "react-icons/fa";

const HotelRecommendations = ({ trip }) => {

  return (
    <HotelWrapper className="w-full py-14 px-6 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      {/* Heading */}
      <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white text-center mb-10">
        <span className="text-blue-600">Hotel</span> Recommendations
      </h1>

      {/* Hotel Slider */}
      <div className="relative group">
        <div
          id="hotel-slider"
          className="flex gap-6 overflow-x-auto pb-8 px-4 scrollbar-hide snap-x snap-mandatory scroll-smooth"
        >
          {trip?.hotel_options?.map((hotel, index) => (
            <div
              key={index}
              className="min-w-full md:min-w-[calc(50%-12px)] lg:min-w-[calc(33.333%-16px)] flex-shrink-0 snap-center h-full"
            >
              <HotelCard hotel={hotel} />
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <button
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white dark:bg-gray-800 p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0 z-10"
          onClick={() => document.getElementById('hotel-slider').scrollBy({ left: -300, behavior: 'smooth' })}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-gray-800 dark:text-white">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>
        <button
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white dark:bg-gray-800 p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0 z-10"
          onClick={() => document.getElementById('hotel-slider').scrollBy({ left: 300, behavior: 'smooth' })}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-gray-800 dark:text-white">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col items-center gap-4 mt-12">
        {/* See More button removed as all hotels are now scrollable */}

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
