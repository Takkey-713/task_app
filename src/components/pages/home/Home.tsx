import React from "react";
import { Route, Switch } from "react-router-dom";
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
  const pathName = `${url.production}/main/:id`;
  return (
    <div className="main">
      <Header
        handleOnLogout={props.handleOnLogout}
        isLoggedIn={props.isLoggedIn}
      />
      <Switch>
        <Route exact path="/" component={Board} />
        {process.env.NODE_ENV === "production" ? (
          <Route exact path={pathName} component={Main} />
        ) : (
          <Route exact path="/main/:id" component={Main} />
        )}
      </Switch>
    </div>
  );
};
