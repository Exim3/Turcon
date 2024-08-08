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

const AppRoutes: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
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
        <Route path="/buy" element={<InventoryDashboard />}>
          <Route path="inventory" element={<Inventory />}></Route>
          <Route
            path="selectedInventory"
            element={<SelectedInventory />}
          ></Route>
          <Route path="cart" element={<Cart />}></Route>
          <Route path="review" element={<ReviewOrder />}></Route>
        </Route>
        <Route path="*" element={<PageNotFound />}></Route>
      </Routes>
    </>
  );
};

export default AppRoutes;
