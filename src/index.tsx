import { HakiProvider } from "haki-ui";
import ReactDOM from "react-dom";
import AppRoutes from "./routes";

ReactDOM.render(
  <HakiProvider>
    <AppRoutes />
  </HakiProvider>,
  document.getElementById("root")
);
