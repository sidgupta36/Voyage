import { HeaderWrapper } from "@/css-sheets/css-styles";
import { Button } from "../ui/button";

import { RxCross2 } from "react-icons/rx";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { DialogDescription } from "@radix-ui/react-dialog";
import { useSelector, useDispatch } from "react-redux";

import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { setEmptyTrip } from "@/store/slices/TripSlice";
import { useEffect, useState } from "react";
import { setUser, UserRegister } from "@/store/slices/UserSlice";
import { useGoogleLogin } from "@react-oauth/google";

function Header() {
  const [openDialog, setOpenDialog] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handelNavigate = () => navigate("/user");
  const gotoCreateTrip = () => navigate("/create-trip");

  const LogoutHandler = () => {
    localStorage.clear();
    dispatch(setEmptyTrip());
    dispatch(setUser());
    navigate("/");
    toast.success("Logout success");
  };

  const login = useGoogleLogin({
    onSuccess: (response) => {
      dispatch(UserRegister(response)).then(() => setOpenDialog(false));
    },
    onError: () => toast.error("Login failed 🥺"),
  });

  useEffect(() => {}, [user]);

  return (
    <header className="w-full bg-gradient-to-b from-blue-50 to-white shadow-sm border-b border-gray-200 py-3 px-6 flex items-center justify-between backdrop-blur-xl sticky top-0 z-50">
      
      {/* Logo */}
      <Link to={"/"} className="flex items-center">
        <img src="/logo.svg" alt="logo" className="w-32 hover:opacity-90 transition" />
      </Link>

      {/* Right Side */}
      {user && Object.keys(user).length > 0 ? (
        <div className="flex items-center gap-4">

          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-5 py-2 rounded-xl shadow-md transition-all"
            onClick={gotoCreateTrip}
          >
            Create Trip
          </Button>

          <Button
            className="bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-xl transition-all"
            onClick={LogoutHandler}
          >
            Logout
          </Button>

          <div
            onClick={handelNavigate}
            className="w-[45px] h-[45px] rounded-full overflow-hidden shadow-md border-2 border-blue-500 cursor-pointer hover:scale-105 transition-transform"
          >
            <img
              src={user?.picture || "https://placehold.co/400"}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      ) : (
        <Button
          className="bg-blue-600 text-white px-6 py-2 rounded-xl shadow-md hover:bg-blue-700 transition-all"
          onClick={() => setOpenDialog(true)}
        >
          Login
        </Button>
      )}

      {/* Login Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogTitle />
        <DialogDescription />

        <DialogContent className="w-full max-w-md py-10 px-8 rounded-3xl
          backdrop-blur-xl bg-white/40 shadow-2xl border border-white/20
          animate-fade-in relative">

          {/* Close Button */}
          <button
            className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center rounded-full bg-white/60 shadow hover:bg-white transition"
            onClick={() => setOpenDialog(false)}
          >
            <RxCross2 size={20} />
          </button>

          {/* Google Icon & Title */}
          <div className="flex flex-col items-center text-center mb-6">
            <FcGoogle className="text-6xl mb-3" />
            <h2 className="text-3xl font-extrabold text-gray-900">Welcome Back</h2>
            <p className="text-gray-600 text-sm mt-1">
              Don’t have an account?{" "}
              <a href="#" className="text-blue-600 hover:underline font-medium">
                Sign up
              </a>
            </p>
          </div>

          {/* Login Button */}
          <div className="w-full flex justify-center">
            <Button
              onClick={() => login()}
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-lg shadow-md hover:shadow-lg transition-all"
            >
              <div className="flex items-center justify-center gap-2">
                <FcGoogle className="text-2xl" />
                Sign in with Google
              </div>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </header>
  );
}

export default Header;
