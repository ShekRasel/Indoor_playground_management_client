import { StaffDashboardLayout } from "src/layouts/staff.dashboard.layout";
import { Profile } from "src/pages/dashboard/staff/profile";
import { StaffDashboard } from "src/pages/dashboard/staff/staff.dashboard";
import { Task } from "src/pages/dashboard/staff/task";
import { Work } from "src/pages/dashboard/staff/work";

export const staffRoutes = [
  {
    name: "staff_dashboard",
    path: "/staff/dashboard",
    element: <StaffDashboardLayout />,
    children: [
      {
        name: "main_board",
        path: "",
        element: <StaffDashboard />,
      },
      {
        name: "staff_work",
        path: "work",
        element: <Work />,
      },
      {
        name: "staff_work",
        path: "task",
        element: <Task />,
      },
      {
        name: "admin_profile",
        path: "profile",
        element: <Profile />,
      },
    ],
  },
];
