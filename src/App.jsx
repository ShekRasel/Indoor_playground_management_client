import { useRoutes } from "react-router-dom";
import { commonRoutes } from "./routes/common.routes";
const App = () => {
  const routes = useRoutes(commonRoutes);

  return <div className="">{routes}</div>;
};

export default App;
