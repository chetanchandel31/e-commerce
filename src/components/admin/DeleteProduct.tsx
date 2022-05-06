import useEndpoint, { MakeRequestReturnType } from "api/useEndpoint";
import { useAuth } from "contexts/auth-context";
import { Backdrop, Button, Card, Text, useTheme } from "haki-ui";
import { Dispatch, SetStateAction } from "react";
import { Product } from "shared-types";
import {
  StyledDeleteModalBtnsContainer,
  StyledDeleteModalContainer,
} from "./styles";
import { ProductToBeDeleted } from "./types";

type DeleteProductResponse = {
  deletedProduct: Product;
  message: string;
};

type DeleteProductProps = {
  productToBeDeleted: ProductToBeDeleted;
  // eslint-disable-next-line no-unused-vars
  reloadProductsList: (reqBody: undefined) => Promise<MakeRequestReturnType>;
  setProductToBeDeleted: Dispatch<SetStateAction<ProductToBeDeleted>>;
};

const DeleteProduct = (props: DeleteProductProps) => {
  const { productToBeDeleted, reloadProductsList, setProductToBeDeleted } =
    props;

  const { colors } = useTheme();
  const { userInfo } = useAuth();

  const { error, isLoading, makeRequest } = useEndpoint<
    undefined,
    DeleteProductResponse
  >({
    endpoint: `/product/${productToBeDeleted?.productId}/${userInfo?.user._id}`,
    method: "DELETE",
  });

  const handleDelete = async () => {
    const res = await makeRequest(undefined);

    if (res.type === "success") {
      reloadProductsList(undefined);
      setProductToBeDeleted(null);
    }
  };

  return (
    <Backdrop blur={2} show style={{ position: "fixed" }}>
      <Card
        maxWidth={400}
        style={{ width: "90%", backgroundColor: colors.primary.contrastText }}
        variant="elevated"
      >
        <StyledDeleteModalContainer>
          <div>
            <Text as="span">Delete</Text>{" "}
            <Text as="span" weight="semi-bold">
              {productToBeDeleted?.name}
            </Text>
            ?
          </div>

          {error && <Text color="danger">{error}</Text>}

          <StyledDeleteModalBtnsContainer>
            <Button color="danger" isLoading={isLoading} onClick={handleDelete}>
              Delete
            </Button>
            <Button onClick={() => setProductToBeDeleted(null)} variant="ghost">
              cancel
            </Button>
          </StyledDeleteModalBtnsContainer>
        </StyledDeleteModalContainer>
      </Card>
    </Backdrop>
  );
};

export default DeleteProduct;
