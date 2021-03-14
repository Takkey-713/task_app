import React, { useContext } from "react";
import { DataContext } from "../../../App";
import { RouteComponentProps } from "react-router-dom";
import { List } from "./list/List";
import { TaskType, ListType } from "../../interfaces/interface";
import styles from "./Main.module.css";
import { AddList } from "../main/addList/AddList";

type BoardProps = RouteComponentProps<{
  id: string;
}>;
interface ListsType {
  lists: ListType[];
}

interface TasksType {
  tasks: TaskType[];
}

export const Main: React.FC<BoardProps> = (props) => {
  const { data, dispatch } = useContext(DataContext);
  const id = Number(props.match.params.id);

  const filterLists = data.lists.filter((list) => {
    return list.board_id === id;
  });

  const boardTasks = data.tasks.filter((task) => {
    return task.board_id === id;
  });

  return (
    <div className={styles.main}>
      {filterLists &&
        filterLists.map((ele) => {
          const filterTasks = boardTasks.filter((task) => {
            return task.list_id === ele.id;
          });
          return (
            <div key={ele.id} className={styles.list_lists}>
              <List tasks={filterTasks} list={ele} key={ele.id} boardId={id} />
            </div>
          );
        })}
      <div className={styles.list_lists}>
        <AddList boardId={id} />
      </div>
    </div>
  );
};
