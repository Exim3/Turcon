import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./Routes";
import ScrollToTop from "./utils/ScrollToTop";

const App = () => {
  return (
    <>
      <Router>
        <ScrollToTop />
        <AppRoutes />
      </Router>
    </>
  );
};

export default App;
