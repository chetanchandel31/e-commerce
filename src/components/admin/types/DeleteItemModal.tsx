import useEndpoint, { MakeRequestReturnType } from "api/useEndpoint";
import { useAuth } from "contexts/auth-context";
import { Backdrop, Button, Card, Text, useTheme } from "haki-ui";
import { Dispatch, SetStateAction } from "react";
import { Category, Product } from "shared-types";
import { ItemToBeDeleted } from ".";
import {
  StyledDeleteModalBtnsContainer,
  StyledDeleteModalContainer,
} from "../styles";

type DeleteProductResponse = {
  deletedProduct: Product;
  message: string;
};

type DeleteCategoryResponse = {
  deletedCategory: Category;
  message: string;
};

type DeleteItemProps = {
  isItemCategory?: boolean;
  itemToBeDeleted: ItemToBeDeleted;
  // eslint-disable-next-line no-unused-vars
  reloadList: (reqBody: undefined) => Promise<MakeRequestReturnType>;
  setItemToBeDeleted: Dispatch<SetStateAction<ItemToBeDeleted>>;
};

const DeleteItemModal = (props: DeleteItemProps) => {
  const { isItemCategory, itemToBeDeleted, reloadList, setItemToBeDeleted } =
    props;

  const { colors } = useTheme();
  const { userInfo } = useAuth();

  const endpoint = isItemCategory
    ? `/category/${itemToBeDeleted?.id}/${userInfo?.user._id}`
    : `/product/${itemToBeDeleted?.id}/${userInfo?.user._id}`;

  const { error, isLoading, makeRequest } = useEndpoint<
    undefined,
    DeleteProductResponse | DeleteCategoryResponse
  >({
    endpoint,
    method: "DELETE",
  });

  const handleDelete = async () => {
    const res = await makeRequest(undefined);

    if (res.type === "success") {
      reloadList(undefined);
      setItemToBeDeleted(null);
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
              {itemToBeDeleted?.name}
            </Text>
            ?
          </div>

          {error && <Text color="danger">{error}</Text>}

          <StyledDeleteModalBtnsContainer>
            <Button color="danger" isLoading={isLoading} onClick={handleDelete}>
              Delete
            </Button>
            <Button
              isLoading={isLoading}
              onClick={() => setItemToBeDeleted(null)}
              variant="ghost"
            >
              Cancel
            </Button>
          </StyledDeleteModalBtnsContainer>
        </StyledDeleteModalContainer>
      </Card>
    </Backdrop>
  );
};

export default DeleteItemModal;
