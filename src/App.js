import React, { Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import Slider from "./components/Slider";
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
