import { AdminDashboardLayout } from "src/layouts/admin.dashboard.layout";
import { AdminDashboard } from "src/pages/dashboard/admin/admin.dashboard";
import { Customer } from "src/pages/dashboard/admin/customer";
import { Profile } from "src/pages/dashboard/admin/profile";
import { Roles } from "src/pages/dashboard/admin/roles";
import { Staff } from "src/pages/dashboard/admin/staff";

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
      {
        name: "admin_customers",
        path: "customers",
        element: <Customer />,
      },
      {
        name: "admin_staff",
        path: "staff",
        element: <Staff />,
      },
      {
        name: "admin_profile",
        path: "profile",
        element: <Profile />,
      },
      {
        name: "admin_profile",
        path: "roles",
        element: <Roles />,
      },
    ],
  },
];
