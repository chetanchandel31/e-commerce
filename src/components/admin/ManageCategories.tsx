import useEndpoint from "api/useEndpoint";
import { Button, Text } from "haki-ui";
import { useState } from "react";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { Category } from "shared-types";
import { StyledManagecategoriesContaier } from "./styles";
import { ItemToBeDeleted } from "./types";
import DeleteItemModal from "./types/DeleteItemModal";

const ManageCategories = () => {
  const [categoryToBeDeleted, setCategoryToBeDeleted] =
    useState<ItemToBeDeleted | null>(null);

  const { makeRequest, result } = useEndpoint<undefined, Category[]>({
    endpoint: "/categories",
    preLoadResult: true,
  });

  // TODO: empty state
  // loading state
  // error

  return (
    <StyledManagecategoriesContaier>
      {result?.map(({ _id, name }, i) => (
        <div className="category-list-item" key={_id}>
          <Text style={{ width: "30%" }}>
            {i + 1}. {name}
          </Text>

          <Button size="sm" startIcon={<MdEdit />} variant="ghost">
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
