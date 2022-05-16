import useEndpoint from "api/useEndpoint";
import { Button, CircularProgress, Text } from "haki-ui";
import { useState } from "react";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { Category } from "shared-types";
import DeleteItemModal from "./helper/DeleteItemModal";
import EditCategoryInput from "./helper/EditCategoryInput";
import { StyledManagecategoriesContaier } from "./styles";
import { CategoryToBeEdited, ItemToBeDeleted } from "./types";

const ManageCategories = () => {
  const navigate = useNavigate();

  const [categoryToBeDeleted, setCategoryToBeDeleted] =
    useState<ItemToBeDeleted | null>(null);

  const [categoryToBeEdited, setCategoryToBeEdited] =
    useState<CategoryToBeEdited | null>(null);

  const { error, isLoading, makeRequest, result } = useEndpoint<
    undefined,
    Category[]
  >({
    endpoint: "/categories",
    preLoadResult: true,
  });

  return (
    <StyledManagecategoriesContaier>
      {error && <Text color="danger">{error}</Text>}

      {isLoading && (
        <CircularProgress size={70} style={{ margin: "2rem auto" }} />
      )}

      {!isLoading && result?.length === 0 && (
        <div className="empty-state-container">
          <Text>you have no categories yet 🎐</Text>{" "}
          <Button onClick={() => navigate("/admin-dashboard/create-category")}>
            Create a category
          </Button>
        </div>
      )}

      {!isLoading &&
        result?.map(({ _id, name }, i) => (
          <div className="category-list-item" key={_id}>
            <div className="category-name">
              {categoryToBeEdited?.id === _id ? (
                <span className="edit-category-input-container">
                  {i + 1}.{" "}
                  <EditCategoryInput
                    cancelEdit={() => setCategoryToBeEdited(null)}
                    categoryToBeEdited={categoryToBeEdited}
                    reloadCategoriesList={makeRequest}
                  />
                </span>
              ) : (
                <Text>
                  {i + 1}. {name}
                </Text>
              )}
            </div>

            <Button
              onClick={() => setCategoryToBeEdited({ id: _id, name })}
              size="sm"
              startIcon={<MdEdit />}
              variant="ghost"
            >
              edit
            </Button>

            <Button
              color="danger"
              onClick={() => setCategoryToBeDeleted({ id: _id, name })}
              size="sm"
              startIcon={<RiDeleteBin6Fill />}
              variant="ghost"
            >
              delete
            </Button>
          </div>
        ))}

      {categoryToBeDeleted !== null && (
        <DeleteItemModal
          isItemCategory
          itemToBeDeleted={categoryToBeDeleted}
          reloadList={makeRequest}
          setItemToBeDeleted={setCategoryToBeDeleted}
        />
      )}
    </StyledManagecategoriesContaier>
  );
};

export default ManageCategories;
