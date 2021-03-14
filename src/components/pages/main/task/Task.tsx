import React, { useState } from "react";
import { BoardType, TaskType, ListType } from "../../../interfaces/interface";
import styles from "./Task.module.css";
import { FormModal } from "../../modal/FormModal";

interface Props {
  task: TaskType;
  list: ListType;
  boardId: number;
}

export const Task: React.FC<Props> = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div
        className={styles.task_field}
        onClick={handleOpen}
        style={{
          backgroundColor:
            props.task.deadline_date &&
            new Date(props.task.deadline_date) < new Date()
              ? "rgb(250, 194, 194)"
              : "white",
        }}
      >
        <div className={styles.task_name}>{props.task.name}</div>
      </div>

      <FormModal
        handleClose={handleClose}
        isOpen={isOpen}
        task={props.task}
        list={props.list}
        boardId={props.boardId}
      />
    </>
  );
};
