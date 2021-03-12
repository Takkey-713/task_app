import React, { useContext } from "react";
import { DataContext } from "../../../App";
import { List } from "./list/List";
import { BoardType, TaskType, ListType } from "../../interfaces/interface";
import styles from "./Main.module.css";
import { AddList } from "../main/addList/AddList";

interface BoardsType {
  lists: ListType[];
}

interface TasksType {
  tasks: TaskType[];
}

export const Main = () => {
  const { data, dispatch } = useContext(DataContext);
  return (
    <div className={styles.main}>
      {data.lists &&
        data.lists.map((ele) => {
          const tasks = data.tasks.filter((task) => {
            return task.list_id === ele.id;
          });
          return (
            <div key={ele.id} className={styles.list_list}>
              <List tasks={tasks} list={ele} key={ele.id} />
            </div>
          );
        })}
      <div className={styles.list_list}>
        <AddList />
      </div>
    </div>
  );
};
