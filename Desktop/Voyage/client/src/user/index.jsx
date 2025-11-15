/* eslint-disable react-hooks/exhaustive-deps */
import UserTrip from "@/components/custom/UserTrip";
import { UserWrapper } from "@/css-sheets/css-styles";
import { FetchTripThunk } from "@/store/slices/TripSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Userpage = () => {
  const user = useSelector((state) => state.user.user);
  const trip = useSelector((state) => state.trip.allTrip);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(FetchTripThunk(user.email));
    }
  }, [user]);

  return (
    <UserWrapper
      className="
        w-full min-h-screen 
        bg-gradient-to-b from-blue-50 to-white 
        py-16 px-6 animate-fade-in
      "
    >
      <div className="max-w-6xl mx-auto">

        {/* Profile Section */}
        <div
          className="
            w-full flex flex-col items-center text-center mb-12
            backdrop-blur-xl bg-white/40 border border-white/20 
            shadow-xl rounded-3xl p-10
          "
        >
          <img
            src={user ? user.picture : 'https://placehold.co/400'}
            className="
              w-32 h-32 rounded-full object-cover 
              shadow-lg border-4 border-white
            "
          />

          <h1 className="text-3xl font-extrabold text-gray-900 mt-4">
            {user ? `@${user.name}` : ""}
          </h1>
          <p className="text-gray-600 mt-1">Your personalized trip collection</p>
        </div>

        {/* Trips Title */}
        <h2 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">
          My Trips <span className="text-blue-600">✈️</span>
        </h2>

        {/* Trips Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {trip && trip.length > 0 ? (
            trip.map((t, index) => (
              <UserTrip trip={t} key={index} />
            ))
          ) : (
            <div
              className="
                col-span-full text-center 
                text-gray-600 text-lg 
                backdrop-blur-xl bg-white/40 border border-white/20
                p-10 rounded-3xl shadow-md
              "
            >
              No trips yet. Create one to get started! 🌍
            </div>
          )}
        </div>
      </div>
    </UserWrapper>
  );
};

export default Userpage;
