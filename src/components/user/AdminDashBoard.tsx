import Layout from "components/core/Layout";
import { Button, Card, useTheme } from "haki-ui";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { adminNavItems } from "./fixtures/adminNavItems";
import { getButtonStyles, isSelected } from "./helper";
import { AdminNavbar } from "./styles";

const AdminDashBoard = () => {
  const theme = useTheme();

  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Layout
      description="manage all your products here"
      title="Welcome to Admin Dashboard"
    >
      <Card>
        <AdminNavbar>
          {adminNavItems.map(({ pathName, title }) => (
            <Button
              onClick={() => navigate(pathName)}
              style={getButtonStyles(isSelected(location, pathName), theme)}
              variant="ghost"
            >
              {title}
            </Button>
          ))}
        </AdminNavbar>

        <Outlet />
      </Card>
    </Layout>
  );
};

export default AdminDashBoard;
