import AdminRoute from "auth/helper/AdminRoute";
import AdminDashBoard from "components/admin/AdminDashBoard";
import CreateCategory from "components/admin/CreateCategory";
import CreateProduct from "components/admin/CreateProduct";
import EditProduct from "components/admin/EditProduct";
import ManageCategories from "components/admin/ManageCategories";
import ManageProducts from "components/admin/ManageProducts";
import Orders from "components/admin/Orders";
import Home from "components/core/Home";
import Cart from "components/user/Cart";
import Signin from "components/user/Signin";
import Signup from "components/user/Signup";
import { AuthProvider } from "contexts/auth-context";
import { CartProvider } from "contexts/cart-context";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const AppRoutes = () => (
  <Router>
    <AuthProvider>
      <CartProvider>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/cart" element={<Cart />} />

          <Route path="/signup" element={<Signup />} />

          <Route path="/signin" element={<Signin />} />

          {/* <Route
            element={
              <PrivateRoute>
                <UserDashBoard />
              </PrivateRoute>
            }
            path="/user-dashboard"
          /> */}

          <Route
            element={
              <AdminRoute>
                <AdminDashBoard />
              </AdminRoute>
            }
            path="/admin-dashboard"
          >
            <Route element={<CreateCategory />} path="create-category" />
            <Route element={<ManageCategories />} path="manage-categories" />
            <Route element={<CreateProduct />} path="create-product" />
            <Route element={<ManageProducts />} path="manage-products">
              <Route element={<EditProduct />} path=":productId" />
            </Route>
            <Route element={<Orders />} path="orders" />
          </Route>
        </Routes>
      </CartProvider>
    </AuthProvider>
  </Router>
);

export default AppRoutes;
