import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navigation from "./Component/Navigation/Navigation";
import IndexPage from "./Pages/Main/IndexPage";
import LoginPage from "./Pages/Main/LoginPage";
import SignUpPage from "./Pages/Main/SignUpPage";
import Home from "./Pages/customer/Home";
import Product from "./Pages/customer/Product";
import GameManagerDashboard from "./Pages/GameManager/GameManagerDashboard";
import Forbidden from "./Pages/Main/Forbidden";
import AddNewGamePage from "./Pages/GameManager/AddNewGamePage";


function App() {
  return (
    <>
      <BrowserRouter>
        <Navigation />
        <Switch>
          <Route path="/" exact component={IndexPage} />
          <Route path="/home" exact component={Home} />
          <Route path="/signin" exact component={LoginPage} />
          <Route path="/signup" exact component={SignUpPage} />
          <Route path="/game/:gameId" exact component={Product} />
         

          <Route path="/gameAdmin" exact component={GameManagerDashboard} />
          <Route
            path="/gameAdmin/create/game"
            exact
            component={AddNewGamePage}
          />
          
          <Route path="/forbidden" exact component={Forbidden} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
