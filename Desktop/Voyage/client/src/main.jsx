import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { ToastContainer, Zoom } from "react-toastify";

import { GoogleOAuthProvider } from "@react-oauth/google";
import { Provider } from "react-redux";
import Store from "./store/store.js";

import { ThemeProvider } from "@/components/custom/ThemeProvider";

createRoot(document.getElementById("root")).render(
  <>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
      <Provider store={Store}>
        <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
          <App />
          <ToastContainer
            position="top-center"
            autoClose={1000}
            theme="colored"
            transition={Zoom}
          />
        </ThemeProvider>
      </Provider>
    </GoogleOAuthProvider>
  </>
);
