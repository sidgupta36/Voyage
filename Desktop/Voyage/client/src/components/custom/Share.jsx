/* eslint-disable react/prop-types */
import { ShareWrapper } from "@/css-sheets/css-styles";
import { FaRegShareFromSquare } from "react-icons/fa6";

import {
  WhatsappShareButton,
  WhatsappIcon,
  FacebookShareButton,
  FacebookIcon,
} from "react-share";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Share = ({ choice }) => {
  const shareUrl = window.location.href;

  return (
    <ShareWrapper
      className="
        w-full px-6 py-8 mb-6 
        bg-gradient-to-r from-blue-50 to-white dark:from-gray-900 dark:to-gray-800
        rounded-3xl shadow-lg 
        backdrop-blur-xl border border-white/30 dark:border-gray-700
        flex justify-between items-center 
        animate-fade-in transition-all duration-300
      "
    >
      {/* LEFT SECTION */}
      <div className="left space-y-3">
        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white">
          <span className="text-blue-600">
            {choice?.place}
          </span> Trip Summary
        </h1>

        <div className="info text-gray-700 dark:text-gray-300 text-sm md:text-base mt-2 space-y-1">
          <div className="flex items-center gap-1">
            <span role="img" aria-label="calendar">📅</span>
            {choice?.days} Days
          </div>
          <div className="flex items-center gap-1">
            <span role="img" aria-label="money">💰</span>
            {choice?.budget} Budget
          </div>
          <div className="flex items-center gap-1">
            <span role="img" aria-label="traveler">🧳</span>
            No. of Travelers: {choice?.people}
          </div>
        </div>
      </div>

      {/* RIGHT SHARE BUTTON SECTION */}
      <div className="right flex items-center gap-4">
        {/* Visa Check Button */}
        {choice?.place && !choice.place.includes("India") && (
          <a
            href="/visa-guide.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="
              px-5 py-2 rounded-full
              bg-gradient-to-r from-orange-500 to-red-600
              text-white font-semibold text-sm
              shadow-md hover:shadow-lg hover:scale-105
              transition-all duration-300
              flex items-center gap-2
            "
          >
            <span className="text-lg">🛂</span> Visa Guide
          </a>
        )}

        <DropdownMenu>
          <DropdownMenuTrigger className="focus:outline-none">
            <FaRegShareFromSquare
              className="
                text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400
                transition-colors cursor-pointer
              "
              fontSize="30px"
            />
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="
              p-4 rounded-3xl 
              shadow-xl border border-white/30 dark:border-gray-700
              backdrop-blur-xl bg-white/40 dark:bg-gray-900/90
              flex gap-4
            "
          >
            {/* Whatsapp */}
            <WhatsappShareButton url={shareUrl}>
              <WhatsappIcon
                size={50}
                borderRadius={50}
                className="hover:scale-105 transition-transform"
              />
            </WhatsappShareButton>

            {/* Facebook */}
            <FacebookShareButton url={shareUrl}>
              <FacebookIcon
                size={50}
                borderRadius={50}
                className="hover:scale-105 transition-transform"
              />
            </FacebookShareButton>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </ShareWrapper>
  );
};

export default Share;
