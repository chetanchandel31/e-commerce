import useEndpoint from "api/useEndpoint";
import { Button, CircularProgress, H4, Text } from "haki-ui";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { Outlet, useNavigate } from "react-router-dom";
import { Product } from "shared-types";
import { StyledManageProductsContainer } from "./styles";

const ManageProducts = () => {
  const navigate = useNavigate();

  const { error, isLoading, result } = useEndpoint<undefined, Product[]>({
    endpoint: "/products",
    preLoadResult: true,
  });

  return (
    <StyledManageProductsContainer>
      {error && <Text color="danger">{error}</Text>}

      {isLoading && <CircularProgress style={{ margin: "2rem auto" }} />}

      {result?.length === 0 && (
        <div className="loading-state-container">
          <Text>you have no products yet 🎐</Text>{" "}
          <Button onClick={() => navigate("/admin-dashboard/create-product")}>
            Create a product
          </Button>
        </div>
      )}

      {result && result?.length > 0 && (
        <>
          <H4>Total {result?.length} products</H4>
          <div className="product-list-container">
            {result?.map(({ _id, name }, i) => (
              <div className="product-list-item" key={_id}>
                <Text style={{ width: "30%" }}>
                  {i + 1}. {name}
                </Text>
                <Button
                  onClick={() =>
                    navigate(`/admin-dashboard/manage-products/${_id}`)
                  }
                  size="sm"
                  startIcon={<MdEdit />}
                  variant="ghost"
                >
                  edit
                </Button>
                <Button
                  color="danger"
                  size="sm"
                  startIcon={<RiDeleteBin6Fill />}
                  variant="ghost"
                >
                  delete
                </Button>
              </div>
            ))}
          </div>
        </>
      )}

      <Outlet />
    </StyledManageProductsContainer>
  );
};

export default ManageProducts;
