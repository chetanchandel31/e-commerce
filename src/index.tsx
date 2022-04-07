import AppRoutes from "./Routes";
import ReactDOM from "react-dom";
import { HakiProvider } from "haki-ui";
import { AuthProvider } from "contexts/auth-context";

ReactDOM.render(
  <HakiProvider>
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  </HakiProvider>,
  document.getElementById("root")
);
