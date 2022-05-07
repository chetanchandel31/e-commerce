import useEndpoint, { MakeRequestReturnType } from "api/useEndpoint";
import { useAuth } from "contexts/auth-context";
import { Button, Input, Text } from "haki-ui";
import { ChangeEvent, useState } from "react";
import { Category } from "shared-types";
import { StyledEditCategoryContainer } from "../styles";
import { CategoryToBeEdited, EditCategoriesRequest } from "../types";

type EditCategoryInputProps = {
  cancelEdit: () => void;
  categoryToBeEdited: CategoryToBeEdited;
  // eslint-disable-next-line no-unused-vars
  reloadCategoriesList: (reqBody: undefined) => Promise<MakeRequestReturnType>;
};

const EditCategoryInput = (props: EditCategoryInputProps) => {
  const { cancelEdit, categoryToBeEdited, reloadCategoriesList } = props;

  const { userInfo } = useAuth();

  const [newCategoryName, setNewCategoryName] = useState(
    categoryToBeEdited.name || ""
  );

  const { error, isLoading, makeRequest } = useEndpoint<
    EditCategoriesRequest,
    Category
  >({
    endpoint: `/category/${categoryToBeEdited.id}/${userInfo?.user._id}`,
    method: "PUT",
  });

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) =>
    setNewCategoryName(target.value);

  const onSave = async () => {
    const res = await makeRequest({
      name: newCategoryName,
    });

    if (res.type === "success") {
      reloadCategoriesList(undefined);
      cancelEdit();
    }
  };

  const doDisableEdit =
    newCategoryName === categoryToBeEdited.name || !newCategoryName;

  return (
    <StyledEditCategoryContainer>
      <Input
        autoFocus
        error={Boolean(error)}
        disabled={isLoading}
        onChange={handleChange}
        onKeyDown={(e) => e.key === "Enter" && !doDisableEdit && onSave()}
        value={newCategoryName}
      />

      {error && (
        <Text color="danger" variant="caption">
          {error}
        </Text>
      )}

      <div className="edit-category-btns">
        <Button
          disabled={doDisableEdit}
          isLoading={isLoading}
          onClick={onSave}
          size="sm"
          variant="ghost"
        >
          save
        </Button>
        <Button
          color="danger"
          disabled={isLoading}
          onClick={cancelEdit}
          size="sm"
          variant="ghost"
        >
          cancel
        </Button>
      </div>
    </StyledEditCategoryContainer>
  );
};

export default EditCategoryInput;
