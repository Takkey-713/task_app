import React, { useState, useContext } from "react";
import Modal from "react-modal";
import { TaskType, ListType } from "../../interfaces/interface";
import { ListRequest } from "../../requests/ListRequest";
import { TaskRequest } from "../../requests/TaskRequest";
import { DataContext } from "../../../App";
import { FormModal } from "./FormModal";
import DeleteIcon from "@material-ui/icons/Delete";
import styles from "./style/ListModal.module.css";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import CloseIcon from "@material-ui/icons/Close";

const forPcStyles = {
  overlay: {
    backgroundColor: "rgba(0,0,0,.64)",
  },
  content: {
    top: "10vh",
    left: "35vw",
    right: "35vw",
    height: "80vh",
    width: "30vw",
    padding: "10px",
  },
};

const forMobileStyles = {
  overlay: {
    backgroundColor: "rgba(0,0,0,.64)",
  },
  content: {
    top: "10vh",
    left: "5vw",
    right: "5vw",
    height: "80vh",
    width: "90vw",
    padding: "0",
  },
};
// モバイル用に変更する

interface Props {
  isOpen: boolean;
  list: ListType;
  handleOnListModalClose: () => void;
  tasks?: TaskType[];
  boardId: number;
}

Modal.setAppElement("#root");

export const ListModal: React.FC<Props> = (props) => {
  const { dispatch } = useContext(DataContext);
  const [isTaskOpen, setIsTaskOpen] = useState<boolean>(false);
  const [isShown, setIsShown] = useState<boolean>(false);
  const [isListOpen, setIsListOpen] = useState<boolean>(false);
  const [listName, setListName] = useState<string>(props.list.name);
  const mq = useMediaQuery();

  const handleOnDeleteList = async () => {
    const requestData = {
      id: props.list && props.list.id,
      name: props.list && props.list.name,
      board_id: Number(props.boardId),
    };
    try {
      const lists: ListType[] = await ListRequest("deleteLists", {
        data: requestData,
      });

      props.handleOnListModalClose();
      dispatch({ type: "listsUpdate", payload: { list: lists } });
    } catch (err) {
      alert("通信に失敗しました。");
    }
  };

  const handleOnDelete = async (task: TaskType) => {
    const requestData = {
      id: task.id,
      name: task.name,
      list_id: task.list_id,
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

  const handleOnTaskModal = () => {
    setIsTaskOpen(!isTaskOpen);
  };

  const handleAddTaksModal = () => {
    setIsShown(!isShown);
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
        setIsListOpen(!isListOpen);
      } catch (err) {
        alert("通信に失敗しました。");
      }
    } else {
      return false;
    }
  };

  return (
    <div>
      {mq.isPc && (
        <Modal
          isOpen={props.isOpen}
          onRequestClose={props.handleOnListModalClose}
          style={forPcStyles}
        >
          <div className={styles.modal_body}>
            <CloseIcon
              style={{ cursor: "pointer" }}
              className={styles.task_close_icon}
              onClick={() => props.handleOnListModalClose()}
            />
            {isListOpen ? (
              <div className={styles.list_form}>
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
                  onClick={() => setIsListOpen(!isListOpen)}
                >
                  ×
                </div>
              </div>
            ) : (
              <div
                className={styles.list_title}
                onClick={() => setIsListOpen(!isListOpen)}
              >
                {props.list.name}
              </div>
            )}

            <div className={styles.task_lists}>
              {props.tasks &&
                props.tasks.map((task) => {
                  return (
                    <div className={styles.task_field} key={task.id}>
                      <div
                        className={styles.task_name}
                        onClick={() => handleOnTaskModal()}
                      >
                        {task.name}
                      </div>
                      <DeleteIcon
                        onClick={() => handleOnDelete(task)}
                        style={{
                          fontSize: "20px",
                          cursor: "pointer",
                          margin: "2px 0px 0px 10px",
                        }}
                      />
                      <FormModal
                        isOpen={isTaskOpen}
                        handleClose={handleOnTaskModal}
                        task={task}
                        list={props.list}
                        boardId={props.boardId}
                        key={task.id}
                      />
                    </div>
                  );
                })}
            </div>
            <div className={styles.add_option}>
              <button
                className={styles.add_task_btn}
                onClick={() => setIsShown(!isShown)}
              >
                タスクを追加
              </button>
              <FormModal
                isOpen={isShown}
                handleClose={handleAddTaksModal}
                list={props.list}
                boardId={props.boardId}
              />
              <button
                className={styles.list_delete_btn}
                type="button"
                onClick={handleOnDeleteList}
              >
                リストを削除
              </button>
            </div>
          </div>
        </Modal>
      )}

      {mq.isMobile && (
        <Modal
          isOpen={props.isOpen}
          onRequestClose={props.handleOnListModalClose}
          style={forMobileStyles}
        >
          <div className={styles.modal_body}>
            <CloseIcon
              style={{ cursor: "pointer" }}
              className={styles.task_close_icon}
              onClick={() => props.handleOnListModalClose()}
            />
            {isListOpen ? (
              <div className={styles.list_form}>
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
                  onClick={() => setIsListOpen(!isListOpen)}
                >
                  ×
                </div>
              </div>
            ) : (
              <div
                className={styles.list_title}
                onClick={() => setIsListOpen(!isListOpen)}
              >
                {props.list.name}
              </div>
            )}

            <div className={styles.task_lists}>
              {props.tasks &&
                props.tasks.map((task) => {
                  return (
                    <div className={styles.task_field} key={task.id}>
                      <div
                        className={styles.task_name}
                        onClick={() => handleOnTaskModal()}
                      >
                        {task.name}
                      </div>
                      <DeleteIcon
                        onClick={() => handleOnDelete(task)}
                        style={{
                          fontSize: "20px",
                          cursor: "pointer",
                          margin: "2px 0px 0px 10px",
                        }}
                      />
                      <FormModal
                        isOpen={isTaskOpen}
                        handleClose={handleOnTaskModal}
                        task={task}
                        list={props.list}
                        key={task.id}
                        boardId={props.boardId}
                      />
                    </div>
                  );
                })}
            </div>
            <div className={styles.add_option}>
              <button
                className={styles.add_task_btn}
                onClick={() => setIsShown(!isShown)}
              >
                タスクを追加
              </button>
              <FormModal
                isOpen={isShown}
                handleClose={handleAddTaksModal}
                list={props.list}
                boardId={props.boardId}
              />
              <button
                className={styles.list_delete_btn}
                type="button"
                onClick={handleOnDeleteList}
              >
                リストを削除
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
