import { MainLayout } from "../layouts/public.layout";
import { NotFound } from "../pages/404";
import { About } from "../pages/about";
import { Home } from "../pages/home";
import { Contact } from "src/pages/contact";
import { StaffLogIn } from "src/pages/auth/staff/staff.login";
import { BookedIndoor } from "src/pages/booking/booked.indoor";
import { Login } from "src/pages/auth/customer/login";
import { SignUp } from "src/pages/auth/customer/signup";
import { Playareas } from "src/pages/playareas";

export const publicRoutes = [
  {
    name: "Mainlayout",
    path: "/",
    element: <MainLayout />,
    children: [
      {
        name: "Home",
        path: "",
        element: <Home />,
      },
      {
        name: "About",
        path: "about",
        element: <About />,
      },
      {
        name: "Customer Login",
        path: "login",
        element: <Login />,
      },
      {
        name: "Customer Signup",
        path: "signup",
        element: <SignUp />,
      },
      {
        name: "Staff Login",
        path: "staff_login",
        element: <StaffLogIn />,
      },
      {
        name: "Contact",
        path: "contact",
        element: <Contact />,
      },
      {
        name: "Playareas",
        path: "playareas",
        element: <Playareas />,
      },
      {
        name: "Book Details",
        path: "book_details/:slug",
        element: <BookedIndoor />,
      },
      {
        name: "not_found",
        path: "*",
        element: <NotFound />,
      },
    ],
  },
];
