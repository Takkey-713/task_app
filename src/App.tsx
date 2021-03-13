import React, { useState, useEffect } from "react";
import {
  Redirect,
  Route,
  Switch,
  BrowserRouter as Router,
  useHistory,
} from "react-router-dom";
import { Home } from "./components/pages/home/Home";
import { AuthForm } from "./components/auth/AuthForm";
import { AuthRequest } from "./components/requests/AuthRequest";
import { ListRequest } from "./components/requests/ListRequest";
import { TaskRequest } from "./components/requests/TaskRequest";
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
  // ここにtask,board,userのstateを管理する
  const [data, dispatch] = useDataReducer();
  // eslint-disable-next-line
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<UserType>({
    id: 0,
    email: "",
  });
  const history = useHistory();
  // eslint-disable-next-line
  const handleOnChangeStatus = (user: UserType): void => {
    setIsLoggedIn(!isLoggedIn);
    setUser(user);
    window.history.pushState(null, "", "/");
  };

  const handleOnLogout = async () => {
    try {
      const res = await AuthRequest("sign_out");
      if (!res.logged_in) {
        setIsLoggedIn(!isLoggedIn);
        setUser({ id: 0, email: "" });
        window.history.pushState(null, "", "/");
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
        // window.history.pushState(null, "", "/boards");
      } else if (res.status === 401) {
        setIsLoggedIn(false);
      }
    } catch {
      alert("通信に失敗しました");
    }
  };

  // 初回マウンティングした時にデータベースのボードとタスクを全て持ってくる
  const fetchData = async () => {
    // const boards = await BoardRequest("fetchBoards");
    const boards = await BoardRequest("fetchBoards");
    const lists = await ListRequest("fetchLists");
    const tasks = await TaskRequest("fetchTasks");
    dispatch({ type: "boardsUpdate", payload: { board: boards } });
    dispatch({ type: "listsUpdate", payload: { list: lists } });
    dispatch({ type: "tasksUpdate", payload: { task: tasks } });
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  useEffect(() => {
    // checkLoginStatus();
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    dispatch({
      type: "tasksUpdate",
      payload: { task: data.tasks },
    });
    // eslint-disable-next-line
  }, [data.tasks]);

  return (
    <DataContext.Provider value={{ data, dispatch }}>
      <>
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
      </>
    </DataContext.Provider>
  );
};
