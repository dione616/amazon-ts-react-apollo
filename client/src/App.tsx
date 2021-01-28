import React, { useState } from "react";
import { Layout } from "antd";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Viewer } from "./lib/types";
import {
  Products,
  Product,
  Home,
  Host,
  NotFound,
  User,
  Login,
} from "./sections";

const initialViewer: Viewer = {
  id: null,
  token: null,
  avatar: null,
  hasWallet: null,
  didRequest: false,
};

function App() {
  const [viewer, setViewer] = useState<Viewer>(initialViewer);

  console.log(viewer);

  return (
    <Router>
      <Layout id="app">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/host" component={Host} />

          <Route
            exact
            path="/login"
            render={(props) => (
              <Login {...props} viewer={viewer} setViewer={setViewer} />
            )}
          />
          <Route exact path="/product/:id" render={() => <Product />} />
          <Route exact path="/products" render={() => <Products />} />
          <Route exact path="/user/:id" render={() => <User />} />
          <Route exact render={() => <NotFound />} />
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
