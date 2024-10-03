import React from "react";
import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./utils/AuthContext";
import ProtectedRoute from "./utils/ProtectedRoute";

import PageNotFound from "./pages/pageNotFound/PageNotFound";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import AdminDashboard from "./pages/adminDashboard";
import Overview from "./pages/Admin/overview/Overview";
import Containers from "./pages/Admin/containers/Containers";
import AllOrders from "./pages/Admin/orders/AllOrders";
import Users from "./pages/Admin/users/Users";
import AdminChat from "./pages/Admin/Chats/AdminChat";
import SalesPerson from "./pages/Admin/salesperson/SalesPerson";
import PurchasePerson from "./pages/Admin/purchaseperson/PurchasePerson";
import UnAuthorization from "./pages/unauthorization/UnAuthorization";
import Settings from "./pages/Admin/settings/Settings";
import ViewOrder from "./pages/Admin/orders/ViewOrder";
import ForgetPassword from "./pages/forgetPassword/ForgetPassword";
import ChangePassword from "./pages/forgetPassword/ChangePassword";
import Logout from "./pages/logout/Logout";
import Sellers from "./pages/Admin/sellers/Sellers";
import ViewSeller from "./pages/Admin/sellers/ViewSeller";
import AddSeller from "./pages/Admin/sellers/AddSeller";
import SellerContainer from "./pages/Admin/sellers/SellerContainer";
import AddSellerPerson from "./pages/Admin/sellers/AddSellerPerson";
import ViewUser from "./pages/Admin/users/ViewUser";

const AppRoutes: React.FC = () => {
  return (
    <AuthProvider>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="/changepassword/:id" element={<ChangePassword />} />
        <Route path="/unauthorized" element={<UnAuthorization />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={<ProtectedRoute element={<AdminDashboard />} />}
        >
          <Route index element={<ProtectedRoute element={<Overview />} />} />
          <Route
            path="containers"
            element={<ProtectedRoute element={<Containers />} />}
          />
          <Route
            path="orders"
            element={<ProtectedRoute element={<AllOrders />} />}
          />
          <Route
            path="orders/:id"
            element={<ProtectedRoute element={<ViewOrder />} />}
          />
          <Route
            path="users"
            element={<ProtectedRoute element={<Users />} />}
          />
          <Route
            path="viewUser/:id"
            element={<ProtectedRoute element={<ViewUser />} />}
          />
          <Route
            path="chats"
            element={<ProtectedRoute element={<AdminChat />} />}
          />
          <Route
            path="sellers"
            element={<ProtectedRoute element={<Sellers />} />}
          />
          <Route
            path="viewSeller/:sellerId"
            element={<ProtectedRoute element={<ViewSeller />} />}
          />
          <Route
            path="sellers/containers/:sellerId"
            element={<ProtectedRoute element={<SellerContainer />} />}
          />
          <Route
            path="sellers/containers/:sellerId/addperson"
            element={<ProtectedRoute element={<AddSellerPerson />} />}
          />
          <Route
            path="sellers/addSeller"
            element={<ProtectedRoute element={<AddSeller />} />}
          />
          <Route
            path="salesteam"
            element={<ProtectedRoute element={<SalesPerson />} />}
          />
          <Route
            path="purchaseteam"
            element={<ProtectedRoute element={<PurchasePerson />} />}
          />
          <Route
            path="settings"
            element={<ProtectedRoute element={<Settings />} />}
          />
          <Route
            path="profile"
            element={<ProtectedRoute element={<Profile />} />}
          />
          <Route
            path="logout"
            element={<ProtectedRoute element={<Logout />} />}
          />
        </Route>

        {/* Catch-all Route */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </AuthProvider>
  );
};

export default AppRoutes;
