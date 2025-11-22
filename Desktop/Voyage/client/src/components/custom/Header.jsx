import { HeaderWrapper } from "@/css-sheets/css-styles";
import { Button } from "../ui/button";

import { RxCross2 } from "react-icons/rx";
import { Dialog, DialogContent, DialogTitle, DialogPortal, DialogOverlay } from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { DialogDescription } from "@radix-ui/react-dialog";
import { useSelector, useDispatch } from "react-redux";

import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { setEmptyTrip, resetCurrentTrip } from "@/store/slices/TripSlice";
import { useEffect, useState } from "react";
import { setUser, UserRegister } from "@/store/slices/UserSlice";
import { useGoogleLogin } from "@react-oauth/google";
import { ThemeToggle } from "./ThemeToggle";

function Header() {
  const [openDialog, setOpenDialog] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handelNavigate = () => navigate("/user");
  const gotoCreateTrip = () => {
    dispatch(resetCurrentTrip());
    navigate("/create-trip");
  };

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

  useEffect(() => { }, [user]);

  return (
    <header className="w-full bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 py-3 px-6 flex items-center justify-between backdrop-blur-xl sticky top-0 z-50 transition-colors duration-300">

      {/* Logo */}
      <Link to={"/"} className="flex items-center">
        <img src="/logo.png" alt="logo" className="w-32 hover:opacity-90 transition" />
      </Link>

      {/* Right Side */}
      {user && Object.keys(user).length > 0 ? (
        <div className="flex items-center gap-4">
          <ThemeToggle />

          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-5 py-2 rounded-xl shadow-md transition-all"
            onClick={gotoCreateTrip}
          >
            Create Trip
          </Button>

          <Button
            className="bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-xl transition-all dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
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
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Button
            className="bg-blue-600 text-white px-6 py-2 rounded-xl shadow-md hover:bg-blue-700 transition-all"
            onClick={() => setOpenDialog(true)}
          >
            Login
          </Button>
        </div>
      )}

      {/* Login Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogPortal>
          <DialogOverlay className="fixed inset-0 bg-black/30 backdrop-blur-md z-40 animate-in fade-in duration-300" />
          <DialogContent className="
            fixed z-50 top-1/2 left-1/2
            -translate-x-1/2 -translate-y-1/2
            w-full max-w-md p-0 rounded-3xl
            backdrop-blur-2xl bg-white/80 shadow-2xl border border-white/20
            animate-in zoom-in-95 duration-300 overflow-hidden
          ">
            <DialogTitle className="sr-only">Login</DialogTitle>
            <DialogDescription className="sr-only">Login with Google</DialogDescription>

            <div className="relative p-10">
              {/* Close Button */}
              <button
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                onClick={() => setOpenDialog(false)}
              >
                <RxCross2 className="text-gray-500" size={18} />
              </button>

              {/* Google Icon & Title */}
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-white rounded-full shadow-lg mx-auto flex items-center justify-center mb-6">
                  <FcGoogle className="text-5xl" />
                </div>
                <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Welcome Back</h2>
                <p className="text-gray-500">
                  Sign in to save your trips and access them anywhere.
                </p>
              </div>

              {/* Login Button */}
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
    </header>
  );
}

export default Header;
