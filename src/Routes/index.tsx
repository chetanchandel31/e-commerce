import AdminRoute from "auth/helper/AdminRoute";
import PrivateRoute from "auth/helper/PrivateRoute";
import CreateCategory from "components/admin/CreateCategory";
import CreateProduct from "components/admin/CreateProduct";
import EditProduct from "components/admin/EditProduct";
import ManageProducts from "components/admin/ManageProducts";
import Home from "components/core/Home";
import AdminDashBoard from "components/user/AdminDashBoard";
import Cart from "components/user/Cart";
import Signin from "components/user/Signin";
import Signup from "components/user/Signup";
import UserDashBoard from "components/user/UserDashBoard";
import { AuthProvider } from "contexts/auth-context";
import { CartProvider } from "contexts/cart-context";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const AppRoutes = () => (
  <Router>
    <AuthProvider>
      <CartProvider>
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
            path="/user-dashboard"
          />

          <Route
            element={
              <AdminRoute>
                <AdminDashBoard />
              </AdminRoute>
            }
            path="/admin-dashboard"
          >
            <Route element={<CreateCategory />} path="create-categories" />
            <Route element={<CreateProduct />} path="create-product" />
            <Route element={<ManageProducts />} path="manage-products">
              <Route element={<EditProduct />} path=":productId" />
            </Route>
            <Route element={<>hi manage orders</>} path="manage-orders" />
          </Route>

          <Route element={<Cart />} path="/cart" />
        </Routes>
      </CartProvider>
    </AuthProvider>
  </Router>
);

export default AppRoutes;
