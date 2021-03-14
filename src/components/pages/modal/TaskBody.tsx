import React, { useState, useContext, useEffect } from "react";
import styles from "./style/TaskModal.module.css";
import { TaskRequest } from "../../requests/TaskRequest";
import { TaskType, BoardType, ListType } from "../../interfaces/interface";
import { DataContext } from "../../../App";
import CloseIcon from "@material-ui/icons/Close";

interface Props {
  task?: TaskType;
  handleOnClose: () => void;
  list: ListType;
  boardId: number;
}

export const TaskBody: React.FC<Props> = (props) => {
  const { data, dispatch } = useContext(DataContext);
  const [title, setTitle] = useState<string>(
    (props.task && props.task.name) || ""
  );
  const [listId, setListId] = useState<number>(
    (props.task && props.task.list_id) || props.list.id
  );
  const [explanation, setExplanation] = useState<string>(
    (props.task && props.task.explanation) || ""
  );
  const [deadlineDate, setDeadlineDate] = useState<string>(
    (props.task && props.task.deadline_date) || ""
  );

  const onClickSubmit = async () => {
    const requestData = props.task
      ? {
          id: props.task && props.task.id,
          name: title,
          list_id: listId,
          explanation: explanation,
          deadline_date: deadlineDate,
          board_id: props.boardId,
        }
      : {
          name: title,
          list_id: props.list.id,
          explanation: explanation,
          deadline_date: deadlineDate,
          board_id: props.boardId,
        };

    try {
      const tasks: TaskType[] = await TaskRequest(
        props.task ? "updateTasks" : "createTasks",
        {
          data: requestData,
        }
      );
      props.handleOnClose();
      dispatch({ type: "tasksUpdate", payload: { task: tasks } });
    } catch (err) {
      alert("通信に失敗しました。");
    }
  };

  const handleOnDelete = async () => {
    const requestData = {
      id: props.task && props.task.id,
      name: title,
      list_id: listId,
      board_id: props.boardId,
    };
    try {
      const tasks: TaskType[] = await TaskRequest("deleteTasks", {
        data: requestData,
      });
      dispatch({ type: "tasksUpdate", payload: { task: tasks } });
    } catch (err) {
      alert("通信に失敗しました。");
    }
  };

  return (
    <form className={styles.modal_body}>
      <CloseIcon
        style={{ cursor: "pointer" }}
        className={styles.task_close_icon}
        onClick={() => props.handleOnClose()}
      />
      <div>
        <h4 className={styles.input_title}>タイトル</h4>
        <textarea
          className={styles.textArea}
          value={title}
          placeholder="タスクのタイトルを入力してください"
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setTitle(e.target.value)
          }
        />
        <h4 className={styles.input_title}>説明</h4>
        <textarea
          className={styles.textArea}
          placeholder="説明を記入してください"
          value={explanation}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setExplanation(e.target.value)
          }
        />
        <h4 className={styles.input_title}>期限</h4>

        <input
          className={styles.input_date}
          type="date"
          value={deadlineDate}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setDeadlineDate(e.target.value)
          }
        />
        <div className={styles.deadline_date_msg}>
          {props.task &&
          props.task.deadline_date &&
          new Date(props.task.deadline_date) < new Date()
            ? "※期限が過ぎています"
            : ""}
        </div>
        <h4 className={styles.input_title}>リスト</h4>
        {props.task && (
          <select
            className={styles.select}
            value={listId}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setListId(Number(e.target.value))
            }
          >
            {data.lists &&
              data.lists.map((list: ListType) => {
                return (
                  <option key={list.id} value={list.id}>
                    {list.name}
                  </option>
                );
              })}
          </select>
        )}
        {!props.task && (
          <select
            className={styles.select}
            value={props.list.id}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setListId(Number(e.target.value))
            }
          >
            <option value={props.list.id}>{props.list.name}</option>
          </select>
        )}
      </div>

      <input
        className={styles.input_submit}
        type="button"
        value={props.task ? "タスクを更新する" : "タスクを追加する"}
        onClick={() => onClickSubmit()}
      />

      {props.task && (
        <button
          className={styles.delete_button}
          type="button"
          onClick={handleOnDelete}
        >
          タスクを削除する
        </button>
      )}
    </form>
  );
};
