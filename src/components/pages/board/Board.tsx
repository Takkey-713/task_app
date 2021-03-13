import React, { useState, useContext, useRef } from "react";
import { BoardType, TaskType } from "../../interfaces/interface";
import styles from "./Board.module.css";
import { Task } from "../main/task/Task";
import { BoardModal } from "../modal/BoardModal";
import { BoardRequest } from "../../requests/BoardRequest";
import { TaskRequest } from "../../requests/TaskRequest";
import { DataContext } from "../../../App";
import { Link } from "react-router-dom";

interface Props {
  board: BoardType;
}

export const Board: React.FC<Props> = (props) => {
  const { data, dispatch } = useContext(DataContext);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOnBoardModalClose = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.board_main}>
      <div
        className={styles.new_options}
        onClick={() => handleOnBoardModalClose()}
      >
        {/* ↑にクリックすると新規ボードを作成する関数を実行するようにする */}
        <ul>
          <li>
            <h4>ボードを作成</h4>
            <p>
              ボードは、作成したさまざまなリストに必要な項目を記載したカードを順に並べて使用します。プロジェクト管理や情報の進捗管理など、あらゆることを整理、管理することができます。
            </p>
          </li>
        </ul>
      </div>

      <div className={styles.all_boards}>
        <ul>
          {data.boards &&
            data.boards.map((ele) => {
              return (
                <Link to={"/main/" + ele.id} className={styles.board_link}>
                  {ele.name} <span></span>
                  <li className={styles.board_list}>
                    <div></div>
                    <span></span>
                  </li>
                </Link>
              );
            })}
        </ul>
      </div>
      <BoardModal
        isOpen={isOpen}
        handleOnBoardModalClose={handleOnBoardModalClose}
      />
    </div>
  );
  // const [boardOpen, setBoardOpen] = useState(true);
  // const [taskAddIsOpen, setTaskAddIsOpen] = useState<boolean>(false);
  // const [boardName, setBoardName] = useState(props.board.name);
  // const [taskName, setTaskName] = useState("");
  // const [isOpen, setIsOpen] = useState(false);
  // const { data, dispatch } = useContext(DataContext);
  // const ref = useRef<HTMLDivElement>(null);
  // const scrollToBottomOfList = React.useCallback(() => {
  //   if (ref && ref.current) {
  //     ref.current.scrollIntoView({
  //       behavior: "auto",
  //       block: "end",
  //     });
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [ref]);
  // const onClickSubmit = async () => {
  //   const requestTaskData: TaskType = {
  //     name: taskName,
  //     board_id: props.board.id,
  //   };
  //   try {
  //     const tasks: TaskType[] = await TaskRequest("createTasks", {
  //       data: requestTaskData,
  //     });
  //     dispatch({ type: "tasksUpdate", payload: { task: tasks } });
  //     setTaskAddIsOpen(!taskAddIsOpen);
  //   } catch (err) {
  //     alert("通信に失敗しました。");
  //   }
  //   scrollToBottomOfList();
  // };
  // const onKeySubmit = async (e: React.KeyboardEvent) => {
  //   const requestBoardData: BoardType = {
  //     id: props.board.id,
  //     name: boardName,
  //   };
  //   if (e.key === "Enter") {
  //     try {
  //       const boards: BoardType[] = await BoardRequest("updateBoards", {
  //         data: requestBoardData,
  //       });
  //       dispatch({ type: "boardsUpdate", payload: { board: boards } });
  //       setBoardOpen(!boardOpen);
  //     } catch (err) {
  //       alert("通信に失敗しました。");
  //     }
  //   } else {
  //     return false;
  //   }
  // };
  // const handleOnBoardModalClose = () => {
  //   setIsOpen(!isOpen);
  // };
  // const handleOnBoardOpen = () => {
  //   setBoardOpen(!boardOpen);
  //   setBoardName(props.board.name);
  // };
  // const clickOnTaskAdd = () => {
  //   setTaskAddIsOpen(!taskAddIsOpen);
  // };
  // return (
  //   <div className={styles.contents}>
  //     {boardOpen ? (
  //       <div className={styles.board_name}>
  //         <div
  //           onClick={() => handleOnBoardOpen()}
  //           className={styles.board_name_title}
  //         >
  //           {props.board.name}
  //         </div>
  //         <div className={styles.board_icon} onClick={() => setIsOpen(!isOpen)}>
  //           :
  //         </div>
  //         <BoardModal
  //           isOpen={isOpen}
  //           board={props.board}
  //           handleOnBoardModalClose={handleOnBoardModalClose}
  //           tasks={props.tasks}
  //         />
  //       </div>
  //     ) : (
  //       <div className={styles.board_name}>
  //         <textarea
  //           className={styles.board_textarea}
  //           placeholder={props.board.name}
  //           onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
  //             setBoardName(e.target.value);
  //           }}
  //           onKeyPress={(e: React.KeyboardEvent) => onKeySubmit(e)}
  //         />
  //         <div
  //           className={styles.board_cancel_btn}
  //           onClick={() => setBoardOpen(!boardOpen)}
  //         >
  //           ×
  //         </div>
  //       </div>
  //     )}
  //     <div className={styles.task_lists}>
  //       {props.tasks &&
  //         props.tasks.map((task: TaskType) => {
  //           return (
  //             <div key={task.id}>
  //               <Task task={task} board={props.board} />
  //               <div className="scroll_ref" ref={ref}></div>
  //             </div>
  //           );
  //         })}
  //     </div>
  //     {taskAddIsOpen ? (
  //       <>
  //         <div className={styles.task_field}>
  //           <textarea
  //             placeholder="カードのタイトルを入力してください"
  //             className={styles.task_textarea}
  //             onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
  //               setTaskName(e.target.value)
  //             }
  //           />
  //         </div>
  //         <div className={styles.add_submit_form}>
  //           <input
  //             type="submit"
  //             className={styles.add_task_submit}
  //             value="タスクを追加する"
  //             onClick={() => onClickSubmit()}
  //           />
  //           <div
  //             className={styles.task_cancel_btn}
  //             onClick={() => setTaskAddIsOpen(!taskAddIsOpen)}
  //           >
  //             ×
  //           </div>
  //         </div>
  //       </>
  //     ) : (
  //       <div className={styles.add_task} onClick={() => clickOnTaskAdd()}>
  //         <div> + タスクを追加する</div>
  //       </div>
  //     )}
  //   </div>
  // );
};
