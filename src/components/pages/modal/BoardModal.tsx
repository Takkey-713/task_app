import React, { useState, useContext } from "react";
import Modal from "react-modal";
import { BoardType, TaskType } from "../../interfaces/interface";
import { BoardRequest } from "../../requests/BoardRequest";
import { TaskRequest } from "../../requests/TaskRequest";
import { DataContext } from "../../../App";
import { FormModal } from "./FormModal";
import DeleteIcon from "@material-ui/icons/Delete";
import styles from "./style/boardModal.module.css";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import CloseIcon from "@material-ui/icons/Close";

const forPcStyles = {
  overlay: {
    backgroundColor: "rgba(0,0,0,.64)",
  },
  content: {
    top: "10vh",
    left: "30vw",
    right: "30vw",
    height: "80vh",
    width: "40vw",
    padding: "10px",
  },
};

const forMobileStyles = {
  overlay: {
    backgroundColor: "rgba(0,0,0,.64)",
  },
  content: {
    top: "5vh",
    left: "5vw",
    right: "5vw",
    height: "90vh",
    width: "90vw",
    padding: "0",
  },
};
// モバイル用に変更する

interface Props {
  isOpen: boolean;
  board: BoardType;
  handleOnBoardModalClose: () => void;
  tasks?: TaskType[];
}

Modal.setAppElement("#root");

export const BoardModal: React.FC<Props> = (props) => {
  const { data, dispatch } = useContext(DataContext);
  const [isTaskOpen, setIsTaskOpen] = useState(false);
  // 既存のタスクをモーダルで表示するためのstate
  const [isShown, setIsShown] = useState(false);
  // 新規タスクを追加するためのモーダルを表示するためのstate
  const mq = useMediaQuery();

  const handleOnDeleteBoard = async () => {
    const requestData = {
      id: props.board && props.board.id,
      name: props.board && props.board.name,
    };
    try {
      const boards: BoardType[] = await BoardRequest("deleteBoards", {
        data: requestData,
      });

      props.handleOnBoardModalClose();
      dispatch({ type: "boardsUpdate", payload: { board: boards } });
    } catch (err) {
      alert("通信に失敗しました。");
    }
  };

  const handleOnDelete = async (task: TaskType) => {
    const requestData = {
      id: task.id,
      name: task.name,
      board_id: task.board_id,
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

  return (
    <div>
      {mq.isPc && (
        <Modal
          isOpen={props.isOpen}
          onRequestClose={props.handleOnBoardModalClose}
          style={forPcStyles}
        >
          <div className={styles.modal_body}>
            <CloseIcon
              style={{ cursor: "pointer" }}
              className={styles.task_close_icon}
              onClick={() => props.handleOnBoardModalClose()}
            />
            <div className={styles.board_title}>{props.board.name}</div>
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
                        board={props.board}
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
                タスクを追加する
              </button>
              <FormModal
                isOpen={isShown}
                handleClose={handleAddTaksModal}
                board={props.board}
              />
              <button
                className={styles.board_delete_btn}
                type="button"
                onClick={handleOnDeleteBoard}
              >
                リストを削除する
              </button>
            </div>
          </div>
        </Modal>
      )}

      {mq.isMobile && (
        <Modal
          isOpen={props.isOpen}
          onRequestClose={props.handleOnBoardModalClose}
          style={forMobileStyles}
        >
          <div className={styles.modal_body}>
            <CloseIcon
              style={{ cursor: "pointer" }}
              className={styles.task_close_icon}
              onClick={() => props.handleOnBoardModalClose()}
            />
            <div className={styles.board_title}>{props.board.name}</div>
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
                        board={props.board}
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
                タスクを追加する
              </button>
              <FormModal
                isOpen={isShown}
                handleClose={handleAddTaksModal}
                board={props.board}
              />
              <button
                className={styles.board_delete_btn}
                type="button"
                onClick={handleOnDeleteBoard}
              >
                リストを削除する
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
