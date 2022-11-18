import React, { Fragment, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import BrandProductsPage from "./pages/Product/BrandProductsPage";
import BrandsPage from "./pages/Product/BrandsPage";
const App = () => {
  return (
    <Fragment>
      <Navbar />
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/products/:name" exact>
          <BrandsPage />
        </Route>
        <Route path="/products/:name/:name">
          <BrandProductsPage />
        </Route>
      </Switch>
    </Fragment>
  );
};

export default App;
