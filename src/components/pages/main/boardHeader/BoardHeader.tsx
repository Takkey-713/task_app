import React, { useState, useEffect, useContext } from "react";
import { DataContext } from "../../../../App";
import { BoardRequest } from "../../../requests/BoardRequest";
import styles from "./BoardHeader.module.css";
import { DeleteBoardModal } from "../../modal/DeleteBoardModal";
import { useMediaQuery } from "../../../hooks/useMediaQuery";
import AssignmentIcon from "@material-ui/icons/Assignment";

interface Props {
  boardId: number;
}
export const BoardHeader: React.FC<Props> = (props) => {
  const { dispatch } = useContext(DataContext);
  const mq = useMediaQuery();
  const [open, setOpen] = useState(true);
  const [boardName, setBoardName] = useState("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [board, setBoard] = useState({
    id: 0,
    name: "",
  });

  useEffect(() => {
    fetchSlectBoard();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    fetchSlectBoard();
    // eslint-disable-next-line
  }, [boardName]);

  const fetchSlectBoard = async () => {
    const requestData = {
      id: props.boardId,
    };
    try {
      const board = await BoardRequest("selectBoard", { data: requestData });
      setBoard(board.data);
    } catch {
      alert("通信に失敗しました");
    }
  };

  const onClickOpen = () => {
    setIsOpen(!open);
  };

  const onKeySubmit = async (e: React.KeyboardEvent) => {
    const requestData = {
      id: board.id,
      name: boardName,
    };

    if (e.key === "Enter") {
      try {
        const boards = await BoardRequest("updateBoard", {
          data: requestData,
        });
        setOpen(!open);
        setBoardName(boardName);
        dispatch({ type: "boardsUpdate", payload: { board: boards } });
      } catch (err) {
        alert("通信に失敗しました。");
      }
      setBoardName(board.name);
    } else {
      return false;
    }
  };

  return (
    <>
      {mq.isPc && (
        <div className={styles.contents}>
          {open ? (
            <div className={styles.board_name}>
              <div
                onClick={() => setOpen(!open)}
                className={styles.board_name_title}
              >
                {board.name}
              </div>
            </div>
          ) : (
            <div className={styles.board_name}>
              <textarea
                className={styles.board_textarea}
                placeholder={board.name}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                  setBoardName(e.target.value);
                }}
                onKeyPress={(e: React.KeyboardEvent) => onKeySubmit(e)}
              />

              <div
                className={styles.board_cancel_btn}
                onClick={() => setOpen(!open)}
              >
                ×
              </div>
            </div>
          )}
          <div className={styles.boardMenu} onClick={() => setIsOpen(!isOpen)}>
            ボードメニュー
          </div>
          <DeleteBoardModal
            boardId={props.boardId}
            isOpen={isOpen}
            onClickOpen={onClickOpen}
          />
        </div>
      )}

      {mq.isMobile && (
        <div className={styles.contents}>
          {open ? (
            <div className={styles.board_name}>
              <div
                onClick={() => setOpen(!open)}
                className={styles.board_name_title}
              >
                {board.name}
              </div>
            </div>
          ) : (
            <div className={styles.board_name}>
              <textarea
                className={styles.board_textarea}
                placeholder={board.name}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                  setBoardName(e.target.value);
                }}
                onKeyPress={(e: React.KeyboardEvent) => onKeySubmit(e)}
              />

              <div
                className={styles.board_cancel_btn}
                onClick={() => setOpen(!open)}
              >
                ×
              </div>
            </div>
          )}

          <AssignmentIcon
            className={styles.boardMenuIcon}
            onClick={() => setIsOpen(!isOpen)}
            style={{ fontSize: "30px" }}
          />

          <DeleteBoardModal
            boardId={props.boardId}
            isOpen={isOpen}
            onClickOpen={onClickOpen}
          />
        </div>
      )}
    </>
  );
};
