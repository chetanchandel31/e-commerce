import AdminRoute from "auth/helper/AdminRoute";
import PrivateRoute from "auth/helper/PrivateRoute";
import Home from "components/core/Home";
import AdminDashBoard from "components/user/AdminDashBoard";
import Signin from "components/user/Signin";
import Signup from "components/user/Signup";
import UserDashBoard from "components/user/UserDashBoard";
import { AuthProvider } from "contexts/auth-context";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const AppRoutes = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route
            element={
              <PrivateRoute>
                <UserDashBoard />
              </PrivateRoute>
            }
            path="/user/dashboard"
          />
          <Route
            element={
              <AdminRoute>
                <AdminDashBoard />
              </AdminRoute>
            }
            path="/admin/dashboard"
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default AppRoutes;
