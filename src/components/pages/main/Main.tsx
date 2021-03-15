import React, { useContext, useEffect } from "react";
import { DataContext } from "../../../App";
import { Redirect, useHistory } from "react-router-dom";
import { RouteComponentProps } from "react-router-dom";
import { List } from "./list/List";
import styles from "./Main.module.css";
import { AddList } from "../main/addList/AddList";
import { TaskRequest } from "../../requests/TaskRequest";
import { ListRequest } from "../../requests/ListRequest";
import { filterLists, filterTasks } from "../../functions/DataFilter";
import { guardRender } from "../../../components/functions/Guard";

type BoardProps = RouteComponentProps<{
  id: string;
}>;

export const Main: React.FC<BoardProps> = (props) => {
  const { data, dispatch } = useContext(DataContext);
  const boardId = Number(props.match.params.id);
  const history = useHistory();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const lists = await ListRequest("fetchLists");
    const tasks = await TaskRequest("fetchTasks");
    dispatch({ type: "listsUpdate", payload: { list: lists } });
    dispatch({ type: "tasksUpdate", payload: { task: tasks } });
  };

  return (
    <>
      {guardRender(data.boards, boardId) ? (
        <div className={styles.main}>
          {data.lists &&
            filterLists(data.lists, boardId).map((ele) => {
              const filteredTasks = filterTasks(data.tasks, boardId).filter(
                (task) => {
                  return task.list_id === ele.id;
                }
              );
              return (
                <div key={ele.id} className={styles.list_lists}>
                  <List
                    tasks={filteredTasks}
                    list={ele}
                    key={ele.id}
                    boardId={boardId}
                  />
                </div>
              );
            })}
          <div className={styles.list_lists}>
            <AddList boardId={boardId} />
          </div>
        </div>
      ) : (
        <Redirect to={history.location.pathname} />
      )}
    </>
  );
};
