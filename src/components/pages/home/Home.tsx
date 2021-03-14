import React, { useState, useEffect } from "react";
import {
  Redirect,
  Route,
  Switch,
  BrowserRouter,
  useHistory,
} from "react-router-dom";
import axios from "axios";
import { Header } from "../header/Header";
import { Board } from "../board/Board";
import { Main } from "../main/Main";
import "./Home.css";

interface Props {
  isLoggedIn: boolean;
  handleOnLogout: () => void;
}

export const Home: React.FC<Props> = (props) => {
  return (
    <div className="main">
      <Header
        handleOnLogout={props.handleOnLogout}
        isLoggedIn={props.isLoggedIn}
      />
      <Switch>
        <Route exact path="/" component={Board} />
        <Route exact path="/main/:id" component={Main} />
      </Switch>
      {/* <Main /> */}
      {/* react-routerでHomeの中身を分けるので上記Mainコンポーネントは削除する */}
    </div>
  );
};
