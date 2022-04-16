import { Backdrop, Button, Card, useTheme } from "haki-ui";
import { useNavigate } from "react-router-dom";

const EditProduct = () => {
  const { colors } = useTheme();
  const navigate = useNavigate();

  return (
    <Backdrop blur={2} show>
      <Card
        variant="elevated"
        style={{
          backgroundColor: colors.primary.contrastText,
          width: "90%",
        }}
      >
        EditProduct ...
        <Button
          color="danger"
          onClick={() => navigate("/admin-dashboard/manage-products")}
          variant="ghost"
        >
          cancel
        </Button>
      </Card>
    </Backdrop>
  );
};

export default EditProduct;
