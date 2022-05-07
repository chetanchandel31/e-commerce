import useEndpoint from "api/useEndpoint";
import { Button, CircularProgress, H4, Text } from "haki-ui";
import { useEffect, useState } from "react";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Product } from "shared-types";
import { StyledManageProductsContainer } from "./styles";
import { ItemToBeDeleted } from "./types";
import DeleteItemModal from "./helper/DeleteItemModal";

type RouterState = {
  reloadProductsList?: boolean;
};

const ManageProducts = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const routerState = location.state as RouterState;

  const [productToBeDeleted, setProductToBeDeleted] =
    useState<ItemToBeDeleted | null>(null);

  const { error, isLoading, makeRequest, result } = useEndpoint<
    undefined,
    Product[]
  >({
    endpoint: "/products",
    preLoadResult: true,
  });

  useEffect(() => {
    if (routerState?.reloadProductsList) makeRequest(undefined);
  }, [routerState?.reloadProductsList]);

  return (
    <StyledManageProductsContainer>
      {error && <Text color="danger">{error}</Text>}

      {isLoading && <CircularProgress style={{ margin: "2rem auto" }} />}

      {!isLoading && result?.length === 0 && (
        <div className="empty-state-container">
          <Text>you have no products yet 🎐</Text>{" "}
          <Button onClick={() => navigate("/admin-dashboard/create-product")}>
            Create a product
          </Button>
        </div>
      )}

      {!isLoading && result && result?.length > 0 && (
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
                  onClick={() => setProductToBeDeleted({ name, id: _id })}
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

      {productToBeDeleted !== null && (
        <DeleteItemModal
          itemToBeDeleted={productToBeDeleted}
          reloadList={makeRequest}
          setItemToBeDeleted={setProductToBeDeleted}
        />
      )}
    </StyledManageProductsContainer>
  );
};

export default ManageProducts;
