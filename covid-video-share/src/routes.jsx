import React from "react";
import { Route, Switch } from "react-router-dom";
import App from "./components/App";
import LandingPage from "./components/LandingPage";
import SingleVideoShare from "./components/SingleVideoShare";

const Routes = () => (
  <App>
    <Switch>
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/videos/:id" component={SingleVideoShare} />
      <Route exact path="/videolibrary/:id" component={SingleVideoShare} />
    </Switch>
  </App>
);

export default Routes;
