import { BoardType } from "../../components/interfaces/interface";

export const guardRender = (boards: BoardType[], boardId: number) => {
  const result = boards.some((board) => {
    return board.id === boardId;
  });
  return result;
};
