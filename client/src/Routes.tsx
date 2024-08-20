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
import { Route, Routes } from "react-router";
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

const AppRoutes: React.FC = () => {
  return (
    <>
      <Routes>
        {/* Auth */}
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        {/* home */}
        <Route path="/" element={<DashBoard />}>
          <Route index element={<Home />}></Route>
          <Route path="contact" element={<Contact />}></Route>
          <Route path="about" element={<About />}></Route>
          <Route path="services" element={<Services />}></Route>
          <Route path="service1" element={<Service1 />}></Route>
          <Route path="service2" element={<Service2 />}></Route>
          <Route path="service3" element={<Service3 />}></Route>
          <Route path="service4" element={<Service4 />}></Route>
          <Route path="service5" element={<Service5 />}></Route>
          <Route path="service6" element={<Service6 />}></Route>
        </Route>
        {/* inventory */}
        <Route path="/buy" element={<InventoryDashboard />}>
          <Route path="inventory" element={<Inventory />}></Route>
          <Route
            path="selectedInventory"
            element={<SelectedInventory />}
          ></Route>
          <Route path="cart" element={<Cart />}></Route>
          <Route path="review" element={<ReviewOrder />}></Route>
          <Route path="cookie" element={<Cookie />}></Route>
          <Route path="support" element={<Support />}></Route>
          <Route path="orders" element={<Orders />}></Route>
          <Route
            path="termsandCondition"
            element={<TermsAndCondition />}
          ></Route>
          <Route path="profile" element={<Profile />}></Route>
          <Route path="returnpolicy" element={<ReturnPolicy />}></Route>
          <Route path="notification" element={<Notification />}></Route>
        </Route>
        {/* other routes */}
        <Route path="*" element={<PageNotFound />}></Route>
        {/* Admin DashBoard */}
        <Route path="/support" element={<AdminDashboard />}>
          <Route path="overview" element={<Overview />}></Route>
          <Route path="containers" element={<Containers />}></Route>
          <Route path="orders" element={<AllOrders />}></Route>
          <Route path="users" element={<Users />}></Route>
          <Route path="chats" element={<AdminChat />}></Route>
          <Route path="sellers" element={<Sellers />}></Route>
          <Route path="salesteam" element={<SalesPerson />}></Route>
          <Route path="purchaseteam" element={<PurchasePerson />}></Route>
        </Route>
      </Routes>
    </>
  );
};

export default AppRoutes;
