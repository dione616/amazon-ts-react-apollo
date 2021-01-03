import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Products, Product, Home, Host, NotFound, User } from "./sections";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/host" component={Host} />
        <Route exact path="/product/:id" render={() => <Product />} />
        <Route exact path="/products" render={() => <Products />} />
        <Route exact path="/user/:id" render={() => <User />} />
        <Route exact render={() => <NotFound />} />
      </Switch>
    </Router>
  );
}

export default App;
