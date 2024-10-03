import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./Routes";
import ScrollToTop from "./utils/ScrollToTop";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./utils/AuthContext";

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        {" "}
        {/* Wrap your routes with AuthProvider */}
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <ScrollToTop />
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
};

export default App;
