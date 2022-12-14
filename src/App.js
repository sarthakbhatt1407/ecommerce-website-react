import React, { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import AddressPage from "./pages/AddressPage";
import Cart from "./pages/Cart";
import CheckoutPage from "./pages/CheckoutPage";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import PaymentPage from "./pages/PaymentPage";
import BrandsPage from "./pages/Product/BrandsPage";
import ProductPage from "./pages/Product/ProductPage";
import ProductsPage from "./pages/Product/ProductsPage";
import ProductSubCategory from "./pages/Product/ProductSubCategory";
import ProfilePage from "./pages/ProfilePage";
import RegisterPage from "./pages/RegisterPage";
import SecurityPage from "./pages/SecurityPage";
import YourOrders from "./pages/YourOrders";
const App = () => {
  const userLoggedIn = useSelector((state) => state.isLoggedIn);
  return (
    <Fragment>
      <Navbar />

      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/products/:category" exact>
          <BrandsPage />
        </Route>
        <Route path="/products/:category/:subcategory" exact>
          <ProductSubCategory />
        </Route>
        <Route path="/products/:category/:subcategory/:allproducts" exact>
          <ProductsPage />
        </Route>
        <Route
          path="/products/:category/:subcategory/:allproducts/:productid"
          exact
        >
          <ProductPage />
        </Route>
        <Route path="/login" exact>
          <LoginPage />
        </Route>
        <Route path="/register" exact>
          <RegisterPage />
        </Route>
        <Route path="/cart" exact>
          <Cart />
        </Route>
        {userLoggedIn && (
          <Fragment>
            {" "}
            <Route path="/checkout" exact>
              <CheckoutPage />
            </Route>
            <Route path="/profile" exact>
              <ProfilePage />
            </Route>
            <Route path="/payment" exact>
              <PaymentPage />
            </Route>
            <Route path="/profile/orders" exact>
              <YourOrders />
            </Route>
            <Route path="/profile/address" exact>
              <AddressPage />
            </Route>
            <Route path="/profile/security" exact>
              <SecurityPage />
            </Route>
          </Fragment>
        )}
        <Route path="*" exact>
          <Redirect to="/" />
        </Route>
      </Switch>
    </Fragment>
  );
};

export default App;
