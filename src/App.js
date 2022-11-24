import React, { Fragment, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import BrandsPage from "./pages/Product/BrandsPage";
import ProductPage from "./pages/Product/ProductPage";
import ProductsPage from "./pages/Product/ProductsPage";
import ProductSubCategory from "./pages/Product/ProductSubCategory";
const App = () => {
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
        <Route path="/cart">
          <Cart />
        </Route>
      </Switch>
      <Footer />
    </Fragment>
  );
};

export default App;
