import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import Timeline from "./Timeline";
import Nav from "../shared/Nav";

import Profile from "./Profile";
import PrivateRoute from "../../core/utils/PrivateRoute";
import Notfound from "./NotFound";
import Post from "./Post";

function App() {
  return (
    <main>
      <Nav />
      <div>
        <Switch>
          <Route path="/" component={Timeline} exact />
          <Route path="/post/:id" component={Post} />
          <PrivateRoute path="/profile" component={Profile} />

          <Route path="/login/:user?" component={Login} />
          <Route path="/register" component={Register} />

          <Route component={Notfound} />
        </Switch>
      </div>
    </main>
  );
}

export default App;
