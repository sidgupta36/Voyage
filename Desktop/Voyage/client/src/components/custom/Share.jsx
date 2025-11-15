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
        bg-gradient-to-r from-blue-50 to-white
        rounded-3xl shadow-lg 
        backdrop-blur-xl border border-white/30
        flex justify-between items-center 
        animate-fade-in
      "
    >
      {/* LEFT SECTION */}
      <div className="left space-y-3">
        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">
          <span className="text-blue-600">{choice?.place}</span> Trip Summary
        </h1>

        <div className="info text-gray-700 text-sm md:text-base mt-2 space-y-1">
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
      <div className="right">
        <DropdownMenu>
          <DropdownMenuTrigger className="focus:outline-none">
            <FaRegShareFromSquare
              className="
                text-gray-700 hover:text-blue-600 
                transition-colors cursor-pointer
              "
              fontSize="38px"
            />
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="
              p-4 rounded-3xl 
              shadow-xl border border-white/30 
              backdrop-blur-xl bg-white/40 
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
