import { getToken } from "src/utils/helper";
import { privateRotues } from "./private.routes";
import { commonRoutes } from "./common.routes";

export const appRoutes = () => {
  const token = getToken();
  if (token) {
    return privateRotues;
  } else {
    return commonRoutes;
  }
};
