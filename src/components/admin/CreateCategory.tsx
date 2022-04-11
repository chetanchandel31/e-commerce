import useEndpoint from "api/useEndpoint";
import { useAuth } from "contexts/auth-context";
import { Button, Input, Text } from "haki-ui";
import { FormEvent, useState } from "react";
import { StyledCreateCategoryForm } from "./styles";
import { CreateCategoryRequest, CreateCategoryResponse } from "./types";

const CreateCategory = () => {
  const { userInfo } = useAuth();

  const [newCategory, setNewCategory] = useState("");

  const createCategoryEndpointState = useEndpoint<
    CreateCategoryRequest,
    CreateCategoryResponse
  >({
    endpoint: `/category/create/${userInfo?.user._id}`,
    method: "POST",
  });
  const { error, isLoading, makeRequest } = createCategoryEndpointState;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await makeRequest({ name: newCategory });

    if (res.type === "success") setNewCategory("");
  };

  return (
    <StyledCreateCategoryForm onSubmit={handleSubmit}>
      <Text>Enter the Category</Text>
      <div>
        <Input
          onChange={({ target }) => setNewCategory(target.value)}
          required
          value={newCategory}
        />
      </div>
      {error && (
        <Text color="danger" variant="caption">
          {error}
        </Text>
      )}
      <Button isLoading={isLoading} variant="outlined">
        Create Category
      </Button>
    </StyledCreateCategoryForm>
  );
};

export default CreateCategory;
