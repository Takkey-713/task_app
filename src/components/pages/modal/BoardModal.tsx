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
    height: "15vh",
    width: "30vw",
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

interface Props {
  isOpen: boolean;
  handleOnBoardModalClose: () => void;
}

Modal.setAppElement("#root");

export const BoardModal: React.FC<Props> = (props) => {
  const mq = useMediaQuery();

  return (
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
  );
};
