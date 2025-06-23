import { DashBoardLayout } from "src/layouts/dashboard.layout";
import { NotFound } from "src/pages/404";
import { BookedGround } from "src/pages/booking/booked.ground";
import { Dashboard } from "src/pages/dashboard/dashboard";
import { Profile } from "src/pages/profile";

export const privateRotues = [
  {
    name: "mainlayout",
    path: "/",
    element: <DashBoardLayout />,
    children: [
      {
        name: "dashboard",
        path: "",
        element: <Dashboard />,
      },
      {
        name: "profile",
        path: "/profile",
        element: <Profile />,
      },
      {
        name: "Booked_Ground",
        path: "/Booked_Ground",
        element: <BookedGround />,
      },
      {
        name: "*",
        path: "",
        element: <NotFound />,
      },
    ],
  },
];
