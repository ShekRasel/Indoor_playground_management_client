import { Login } from "src/pages/auth/customer/login";
import { MainLayout } from "../layouts/main.layout";
import { NotFound } from "../pages/404";
import { About } from "../pages/about";
import { Home } from "../pages/home";
import { SignUP } from "src/pages/auth/customer/signup";
import { Contact } from "src/pages/contact";
import { SignUp } from "src/pages/auth/staff/signup";
import { LogIn } from "src/pages/auth/staff/login";

export const commonRoutes = [
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
        element: <SignUP />,
      },
      {
        name: "staff_login",
        path: "/staff_login",
        element: <LogIn />,
      },
       {
        name: "staff_signup",
        path: "/staff_signup",
        element: <SignUp />,
      },
      {
        name: "contact",
        path: "/contact",
        element: <Contact />,
      },
      {
        name: "*",
        path: "",
        element: <NotFound />,
      },
    ],
  },
];
