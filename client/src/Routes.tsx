import React from "react";
import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./utils/AuthContext";
import ProtectedRoute from "./utils/ProtectedRoute";

import DashBoard from "./pages/dashBoard/DashBoard";
import Home from "./pages/home/Home";
import Contact from "./pages/contact/Contact";
import About from "./pages/about/About";
import InventoryDashboard from "./pages/inventory/InventoryDashboard";
import Inventory from "./pages/inventory/Inventory";
import SelectedInventory from "./pages/selectedInventory/SelectedInventory";
import PageNotFound from "./pages/pageNotFound/PageNotFound";
import Cart from "./pages/cart/Cart";
import Service1 from "./pages/service/Service1";
import Service2 from "./pages/service/Service2";
import Service3 from "./pages/service/Service3";
import Service4 from "./pages/service/Service4";
import Service5 from "./pages/service/Service5";
import Service6 from "./pages/service/Service6";
import Services from "./pages/services/Services";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import ReviewOrder from "./pages/cart/ReviewOrder";
import Cookie from "./pages/cookie/Cookie";
import Notification from "./pages/notification/Notification";
import ReturnPolicy from "./pages/returnPolicy/ReturnPolicy";
import Profile from "./pages/profile/Profile";
import TermsAndCondition from "./pages/termsAndCondition/TermsAndCondition";
import Orders from "./pages/orders/Orders";
import Support from "./pages/support/Support";
import AdminDashboard from "./pages/adminDashboard";
import Overview from "./pages/Admin/overview/Overview";
import Containers from "./pages/Admin/containers/Containers";
import AllOrders from "./pages/Admin/orders/AllOrders";
import Users from "./pages/Admin/users/Users";
import AdminChat from "./pages/Admin/Chats/AdminChat";
import Sellers from "./pages/Admin/sellers/Sellers";
import SalesPerson from "./pages/Admin/salesperson/SalesPerson";
import PurchasePerson from "./pages/Admin/purchaseperson/PurchasePerson";
import { Step1 } from "./pages/register/formSteps/Step1";
import { Step2 } from "./pages/register/formSteps/Step2";
import { Step3 } from "./pages/register/formSteps/Step3";
import { Step4 } from "./pages/register/formSteps/Step4";
import { Step5 } from "./pages/register/formSteps/Step5";
import UnAuthorization from "./pages/unauthorization/UnAuthorization";

const AppRoutes: React.FC = () => {
  return (
    <AuthProvider>
      <Routes>
        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />}>
          <Route index element={<Step1 />} />
          <Route path="verifymail" element={<Step2 />} />
          <Route path="phone" element={<Step3 />} />
          <Route path="otpverify" element={<Step4 />} />
          <Route path="document" element={<Step5 />} />
        </Route>
        {/* UnAuthorizaion page */}

        <Route path="/unauthorized" element={<UnAuthorization />} />
        {/* Home */}
        <Route path="/" element={<DashBoard />}>
          <Route index element={<Home />} />
          <Route path="contact" element={<Contact />} />
          <Route path="about" element={<About />} />
          <Route path="services" element={<Services />} />
          <Route path="service1" element={<Service1 />} />
          <Route path="service2" element={<Service2 />} />
          <Route path="service3" element={<Service3 />} />
          <Route path="service4" element={<Service4 />} />
          <Route path="service5" element={<Service5 />} />
          <Route path="service6" element={<Service6 />} />
        </Route>

        {/* Inventory */}
        <Route path="/buy" element={<InventoryDashboard />}>
          <Route path="inventory" element={<Inventory />} />
          <Route path="selectedInventory" element={<SelectedInventory />} />
          <Route path="cart" element={<ProtectedRoute element={<Cart />} />} />
          <Route
            path="review"
            element={<ProtectedRoute element={<ReviewOrder />} />}
          />
          <Route path="cookie" element={<Cookie />} />
          <Route path="support" element={<Support />} />
          <Route
            path="orders"
            element={<ProtectedRoute element={<Orders />} />}
          />
          <Route path="termsandCondition" element={<TermsAndCondition />} />
          <Route
            path="profile"
            element={<ProtectedRoute element={<Profile />} />}
          />
          <Route path="returnpolicy" element={<ReturnPolicy />} />
          <Route path="notification" element={<Notification />} />
        </Route>

        {/* Other Routes */}
        <Route path="*" element={<PageNotFound />} />

        {/* Admin Dashboard */}
        <Route path="/support" element={<AdminDashboard />}>
          <Route path="overview" element={<Overview />} />
          <Route path="containers" element={<Containers />} />
          <Route path="orders" element={<AllOrders />} />
          <Route path="users" element={<Users />} />
          <Route path="chats" element={<AdminChat />} />
          <Route path="sellers" element={<Sellers />} />
          <Route path="salesteam" element={<SalesPerson />} />
          <Route path="purchaseteam" element={<PurchasePerson />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
};

export default AppRoutes;
