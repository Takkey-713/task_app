import React from "react";
import Modal from "react-modal";
import { TaskBody } from "./TaskBody";
import { BoardType, TaskType, ListType } from "../../interfaces/interface";
import { useMediaQuery } from "../../hooks/useMediaQuery";

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
          style={forPcStyles}
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
          style={forMobileStyles}
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
