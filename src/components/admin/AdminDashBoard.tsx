import Layout from "components/core/Layout";
import { useAuth } from "contexts/auth-context";
import { Button, Card, Text, useTheme } from "haki-ui";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { adminNavItems } from "../user/fixtures/adminNavItems";
import { getButtonStyles, isSelected } from "../user/helper";
import { AdminNavbar, AdminProfileContainer } from "../user/styles";

const AdminDashBoard = () => {
  const theme = useTheme();

  const location = useLocation();
  const navigate = useNavigate();

  const { userInfo } = useAuth();

  return (
    <Layout
      description="manage all your products here"
      title="Welcome to Admin Dashboard"
    >
      <Card>
        <AdminNavbar>
          {adminNavItems.map(({ pathName, title }) => (
            <Button
              key={pathName}
              onClick={() => navigate(pathName)}
              style={getButtonStyles(isSelected(location, pathName), theme)}
              variant="ghost"
            >
              {title}
            </Button>
          ))}
        </AdminNavbar>

        {location.pathname === "/admin-dashboard" && (
          <AdminProfileContainer>
            <div>
              <Text as="span" weight="semi-bold">
                name:{" "}
              </Text>
              <Text as="span">{userInfo?.user.name}</Text>
            </div>

            <div>
              <Text as="span" weight="semi-bold">
                email:{" "}
              </Text>
              <Text as="span">{userInfo?.user.email}</Text>
            </div>
          </AdminProfileContainer>
        )}
        <Outlet />
      </Card>
    </Layout>
  );
};

export default AdminDashBoard;
