export interface Status {
  handleOnChangeStatus: () => void;
  isLogin: boolean;
}

export interface BoardType {
  id: number;
  name: string;
}

export interface TaskType {
  id?: number;
  name: string;
  explanation?: string;
  deadline_date?: string;
  list_id: number;
  // board_id: number;
}

export interface UserType {
  id?: number;
  email: string;
}

export interface ListType {
  id: number;
  name: string;
  // board_id: number;
}
