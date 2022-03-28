import AppRoutes from "./Routes";
import ReactDOM from "react-dom";
import { HakiProvider } from "haki-ui";

ReactDOM.render(
  <HakiProvider>
    <AppRoutes />
  </HakiProvider>,
  document.getElementById("root")
);
