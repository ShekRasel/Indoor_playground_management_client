import { StaffDashboardLayout } from "src/layouts/staff.dashboard.layout";
import { StaffDashboard } from "src/pages/dashboard/staff.dashboard";

export const staffRoutes = [
  {
    name: "staff_dashboard",
    path: "/staff/dashboard",
    element: <StaffDashboardLayout />,
    children: [
      {
        name: "",
        path: "",
        element: <StaffDashboard />,
      },
    ],
  },
];
