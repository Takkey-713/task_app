import React, { useState, useContext, useRef } from "react";
import { TaskType, ListType } from "../../../interfaces/interface";
import styles from "./List.module.css";
import { Task } from "../task/Task";
import { ListRequest } from "../../../requests/ListRequest";
import { TaskRequest } from "../../../requests/TaskRequest";
import { DataContext } from "../../../../App";
import { ListModal } from "../../../../components/pages/modal/ListModal";

interface Props {
  list: ListType;
  tasks?: TaskType[];
  boardId: number;
}

export const List: React.FC<Props> = (props) => {
  const [listOpen, setListOpen] = useState(true);
  const [taskAddIsOpen, setTaskAddIsOpen] = useState<boolean>(false);
  const [listName, setListName] = useState(props.list.name);
  const [taskName, setTaskName] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const { data, dispatch } = useContext(DataContext);
  const ref = useRef<HTMLDivElement>(null);

  const scrollToBottomOfList = React.useCallback(() => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({
        behavior: "auto",
        block: "end",
      });
    }
  }, [ref]);

  const onClickSubmit = async () => {
    const requestTaskData: TaskType = {
      name: taskName,
      list_id: props.list.id,
      board_id: Number(props.boardId),
    };

    try {
      const tasks: TaskType[] = await TaskRequest("createTasks", {
        data: requestTaskData,
      });
      dispatch({ type: "tasksUpdate", payload: { task: tasks } });
      setTaskAddIsOpen(!taskAddIsOpen);
    } catch (err) {
      alert("通信に失敗しました。");
    }
    scrollToBottomOfList();
    setTaskName("");
  };

  const onKeySubmit = async (e: React.KeyboardEvent) => {
    const requestListData: ListType = {
      id: props.list.id,
      name: listName,
      board_id: Number(props.boardId),
    };

    if (e.key === "Enter") {
      try {
        const lists: ListType[] = await ListRequest("updateLists", {
          data: requestListData,
        });
        dispatch({ type: "listsUpdate", payload: { list: lists } });
        setListOpen(!listOpen);
      } catch (err) {
        alert("通信に失敗しました。");
      }
    } else {
      return false;
    }
  };

  const handleOnListModalClose = () => {
    setIsOpen(!isOpen);
  };

  const handleOnListOpen = () => {
    setListOpen(!listOpen);
    setListName(props.list.name);
  };

  const clickOnTaskAdd = () => {
    setTaskAddIsOpen(!taskAddIsOpen);
  };

  return (
    <div className={styles.contents}>
      {listOpen ? (
        <div className={styles.list_name}>
          <div
            onClick={() => handleOnListOpen()}
            className={styles.list_name_title}
          >
            {props.list.name}
          </div>
          <div className={styles.list_icon} onClick={() => setIsOpen(!isOpen)}>
            :
          </div>

          <ListModal
            isOpen={isOpen}
            list={props.list}
            handleOnListModalClose={handleOnListModalClose}
            tasks={props.tasks}
            boardId={props.boardId}
          />
        </div>
      ) : (
        <div className={styles.list_name}>
          <textarea
            className={styles.list_textarea}
            placeholder={props.list.name}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
              setListName(e.target.value);
            }}
            onKeyPress={(e: React.KeyboardEvent) => onKeySubmit(e)}
          />

          <div
            className={styles.list_cancel_btn}
            onClick={() => setListOpen(!listOpen)}
          >
            ×
          </div>
        </div>
      )}
      <div className={styles.task_lists}>
        {props.tasks &&
          props.tasks.map((task: TaskType) => {
            return (
              <div key={task.id}>
                <Task task={task} list={props.list} boardId={props.boardId} />
                <div className="scroll_ref" ref={ref}></div>
              </div>
            );
          })}
      </div>
      {taskAddIsOpen ? (
        <>
          <div className={styles.task_field}>
            <textarea
              placeholder="カードのタイトルを入力してください"
              className={styles.task_textarea}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setTaskName(e.target.value)
              }
            />
          </div>
          <div className={styles.add_submit_form}>
            <input
              type="submit"
              className={styles.add_task_submit}
              value="タスクを追加する"
              onClick={() => onClickSubmit()}
            />
            <div
              className={styles.task_cancel_btn}
              onClick={() => setTaskAddIsOpen(!taskAddIsOpen)}
            >
              ×
            </div>
          </div>
        </>
      ) : (
        <div className={styles.add_task} onClick={() => clickOnTaskAdd()}>
          <div> + タスクを追加する</div>
        </div>
      )}
    </div>
  );
};
