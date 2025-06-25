import { useRoutes } from "react-router-dom";
import { appRoutes } from "./routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const App = () => {
  const routes = useRoutes([...appRoutes()]);

  return (
    <>
      <div className="">{routes}</div>
      <ToastContainer position="top-right" autoClose={3000} />;
    </>
  );
};

export default App;
