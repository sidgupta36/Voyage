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

      {/* Itinerary Grid */}
      <div
        className="
          grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 
          px-4
        "
      >
        {plan?.plan?.map((place, index) => (
          <div
            key={index}
            className="
              backdrop-blur-xl bg-white/40 dark:bg-gray-800/40 border border-white/20 dark:border-gray-700
              rounded-3xl shadow-lg hover:shadow-xl p-4 transition-all
            "
          >
            <PlanCard place={place} plan={plan} />
          </div>
        ))}
      </div>
    </VisitWrapper>
  );
};

export default Itinerary;
