import axios from "axios";
import { ListType } from "../interfaces/interface";
import { url } from "../common";
type action = "fetchLists" | "createLists" | "updateLists" | "deleteLists";
type parameter = { data: ListType };

const option = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? `${url.production}/boards`
      : `${url.development}/boards`,
  responseType: "json",
  withCredentials: true,
  headers: { "X-Requested-With": "XMLHttpRequest" },
});

export const ListRequest: (action: action, data?: parameter) => any = async (
  action: action,
  parameter?: parameter
) => {
  if (parameter) {
    switch (action) {
      case "createLists":
        const createLists = await option.post("/", parameter.data);
        return createLists.data;
      case "updateLists":
        const updateLists = await option.patch(
          `/${parameter.data.id}`,
          parameter.data
        );
        return updateLists.data;
      case "deleteLists":
        const deleteLists = await option.delete(`/${parameter.data.id}`);
        return deleteLists.data;
      default:
        return null;
    }
  } else {
    switch (action) {
      case "fetchLists":
        const fetchLists = await option.get("/");
        return fetchLists.data;
      default:
        return null;
    }
  }
};
