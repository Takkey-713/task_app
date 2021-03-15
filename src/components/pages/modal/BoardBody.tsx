import React, { useState, useContext } from "react";
import { BoardRequest } from "../../requests/BoardRequest";
import { BoardType } from "../../interfaces/interface";
import styles from "./style/BoardBody.module.css";
import CloseIcon from "@material-ui/icons/Close";
import { DataContext } from "../../../App";

interface Props {
  isOpen: boolean;
  handleOnBoardModalClose: () => void;
}

export const BoardBody: React.FC<Props> = (props) => {
  const { data, dispatch } = useContext(DataContext);
  const [boardName, setBoardName] = useState<string>("");

  const onClickCloseIcon = () => {
    props.handleOnBoardModalClose();
  };

  const onClickSubmit = async () => {
    const requestData = {
      name: boardName,
    };
    try {
      const boards: BoardType[] = await BoardRequest("createBoards", {
        data: requestData,
      });
      props.handleOnBoardModalClose();
      dispatch({ type: "boardsUpdate", payload: { board: boards } });
    } catch (err) {
      alert("通信に失敗しました。");
    }
  };

  return (
    <div className={styles.modal_body}>
      <div className={styles.textfield}>
        <textarea
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
            setBoardName(e.target.value);
          }}
          className={styles.board_textarea}
          placeholder="ボードタイトルを追加..."
        />
        <CloseIcon
          style={{
            cursor: "pointer",
            fontSize: "14px",
            marginLeft: "5px",
          }}
          onClick={() => onClickCloseIcon()}
        />
      </div>
      <input
        className={styles.input_submit}
        type="button"
        value={"ボードを追加する"}
        onClick={() => onClickSubmit()}
      />
    </div>
  );
};
