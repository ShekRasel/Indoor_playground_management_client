import { MainLayout } from "../layouts/main.layout";
import { NotFound } from "../pages/404";
import { About } from "../pages/about";
import { Home } from "../pages/home";

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
        name: "*",
        path: "",
        element: <NotFound />,
      },
    ],
  },
];
