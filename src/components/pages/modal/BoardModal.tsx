import React, { useState, useContext } from "react";
import Modal from "react-modal";
import { BoardBody } from "./BoardBody";
import { BoardType } from "../../interfaces/interface";
import styles from "./style/boardModal.module.css";
import { useMediaQuery } from "../../hooks/useMediaQuery";

const forPcStyles = {
  overlay: {
    backgroundColor: "rgba(0,0,0,.64)",
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

const forMobileStyles = {
  overlay: {
    backgroundColor: "rgba(0,0,0,.64)",
  },
  content: {
    top: "44px",
    left: "15vw",
    right: "15vw",
    height: "110px",
    width: "70vw",
    padding: "10px",
  },
};

interface Props {
  isOpen: boolean;
  handleOnBoardModalClose: () => void;
}

Modal.setAppElement("#root");

export const BoardModal: React.FC<Props> = (props) => {
  const mq = useMediaQuery();

  return (
    <div>
      {mq.isPc && (
        <div>
          <Modal
            isOpen={props.isOpen}
            onRequestClose={props.handleOnBoardModalClose}
            style={forPcStyles}
          >
            <BoardBody
              isOpen={props.isOpen}
              handleOnBoardModalClose={props.handleOnBoardModalClose}
            />
          </Modal>
        </div>
      )}
      {mq.isMobile && (
        <div>
          <Modal
            isOpen={props.isOpen}
            onRequestClose={props.handleOnBoardModalClose}
            style={forMobileStyles}
          >
            <BoardBody
              isOpen={props.isOpen}
              handleOnBoardModalClose={props.handleOnBoardModalClose}
            />
          </Modal>
        </div>
      )}
    </div>
  );
};
