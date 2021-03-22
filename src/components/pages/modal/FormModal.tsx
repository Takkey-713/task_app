import React from "react";
import Modal from "react-modal";
import { TaskBody } from "./TaskBody";
import { TaskType, ListType } from "../../interfaces/interface";
import { useMediaQuery } from "../../hooks/useMediaQuery";

const PcStyles = {
  overlay: {
    backgroundColor: "rgba(0,0,0,.64)",
  },
  content: {
    top: "20vh",
    left: "35vw",
    right: "35vw",
    height: "63vh",
    width: "30vw",
    padding: "10px",
  },
};

const MobileStyles = {
  overlay: {
    backgroundColor: "rgba(0,0,0,.64)",
  },
  content: {
    top: "10vh",
    left: "5vw",
    right: "5vw",
    height: "82vh",
    width: "90vw",
    padding: "0",
  },
};

interface Props {
  handleClose: () => void;
  isOpen: boolean;
  task?: TaskType;
  list: ListType;
  boardId: number;
}

export const FormModal = (props: Props) => {
  Modal.setAppElement("#root");
  const mq = useMediaQuery();

  return (
    <div>
      {mq.isPc && (
        <Modal
          isOpen={props.isOpen}
          onRequestClose={props.handleClose}
          style={PcStyles}
        >
          {props.task ? (
            <TaskBody
              task={props.task}
              handleOnClose={props.handleClose}
              list={props.list}
              boardId={props.boardId}
            />
          ) : (
            <TaskBody
              handleOnClose={props.handleClose}
              list={props.list}
              boardId={props.boardId}
            />
          )}
        </Modal>
      )}

      {mq.isMobile && (
        <Modal
          isOpen={props.isOpen}
          onRequestClose={props.handleClose}
          style={MobileStyles}
        >
          {props.task ? (
            <TaskBody
              task={props.task}
              handleOnClose={props.handleClose}
              list={props.list}
              boardId={props.boardId}
            />
          ) : (
            <TaskBody
              handleOnClose={props.handleClose}
              list={props.list}
              boardId={props.boardId}
            />
          )}
        </Modal>
      )}
    </div>
  );
};

export default FormModal;
