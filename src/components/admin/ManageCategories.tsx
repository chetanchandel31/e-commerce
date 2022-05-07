import useEndpoint from "api/useEndpoint";
import { Button, Text } from "haki-ui";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { Category } from "shared-types";
import { StyledManagecategoriesContaier } from "./styles";

const ManageCategories = () => {
  const { result } = useEndpoint<undefined, Category[]>({
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
            size="sm"
            startIcon={<RiDeleteBin6Fill />}
            variant="ghost"
          >
            delete
          </Button>
        </div>
      ))}

      <pre>{JSON.stringify(result, null, 2)}</pre>
    </StyledManagecategoriesContaier>
  );
};

export default ManageCategories;
