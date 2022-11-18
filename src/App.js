import React, { Fragment, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
const App = () => {
  return (
    <Fragment>
      <Navbar />
      <Switch>
        <Route to="/" exact>
          <Home />
        </Route>
      </Switch>
    </Fragment>
  );
};

export default App;
