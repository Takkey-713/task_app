import React, { useState, useContext } from "react";
import Modal from "react-modal";
import { DataContext } from "../../../App";
import { BoardRequest } from "../../requests/BoardRequest";

import { useMediaQuery } from "../../hooks/useMediaQuery";
import styles from "./style/DeleteBoardModal.module.css";
import CloseIcon from "@material-ui/icons/Close";

interface Props {
  boardId: number;
  isOpen: boolean;
  onClickOpen: () => void;
}

const pcStyles = {
  overlay: {
    backgroundColor: "transparent",
  },
  content: {
    top: "44px",
    left: "35vw",
    right: "35vw",
    height: "100px",
    width: "30vw",
    padding: "10px",
  },
};

const mobileStyles = {
  overlay: {
    backgroundColor: "transparent",
  },
  content: {
    top: "44px",
    left: "7vw",
    right: "7vw",
    height: "100px",
    width: "80vw",
    padding: "10px",
  },
};

export const DeleteBoardModal: React.FC<Props> = (props) => {
  const mq = useMediaQuery();
  const { dispatch } = useContext(DataContext);

  const boardDelete = async () => {
    const requestData = {
      id: props.boardId,
    };
    try {
      const boards = await BoardRequest("deleteBoard", { data: requestData });
      dispatch({ type: "boardsUpdate", payload: { board: boards } });
    } catch {
      alert("通信に失敗しました。");
    }
    window.location.pathname = "/";
  };
  return (
    <>
      {mq.isPc && (
        <Modal
          isOpen={props.isOpen}
          onRequestClose={props.onClickOpen}
          style={pcStyles}
        >
          <div className={styles.isShown}>
            <div className={styles.contents}>
              <div className={styles.deleteHeader}>
                <span>ボードをアーカイブしますか？</span>
                <CloseIcon
                  className={styles.closeIcon}
                  onClick={() => props.onClickOpen()}
                />
              </div>
              <div className={styles.deleteMain}>
                <div>
                  <input
                    className={styles.input_delete}
                    value="アーカイブ"
                    type="submit"
                    onClick={() => boardDelete()}
                  ></input>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}
      {mq.isMobile && (
        <Modal
          isOpen={props.isOpen}
          onRequestClose={props.onClickOpen}
          style={mobileStyles}
        >
          <div className={styles.isShown}>
            <div className={styles.contents}>
              <div className={styles.deleteHeader}>
                <span>ボードをアーカイブしますか？</span>
                <CloseIcon
                  className={styles.closeIcon}
                  onClick={() => props.onClickOpen()}
                />
              </div>
              <div className={styles.deleteMain}>
                <div>
                  <input
                    className={styles.input_delete}
                    value="アーカイブ"
                    type="submit"
                    onClick={() => boardDelete()}
                  ></input>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};
