import { useReducer } from "react";
import { TaskType, BoardType, ListType } from "../interfaces/interface";

export type Data = {
  tasks: TaskType[];
  boards: BoardType[];
  lists: ListType[];
};

export type dataAction = {
  type: "tasksUpdate" | "listsUpdate" | "boardsUpdate";
  payload: { task?: TaskType[]; list?: ListType[]; board?: BoardType[] };
};

export const useDataReducer = (): [
  Data,
  ({ type, payload }: dataAction) => void
] => {
  const initialData: Data = {
    tasks: [
      {
        id: 0,
        name: "",
        explanation: "",
        deadline_date: "",
        list_id: 0,
        board_id: 0,
      },
    ],
    lists: [{ id: 0, name: "", board_id: 0 }],
    boards: [{ id: 0, name: "" }],
  };

  const reducer = (state: Data, action: dataAction) => {
    switch (action.type) {
      case "tasksUpdate":
        return { ...state, tasks: action.payload.task || state.tasks };
      case "listsUpdate":
        return { ...state, lists: action.payload.list || state.lists };
      case "boardsUpdate":
        return { ...state, boards: action.payload.board || state.boards };
    }
  };
  const [data, dispatch] = useReducer(reducer, initialData);
  return [data, dispatch];
};
