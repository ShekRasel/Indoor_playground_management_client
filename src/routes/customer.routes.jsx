import { DashBoardLayout } from "src/layouts/customer.dashboard.layout";
import { NotFound } from "src/pages/404";
import { About } from "src/pages/about";
import { BookedIndoor } from "src/pages/booking/booked.indoor";
import { TotalBooked } from "src/pages/booking/total.booked";
import { Contact } from "src/pages/contact";
// import { BookedIndoor } from "src/pages/booking/booked.indoor";
import { Home } from "src/pages/home";
import { Playareas } from "src/pages/playareas";
import { Profile } from "src/pages/profile";

export const customerRoutes = [
  {
    name: "mainlayout",
    path: "/",
    element: <DashBoardLayout />,
    children: [
      {
        name: "home",
        path: "",
        element: <Home />,
      },
      {
        name: "about",
        path: "/dashboard/about",
        element: <About />,
      },
      {
        name: "profile",
        path: "/dashboard/profile",
        element: <Profile />,
      },
      {
        name: "contact",
        path: "/dashboard/contact",
        element: <Contact />,
      },
      {
        name: "playareas",
        path: "/dashboard/playareas",
        element: <Playareas />,
      },
      {
        name: "book_details",
        path: "/book_details/:slug",
        element: <BookedIndoor />,
      },
      {
        name: "total_booked",
        path: "/dashboard/total_booked",
        element: <TotalBooked />,
      },
      {
        name: "*",
        path: "",
        element: <NotFound />,
      },
    ],
  },
];
