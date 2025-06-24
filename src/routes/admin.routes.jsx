import { AdminDashboardLayout } from "src/layouts/admin.dashboard.layout";
import { AdminDashboard } from "src/pages/dashboard/admin.dashboard";

export const adminRoutes = [
  {
    name: "admin_dashboard",
    path: "/admin/dashboard",
    element: <AdminDashboardLayout />,
    children: [
      {
        name: "",
        path: "",
        element: <AdminDashboard />,
      },
    ],
  },
];
