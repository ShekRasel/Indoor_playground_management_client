import { useRoutes } from "react-router-dom";
import { appRoutes } from "./routes";
const App = () => {
  const routes = useRoutes([...appRoutes()]);

  return <div className="container">{routes}</div>;
};

export default App;
