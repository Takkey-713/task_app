import React, { useState, useContext } from "react";
import { BoardType } from "../../interfaces/interface";
import styles from "./Board.module.css";
import { BoardModal } from "../modal/BoardModal";
import { DataContext } from "../../../App";
import { Link } from "react-router-dom";

interface Props {
  board: BoardType;
}

export const Board: React.FC<Props> = (props) => {
  const { data } = useContext(DataContext);
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
        <div className={styles.board_list}>
          {data.boards &&
            data.boards.map((ele) => {
              return (
                <Link
                  to={"/main/" + ele.id}
                  className={styles.board_link}
                  key={ele.id}
                  // onClick={(e: React.MouseEvent) =>
                  //   onCLickBoadrd(e.targert.value)
                  // }
                >
                  {ele.name}
                </Link>
              );
            })}
        </div>
      </div>
      <BoardModal
        isOpen={isOpen}
        handleOnBoardModalClose={handleOnBoardModalClose}
      />
    </div>
  );
};
