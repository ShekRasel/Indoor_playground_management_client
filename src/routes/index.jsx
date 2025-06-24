import { getToken, getUser } from "src/utils/helper";
import { publicRoutes } from "./public.routes";
import { customerRoutes } from "./customer.routes";
import { adminRoutes } from "./admin.routes";
import { staffRoutes } from "./staff.routes";

export const appRoutes = () => {
  const token = getToken();
  const user = getUser();

  if (!token || !user) {
    return publicRoutes;
  }

  if (!user.role) {
    return customerRoutes;
  }

  if (user.roleId === 101) {
    return adminRoutes;
  }
  return staffRoutes;
};
