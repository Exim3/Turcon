import { Route, Routes } from "react-router";
import DashBoard from "./pages/dashBoard/DashBoard";
import Home from "./pages/home/Home";

import Contact from "./pages/contact/Contact";
import About from "./pages/about/About";

import InventoryDashboard from "./pages/inventory/InventoryDashboard";
import Inventory from "./pages/inventory/Inventory";
import ProductsList from "./pages/inventory/ProductsList";
import SelectedCountryList from "./pages/inventory/SelectedCountryList";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<DashBoard />}>
          <Route index element={<Home />}></Route>
          <Route path="contact" element={<Contact />}></Route>
          <Route path="about" element={<About />}></Route>
        </Route>
        <Route path="/buy" element={<InventoryDashboard />}>
          <Route path="inventory" element={<Inventory />}>
            <Route index element={<ProductsList />}></Route>
            <Route
              path="filteredcountry"
              element={<SelectedCountryList />}
            ></Route>
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default App;
