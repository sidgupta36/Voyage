/* eslint-disable react/prop-types */
import { VisitWrapper } from "@/css-sheets/css-styles";
import PlanCard from "./PlanCard";
import { useEffect, useState } from "react";

const Itinerary = ({ plan, day }) => {
  const [visitday, setVisitDay] = useState();

  useEffect(() => {
    setVisitDay(day.toUpperCase());
  }, [day]);

  return (
    <VisitWrapper
      className="
        w-full py-14 px-6 
        bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800
        animate-fade-in transition-colors duration-300
      "
    >
      {/* Day Title */}
      <h2
        className="
          text-3xl md:text-4xl font-extrabold text-center mb-10 
          text-gray-900 dark:text-white
        "
      >
        <span className="text-blue-600">Day</span> {visitday}
      </h2>

      {/* Itinerary Slider */}
      <div className="relative group">
        <div
          id={`itinerary-slider-${day}`}
          className="flex gap-6 overflow-x-auto pb-8 px-4 scrollbar-hide snap-x snap-mandatory scroll-smooth"
        >
          {plan?.plan?.map((place, index) => (
            <div
              key={index}
              className="min-w-full md:min-w-[calc(50%-12px)] lg:min-w-[calc(33.333%-16px)] flex-shrink-0 snap-center h-full"
            >
              <PlanCard place={place} plan={plan} />
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <button
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white dark:bg-gray-800 p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0 z-10"
          onClick={() => document.getElementById(`itinerary-slider-${day}`).scrollBy({ left: -300, behavior: 'smooth' })}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-gray-800 dark:text-white">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>
        <button
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white dark:bg-gray-800 p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0 z-10"
          onClick={() => document.getElementById(`itinerary-slider-${day}`).scrollBy({ left: 300, behavior: 'smooth' })}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-gray-800 dark:text-white">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>
    </VisitWrapper>
  );
};

export default Itinerary;
