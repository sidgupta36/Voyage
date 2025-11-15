import { AIPrompt, budgetOptions, travelOptions } from "@/assets/assets";
import { Input } from "@/components/ui/input";
import { CreateTripWrapper } from "@/css-sheets/css-styles";
import { useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { toast } from "react-toastify";
import { useGoogleLogin } from "@react-oauth/google";
import { RxCross2 } from "react-icons/rx";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { TripCreateThunk } from "@/store/slices/TripSlice";
import { UserRegister } from "@/store/slices/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import AIchatSession from "@/aiHandler/Aimodal";
import { DialogDescription } from "@radix-ui/react-dialog";
import { useNavigate } from "react-router-dom";

function CreateTrip() {
  const [formData, setFormData] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const trip = useSelector((s) => s.trip.trip);

  if (Object.keys(trip).length > 0) {
    navigate(`/trip/${trip?._id}`);
  }

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

    if (!formData?.place || !formData?.people || !formData?.days || !formData?.budget) {
      return toast.error("Please fill the details");
    }

    let aiPrompt = AIPrompt.replace("{location}", formData?.place?.label)
      .replace("{days}", formData?.days)
      .replace("{people}", formData?.people)
      .replace("{budget}", formData?.budget);

    try {
      setLoading(true);
      const ai_response = await AIchatSession.sendMessage(aiPrompt);
      const trip = ai_response?.response?.text();

      const data = {
        trip: JSON.parse(trip),
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

  const login = useGoogleLogin({
    onSuccess: (response) => {
      dispatch(UserRegister(response)).then(() => {
        setOpenDialog(false);
        GenerateTrip();
      });
    },
    onError: (error) => console.log(error),
  });

  return (
    <CreateTripWrapper
      className="
        w-full min-h-screen py-20 px-6 
        bg-gradient-to-b from-blue-50 to-white
        animate-fade-in
      "
    >
      {/* Header Section */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900">
          Tell us your <span className="text-blue-600">travel preferences</span> 🚁
        </h1>
        <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
          Provide a few quick details, and our AI travel planner will generate a personalized itinerary just for you.
        </p>
      </div>

      {/* Destination + Days */}
      <div className="grid md:grid-cols-2 gap-10 mb-12">
        {/* Destination */}
        <div className="backdrop-blur-xl bg-white/40 border border-white/20 p-6 rounded-3xl shadow-xl">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Destination</h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              placeholder: "Type your destination 🚀",
              onChange: (v) => InputHandeler("place", v),
            }}
          />
          {!formData?.place && (
            <p className="text-red-600 mt-2 text-sm">Please select a destination 🏖️</p>
          )}
        </div>

        {/* Days */}
        <div className="backdrop-blur-xl bg-white/40 border border-white/20 p-6 rounded-3xl shadow-xl">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Number of Days</h2>
          <Input
            type="number"
            placeholder="Ex. 3"
            value={formData?.days}
            onChange={(e) => InputHandeler("days", e.target.value)}
            className="rounded-xl"
          />
          {(formData?.days <= 0 || formData?.days > 7) && (
            <p className="text-red-600 mt-2 text-sm">We support trips from 1–7 days 🙃</p>
          )}
        </div>
      </div>

      {/* Budget */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Choose Your Budget</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {budgetOptions.map((budget) => (
            <div
              key={budget.id}
              className={`
                cursor-pointer p-6 rounded-3xl
                backdrop-blur-xl bg-white/40 border border-white/20 shadow-lg 
                hover:shadow-xl hover:scale-[1.02] transition-all
                ${formData?.budget === budget.title ? "bg-blue-100 shadow-xl" : ""}
              `}
              onClick={() => InputHandeler("budget", budget.title)}
            >
              <div className="text-4xl">{budget.icon}</div>
              <h3 className="text-xl font-semibold mt-3">{budget.title}</h3>
              <p className="text-gray-600 mt-1">{budget.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* People */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Who are you traveling with?</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {travelOptions.map((travel) => (
            <div
              key={travel.id}
              className={`
                cursor-pointer p-6 rounded-3xl
                backdrop-blur-xl bg-white/40 border border-white/20 shadow-lg 
                hover:shadow-xl hover:scale-[1.02] transition-all
                ${formData?.people === travel.people ? "bg-blue-100 shadow-xl" : ""}
              `}
              onClick={() => InputHandeler("people", travel.people)}
            >
              <div className="text-4xl">{travel.icon}</div>
              <h3 className="text-xl font-semibold mt-3">{travel.title}</h3>
              <p className="text-gray-600 mt-1">{travel.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Generate Trip Button */}
      <div className="flex justify-end mt-10">
        {loading ? (
          <div className="p-4 bg-gray-900 rounded-xl text-white flex items-center gap-3">
            <div className="loading loading-spinner bg-blue-400"></div>
            Generating...
          </div>
        ) : (
          <Button className="px-6 py-4 text-lg rounded-xl" onClick={GenerateTrip}>
            Generate Trip 🚀
          </Button>
        )}
      </div>

      {/* Login Dialog */}
      <Dialog open={openDialog}>
        <DialogTitle />
        <DialogDescription />
        <DialogContent
          className="
            rounded-3xl shadow-2xl border border-white/20 
            backdrop-blur-xl bg-white/50 p-10 w-full max-w-md
          "
        >
          <button
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white shadow flex items-center justify-center hover:bg-gray-200 transition"
            onClick={() => setOpenDialog(false)}
          >
            <RxCross2 className="text-gray-700" size={22} />
          </button>

          <div className="text-center mb-6">
            <FcGoogle className="text-6xl mx-auto" />
            <h2 className="text-3xl font-extrabold mt-4 text-gray-900">Welcome Back</h2>
            <p className="text-gray-600 text-sm mt-1">
              Don’t have an account?{" "}
              <a href="#" className="text-blue-600 hover:underline">Sign up.</a>
            </p>
          </div>

          <div className="flex justify-center">
            <Button
              onClick={() => login()}
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-lg shadow-md hover:shadow-lg transition"
            >
              <div className="flex items-center justify-center gap-2">
                <FcGoogle className="text-2xl" />
                Sign in with Google
              </div>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </CreateTripWrapper>
  );
}

export default CreateTrip;
