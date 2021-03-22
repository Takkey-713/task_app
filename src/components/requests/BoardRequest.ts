import axios from "axios";
import { BoardType, SelectBoardType } from "../interfaces/interface";
import { url } from "../common";
type action =
  | "fetchBoards"
  | "createBoard"
  | "updateBoard"
  | "deleteBoard"
  | "selectBoard";
type parameter = { data: BoardType | SelectBoardType };

const option = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? `${url.production}/boards`
      : `${url.development}/boards`,
  responseType: "json",
  withCredentials: true,
  headers: { "X-Requested-With": "XMLHttpRequest" },
});

export const BoardRequest: (action: action, data?: parameter) => any = async (
  action: action,
  parameter?: parameter
) => {
  if (parameter) {
    switch (action) {
      case "createBoard":
        const createBoards = await option.post("/", parameter.data);
        return createBoards.data;
      case "updateBoard":
        const updateBoards = await option.patch(
          `/${parameter.data.id}`,
          parameter.data
        );
        return updateBoards.data;
      case "deleteBoard":
        const deleteTasks = await option.delete(`/${parameter.data.id}`);
        return deleteTasks.data;
      case "selectBoard":
        const selectBoard = await option.get(`/${parameter.data.id}/select`);
        return selectBoard;
      default:
        return null;
    }
  } else {
    switch (action) {
      case "fetchBoards":
        const fetchBoards = await option.get("/");
        return fetchBoards.data;
      default:
        return null;
    }
  }
};
