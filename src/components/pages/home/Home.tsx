import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Header } from "../header/Header";
import { Board } from "../board/Board";
import { Main } from "../main/Main";
import { url } from "../../common";
import "./Home.css";

interface Props {
  isLoggedIn: boolean;
  handleOnLogout: () => void;
}

export const Home: React.FC<Props> = (props) => {
  return (
    <div className="main">
      <Header handleOnLogout={props.handleOnLogout} />
      <Switch>
        <Route exact path="/" component={Board} />
        <Route exact path="/main/:id" component={Main} />
        <Redirect to="/" />
      </Switch>
    </div>
  );
};
