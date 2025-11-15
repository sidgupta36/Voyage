import { Button } from "../ui/button";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";

const Auth = () => {
  const login = useGoogleLogin({
    onSuccess: (response) => console.log(response),
    onError: (error) => console.log(error),
  });

  return (
    <section className="w-full min-h-[85vh] flex items-center justify-center bg-gradient-to-b from-blue-50 to-white px-4">
      <div className="backdrop-blur-xl bg-white/40 border border-white/20 shadow-2xl rounded-3xl p-10 w-full max-w-md flex flex-col items-center animate-fade-in">
        
        {/* Icon */}
        <FcGoogle className="text-6xl mb-4" />

        {/* Heading */}
        <h2 className="text-3xl font-extrabold text-gray-900">
          Welcome Back
        </h2>
        <p className="text-gray-600 text-sm mt-2">
          Don’t have an account?{" "}
          <a href="#" className="text-blue-600 font-medium hover:underline">
            Sign up
          </a>
        </p>

        {/* Google Sign-in Button */}
        <Button
          onClick={() => login()}
          className="mt-8 w-full py-5 text-lg font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md hover:shadow-lg transition-all"
        >
          <div className="flex items-center justify-center gap-2">
            <FcGoogle className="text-2xl" />
            Sign in with Google
          </div>
        </Button>
      </div>
    </section>
  );
};

export default Auth;
