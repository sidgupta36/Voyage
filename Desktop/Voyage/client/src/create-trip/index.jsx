import { AIPrompt, budgetOptions, travelOptions } from "@/assets/assets";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import MapTilerAutocomplete from "@/components/custom/MapTilerAutocomplete";
import { toast } from "react-toastify";
import { useGoogleLogin } from "@react-oauth/google";
import { RxCross2 } from "react-icons/rx";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

import {
  Dialog,
  DialogContent,
  DialogPortal,
  DialogOverlay,
} from "@/components/ui/dialog";

import { FcGoogle } from "react-icons/fc";
import { TripCreateThunk } from "@/store/slices/TripSlice";
import { UserRegister } from "@/store/slices/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import AIchatSession from "@/aiHandler/Aimodal";
import { useNavigate } from "react-router-dom";

function CreateTrip() {
  const [formData, setFormData] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const trip = useSelector((s) => s.trip.trip);

  // Redirect AFTER trip is created
  useEffect(() => {
    if (trip && Object.keys(trip).length > 0) {
      navigate(`/trip/${trip?._id}`);
    }
  }, [trip]);

  const InputHandeler = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const GenerateTrip = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      setOpenDialog(true);
      return;
    }

    if (
      !formData?.place ||
      !formData?.people ||
      !formData?.days ||
      !formData?.budget ||
      !formData?.packageName
    ) {
      return toast.error("Please fill all details including package name");
    }

    let aiPrompt = AIPrompt.replace("{location}", formData?.place?.label)
      .replace("{days}", formData?.days)
      .replace("{people}", formData?.people)
      .replace("{budget}", formData?.budget);

    try {
      setLoading(true);
      const ai_response = await AIchatSession.sendMessage(aiPrompt);
      const tripResult = ai_response?.response?.text();

      const data = {
        packageName: formData.packageName,
        description: formData.description || "",
        trip: JSON.parse(tripResult),
        email: user.email,
        userId: user.id,
        choice: { ...formData, place: formData.place.label },
      };

      dispatch(TripCreateThunk(data));
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };

  // Google Login + then generate trip
  const login = useGoogleLogin({
    onSuccess: (response) => {
      dispatch(UserRegister(response)).then(() => {
        setOpenDialog(false);

        setTimeout(() => {
          GenerateTrip();
        }, 150);
      });
    },
    onError: () => toast.error("Google login failed"),
  });

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
        className="max-w-5xl mx-auto relative z-10"
      >
        {/* Header Section */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-6">
            Tell us your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">travel preferences</span> 🚁
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Provide some quick details, and our AI planner will build the perfect itinerary tailored just for you.
          </p>
        </motion.div>

        {/* Package Name & Description */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Package Name */}
          <motion.div
            variants={itemVariants}
            className="backdrop-blur-xl bg-white/60 dark:bg-gray-800/60 border border-white/40 dark:border-gray-700 p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300"
          >
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">Package Name</h2>
            <Input
              type="text"
              placeholder="e.g., Summer Vacation 2025"
              value={formData?.packageName || ""}
              onChange={(e) => InputHandeler("packageName", e.target.value)}
              className="rounded-xl border-gray-200 dark:border-gray-600 bg-white/50 dark:bg-gray-700/50 focus:bg-white dark:focus:bg-gray-700 focus:ring-2 focus:ring-purple-500 dark:text-white transition-all h-12 text-lg placeholder:text-gray-400"
            />
            {!formData?.packageName && (
              <p className="text-red-500 mt-3 text-sm font-medium flex items-center gap-1">
                <RxCross2 /> Please provide a package name
              </p>
            )}
          </motion.div>

          {/* Description (Optional) */}
          <motion.div
            variants={itemVariants}
            className="backdrop-blur-xl bg-white/60 dark:bg-gray-800/60 border border-white/40 dark:border-gray-700 p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300"
          >
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">Description (Optional)</h2>
            <Input
              type="text"
              placeholder="Brief description of your trip"
              value={formData?.description || ""}
              onChange={(e) => InputHandeler("description", e.target.value)}
              className="rounded-xl border-gray-200 dark:border-gray-600 bg-white/50 dark:bg-gray-700/50 focus:bg-white dark:focus:bg-gray-700 focus:ring-2 focus:ring-purple-500 dark:text-white transition-all h-12 text-lg placeholder:text-gray-400"
            />
          </motion.div>
        </div>

        {/* Destination + Days */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Destination */}
          <motion.div
            variants={itemVariants}
            className="backdrop-blur-xl bg-white/60 dark:bg-gray-800/60 border border-white/40 dark:border-gray-700 p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300"
          >
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">Destination</h2>
            <MapTilerAutocomplete
              selectProps={{
                placeholder: "Where to? 🚀",
                onChange: (v) => InputHandeler("place", v),
              }}
            />
            {!formData?.place && (
              <p className="text-red-500 mt-3 text-sm font-medium flex items-center gap-1">
                <RxCross2 /> Please select a destination
              </p>
            )}
          </motion.div>

          {/* Days */}
          <motion.div
            variants={itemVariants}
            className="backdrop-blur-xl bg-white/60 dark:bg-gray-800/60 border border-white/40 dark:border-gray-700 p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300"
          >
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">Number of Days</h2>
            <Input
              type="number"
              placeholder="Ex. 3"
              value={formData?.days}
              onChange={(e) => InputHandeler("days", e.target.value)}
              className="rounded-xl border-gray-200 dark:border-gray-600 bg-white/50 dark:bg-gray-700/50 focus:bg-white dark:focus:bg-gray-700 focus:ring-2 focus:ring-purple-500 dark:text-white transition-all h-12 text-lg placeholder:text-gray-400"
            />
            {(formData?.days <= 0 || formData?.days > 7) && (
              <p className="text-red-500 mt-3 text-sm font-medium flex items-center gap-1">
                <RxCross2 /> We support trips of 1–7 days
              </p>
            )}
          </motion.div>
        </div>

        {/* Budget Section */}
        <motion.div variants={itemVariants} className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Choose Your Budget</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {budgetOptions.map((budget) => (
              <motion.div
                key={budget.id}
                whileHover={{ scale: 1.03, y: -5 }}
                whileTap={{ scale: 0.98 }}
                className={`
                  cursor-pointer p-8 rounded-3xl
                  backdrop-blur-xl border shadow-lg transition-all duration-300
                  flex flex-col items-center text-center
                  ${formData?.budget === budget.title
                    ? "bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 border-blue-300 dark:border-blue-500 shadow-blue-200/50 dark:shadow-blue-900/20 ring-2 ring-blue-400 dark:ring-blue-500"
                    : "bg-white/60 dark:bg-gray-800/60 border-white/40 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-500 hover:shadow-xl"}
                `}
                onClick={() => InputHandeler("budget", budget.title)}
              >
                <div className="text-5xl mb-4 p-4 bg-white dark:bg-gray-700 rounded-full shadow-sm">{budget.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">{budget.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 leading-relaxed">{budget.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Travel Type Section */}
        <motion.div variants={itemVariants} className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Who are you traveling with?</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {travelOptions.map((travel) => (
              <motion.div
                key={travel.id}
                whileHover={{ scale: 1.03, y: -5 }}
                whileTap={{ scale: 0.98 }}
                className={`
                  cursor-pointer p-8 rounded-3xl
                  backdrop-blur-xl border shadow-lg transition-all duration-300
                  flex flex-col items-center text-center
                  ${formData?.people === travel.people
                    ? "bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 border-purple-300 dark:border-purple-500 shadow-purple-200/50 dark:shadow-purple-900/20 ring-2 ring-purple-400 dark:ring-purple-500"
                    : "bg-white/60 dark:bg-gray-800/60 border-white/40 dark:border-gray-700 hover:border-purple-200 dark:hover:border-purple-500 hover:shadow-xl"}
                `}
                onClick={() => InputHandeler("people", travel.people)}
              >
                <div className="text-5xl mb-4 p-4 bg-white dark:bg-gray-700 rounded-full shadow-sm">{travel.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">{travel.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 leading-relaxed">{travel.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Generate Trip Button */}
        <motion.div variants={itemVariants} className="flex justify-center mt-12 mb-20">
          {loading ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="px-8 py-4 bg-gray-900 dark:bg-white rounded-2xl text-white dark:text-gray-900 flex items-center gap-4 shadow-2xl"
            >
              <div className="w-6 h-6 border-4 border-blue-400 dark:border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <span className="font-semibold text-lg">Crafting your journey...</span>
            </motion.div>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 bg-gradient-to-r from-gray-900 to-gray-800 dark:from-white dark:to-gray-200 text-white dark:text-gray-900 text-xl font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all flex items-center gap-3"
              onClick={GenerateTrip}
            >
              Generate Trip 🚀
            </motion.button>
          )}
        </motion.div>
      </motion.div>

      {/* LOGIN DIALOG */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogPortal>
          <DialogOverlay className="fixed inset-0 bg-black/30 backdrop-blur-md z-40 animate-in fade-in duration-300" />
          <DialogContent
            className="
              fixed z-50 top-1/2 left-1/2
              -translate-x-1/2 -translate-y-1/2
              rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700
              backdrop-blur-2xl bg-white/80 dark:bg-gray-900/90 p-0 w-full max-w-md overflow-hidden
              animate-in zoom-in-95 duration-300
            "
          >
            <div className="relative p-10">
              <button
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center justify-center transition-colors"
                onClick={() => setOpenDialog(false)}
              >
                <RxCross2 className="text-gray-500 dark:text-gray-400" size={18} />
              </button>

              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-white dark:bg-gray-800 rounded-full shadow-lg mx-auto flex items-center justify-center mb-6">
                  <FcGoogle className="text-5xl" />
                </div>
                <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">
                  Welcome Back
                </h2>
                <p className="text-gray-500 dark:text-gray-400">
                  Sign in to save your trips and access them anywhere.
                </p>
              </div>

              <Button
                onClick={() => login()}
                className="w-full py-6 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-lg font-semibold shadow-lg hover:shadow-blue-500/30 transition-all flex items-center justify-center gap-3"
              >
                <FcGoogle className="text-2xl bg-white rounded-full p-0.5" />
                Sign in with Google
              </Button>

              <p className="text-center text-gray-400 text-sm mt-6">
                By signing in, you agree to our Terms & Privacy Policy.
              </p>
            </div>
          </DialogContent>
        </DialogPortal>
      </Dialog>
    </div>
  );
}

export default CreateTrip;
