/* eslint-disable react-hooks/exhaustive-deps */
import UserTrip from "@/components/custom/UserTrip";
import { FetchTripThunk } from "@/store/slices/TripSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Userpage = () => {
  const user = useSelector((state) => state.user.user);
  const trip = useSelector((state) => state.trip.allTrip);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      dispatch(FetchTripThunk(user.email));
    }
  }, [user]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-20 px-6 overflow-hidden relative transition-colors duration-300">
      {/* Background Blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-200 dark:bg-blue-900/30 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-200 dark:bg-purple-900/30 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-96 h-96 bg-pink-200 dark:bg-pink-900/30 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-6xl mx-auto relative z-10"
      >
        {/* Profile Section */}
        <motion.div
          variants={itemVariants}
          className="
            w-full flex flex-col items-center text-center mb-16
            backdrop-blur-xl bg-white/60 dark:bg-gray-800/60 border border-white/40 dark:border-gray-700
            shadow-xl rounded-3xl p-10
          "
        >
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur opacity-75"></div>
            <img
              src={user ? user.picture : 'https://placehold.co/400'}
              className="
                relative w-32 h-32 rounded-full object-cover 
                border-4 border-white dark:border-gray-800 shadow-lg
              "
              alt="Profile"
            />
          </div>

          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mt-6 mb-2">
            {user ? user.name : "Traveler"}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 font-medium">
            {user ? user.email : ""}
          </p>
          <p className="text-gray-500 dark:text-gray-400 mt-2 max-w-md mx-auto">
            Exploring the world, one package at a time. 🌍
          </p>
        </motion.div>

        {/* Trips Title */}
        <motion.div variants={itemVariants} className="mb-10 text-center">
          <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white inline-flex items-center gap-3">
            My Trip Packages <span className="text-blue-600">✈️</span>
          </h2>
          {trip && trip.length > 0 && (
            <p className="text-gray-600 dark:text-gray-400 mt-2 text-lg">
              You have created <span className="font-bold text-blue-600">{trip.length}</span> {trip.length === 1 ? 'package' : 'packages'} so far.
            </p>
          )}
        </motion.div>

        {/* Trips Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {trip && trip.length > 0 ? (
            trip.map((t, index) => (
              <motion.div key={index} variants={itemVariants}>
                <UserTrip trip={t} />
              </motion.div>
            ))
          ) : (
            <motion.div
              variants={itemVariants}
              className="
                col-span-full flex flex-col items-center justify-center text-center 
                backdrop-blur-xl bg-white/60 dark:bg-gray-800/60 border border-white/40 dark:border-gray-700
                p-16 rounded-3xl shadow-lg
              "
            >
              <div className="text-6xl mb-6">🗺️</div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                No trips yet
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md">
                It looks like you haven't created any trip packages yet. Start your journey by creating your first trip!
              </p>
              <button
                onClick={() => navigate('/create-trip')}
                className="
                  px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 
                  text-white font-bold rounded-xl shadow-lg 
                  hover:shadow-xl hover:scale-105 transition-all duration-300
                "
              >
                Create New Trip 🚀
              </button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Userpage;
