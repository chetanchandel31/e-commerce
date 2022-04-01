import Home from "components/core/Home";
import Signin from "components/user/Signin";
import Signup from "components/user/Signup";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
