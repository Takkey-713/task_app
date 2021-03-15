import { ListType, TaskType } from "../interfaces/interface";

export const filterTasks = (tasks: TaskType[], boardId: number) => {
  const results = tasks.filter((task) => {
    return task.board_id === boardId;
  });
  return results;
};

export const filterLists = (lists: ListType[], boardId: number) => {
  const results = lists.filter((list) => {
    return list.board_id === boardId;
  });
  return results;
};
