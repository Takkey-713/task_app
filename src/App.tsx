import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Home } from "./components/pages/home/Home";
import { AuthForm } from "./components/auth/AuthForm";
import { AuthRequest } from "./components/requests/AuthRequest";
import { UserType } from "./components/interfaces/interface";
import {
  Data,
  dataAction,
  useDataReducer,
} from "./components/hooks/useDataReducer";
import { BoardRequest } from "./components/requests/BoardRequest";

type dataContextType = {
  data: Data;
  dispatch: ({ type, payload }: dataAction) => void;
};
// dataContextでユーザーの情報を渡してみる

export const DataContext = React.createContext<dataContextType>(
  {} as dataContextType
);

export const App: React.FC = () => {
  const [isLoarding, setIsLoarding] = useState<boolean>(true);
  // ここにtask,board,userのstateを管理する
  const [data, dispatch] = useDataReducer();
  // eslint-disable-next-line
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<UserType>({
    id: 0,
    email: "",
  });

  const handleOnChangeStatus = (user: UserType): void => {
    setIsLoggedIn(!isLoggedIn);
    setUser(user);
  };

  const handleOnLogout = async () => {
    try {
      const res = await AuthRequest("sign_out");
      if (!res.logged_in) {
        setIsLoggedIn(!isLoggedIn);
        setUser({ id: 0, email: "" });
        window.location.pathname = "/";
      }
    } catch {
      alert("通信に失敗しました。");
    }
  };

  const checkLoginStatus = async () => {
    try {
      const res = await AuthRequest("check_login");
      if (res.logged_in && isLoggedIn === false) {
        setIsLoggedIn(true);
        setUser(res.user);
        // pathが表示されるべきurlになるように調整する関数を呼び出す
      } else if (res.status === 401) {
        setIsLoggedIn(false);
      }
    } catch {
      alert("通信に失敗しました");
    }
    setIsLoarding(!isLoarding);
  };

  const fetchBoardData = async () => {
    const boards = await BoardRequest("fetchBoards");
    dispatch({ type: "boardsUpdate", payload: { board: boards } });
  };

  useEffect(() => {
    checkLoginStatus();

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    fetchBoardData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <DataContext.Provider value={{ data, dispatch }}>
      <>
        {!isLoarding ? (
          <Router>
            {isLoggedIn ? (
              <Home
                isLoggedIn={isLoggedIn}
                handleOnLogout={handleOnLogout}
              ></Home>
            ) : (
              <AuthForm
                isLoggedIn={isLoggedIn}
                handleOnChangeStatus={handleOnChangeStatus}
              />
            )}
          </Router>
        ) : (
          <>Loarding.............</>
        )}
      </>
    </DataContext.Provider>
  );
};
