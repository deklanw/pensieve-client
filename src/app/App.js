import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import { Landing, NotFound, ComingSoon } from "../pages";
import { Signup, Login, Logout } from "./auth";
import { Decks, DeckHome, DeckNew } from "./decks";
import Settings from "./settings/Settings";
import CardHome from "./cards/home/CardHome";
import Review from "./review/Review";
import ReviewNew from "./review/new/ReviewNew";

import { NavBar, Footer } from "../components";
import GoogleAnalytics from "../helpers/GoogleAnalytics";
import isAuthenticated from "../helpers/isAuthenticated";

import "./App.css";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? <Component {...props} /> : <Redirect to="/" />
    }
  />
);

const UnauthenticatedOnlyRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      !isAuthenticated() ? <Component {...props} /> : <Redirect to="/" />
    }
  />
);

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <NavBar className="App-navbar" />
          <div className="App-content py-5">
            <Route path="/" component={GoogleAnalytics} />
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route path="/logout" component={Logout} />
              <UnauthenticatedOnlyRoute path="/login" component={Login} />
              <UnauthenticatedOnlyRoute path="/signup" component={Signup} />

              <PrivateRoute path="/settings" component={Settings} />
              <PrivateRoute exact path="/decks" component={Decks} />
              <PrivateRoute exact path="/decks/new" component={DeckNew} />
              <PrivateRoute exact path="/decks/:deckId" component={DeckHome} />
              <PrivateRoute exact path="/cards/:cardId" component={CardHome} />
              <PrivateRoute exact path="/sessions/new" component={ReviewNew} />
              <PrivateRoute
                exact
                path="/sessions/:sessionId"
                component={Review}
              />

              <Route path="/about" component={ComingSoon} />
              <Route path="/api" component={ComingSoon} />
              <Route path="/help" component={ComingSoon} />

              <Route exact path="*" component={NotFound} />
            </Switch>
          </div>
          <Footer className="App-footer" />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
