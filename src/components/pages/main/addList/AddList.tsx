import React, { useState, useContext } from "react";
import { DataContext } from "../../../../App";
import styles from "./AddList.module.css";
import { ListRequest } from "../../../requests/ListRequest";
import { BoardType, ListType } from "../../../interfaces/interface";

interface Props {
  boardId: number;
}

export const AddList: React.FC<Props> = (props) => {
  const [listDisplay, setListDisplay] = useState(true);
  const [name, setName] = useState("");
  const { data, dispatch } = useContext(DataContext);

  const newData: ListType = {
    id: 0,
    name: name,
    board_id: Number(props.boardId),
  };

  const onClickSubmit = async () => {
    try {
      const lists: ListType[] = await ListRequest("createLists", {
        data: newData,
      });
      dispatch({ type: "listsUpdate", payload: { list: lists } });
      setListDisplay(!listDisplay);
    } catch (err) {
      alert("通信に失敗しました。");
    }
    setName("");
  };

  return (
    <>
      {listDisplay ? (
        <div
          className={styles.add_list}
          onClick={() => setListDisplay(!listDisplay)}
        >
          <div>
            <span>+</span> <span>リストを追加する</span>
          </div>
        </div>
      ) : (
        <div className={styles.add_list_form}>
          <textarea
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
              setName(e.target.value);
            }}
            className={styles.list_textarea}
            placeholder="リストのタイトルを入力..."
          />
          <div className={styles.add_submit_form}>
            <input
              type="submit"
              className={styles.add_list_submit}
              value="リストを追加"
              onClick={onClickSubmit}
            />
            <div
              className={styles.cancel_icon}
              onClick={() => setListDisplay(!listDisplay)}
            >
              ×
            </div>
          </div>
        </div>
      )}
    </>
  );
};
