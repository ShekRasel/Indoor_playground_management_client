import { MainLayout } from "../layouts/public.layout";
import { NotFound } from "../pages/404";
import { About } from "../pages/about";
import { Home } from "../pages/home";
import { Contact } from "src/pages/contact";
import { StaffLogIn } from "src/pages/auth/staff/staff.login";
import { BookedIndoor } from "src/pages/booking/booked.indoor";
import { Login } from "src/pages/auth/customer/login";
import { SignUp } from "src/pages/auth/customer/signup";

export const publicRoutes = [
  {
    name: "mainlayout",
    path: "/",
    element: <MainLayout />,
    children: [
      {
        name: "home",
        path: "",
        element: <Home />,
      },
      {
        name: "about",
        path: "/about",
        element: <About />,
      },
      {
        name: "customer_login",
        path: "/login",
        element: <Login />,
      },
      {
        name: "customer_signup",
        path: "/signup",
        element: <SignUp />,
      },
      {
        name: "staff_login",
        path: "/staff_login",
        element: <StaffLogIn />,
      },
      {
        name: "contact",
        path: "/contact",
        element: <Contact />,
      },
      {
        name: "book_details",
        path: "/book_details/:slug",
        element: <BookedIndoor />,
      },
      {
        name: "*",
        path: "",
        element: <NotFound />,
      },
    ],
  },
];
