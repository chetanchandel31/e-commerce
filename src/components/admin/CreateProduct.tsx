import useEndpoint from "api/useEndpoint";
import { useAuth } from "contexts/auth-context";
import { Button, Input, Text } from "haki-ui";
import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { BiImageAdd } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { Product } from "shared-types";
import { isInputTypeFile } from "./helper/isInputTypeFile";
import SelectCategory from "./helper/SelectCategory";
import { StyledCreateProductForm } from "./styles";
import { CreateProductDataInitialState } from "./types";

const createProductDataInitialState: CreateProductDataInitialState = {
  name: "",
  description: "",
  price: "",
  category: "",
  stock: "",
  photo: null,
};

const CreateProduct = () => {
  const navigate = useNavigate();

  const { userInfo } = useAuth();

  const { error, isLoading, makeRequest, result } = useEndpoint<
    FormData,
    Product
  >({
    endpoint: `/product/create/${userInfo?.user._id}`,
    method: "POST",
  });

  const [createProductData, setCreateProductData] = useState(
    createProductDataInitialState
  );

  const imageUploadBtnRef = useRef<HTMLInputElement>(null);

  const handleChange = ({
    target,
  }: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (isInputTypeFile(target)) {
      setCreateProductData((prev) => ({
        ...prev,
        photo: target.files && target.files[0],
      }));
    } else {
      setCreateProductData((prev) => ({
        ...prev,
        [target.name]: target.value,
      }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();

    Object.entries(createProductData).forEach(([key, value]) => {
      if (value) formData.set(key, value);
    });

    const res = await makeRequest(formData);

    if (res.type === "success") {
      setCreateProductData(createProductDataInitialState);
      // TODO: navigate somewhere more sensible
      setTimeout(() => navigate("/"), 2000);
    }
  };

  return (
    <StyledCreateProductForm onSubmit={handleSubmit}>
      <Input
        fullWidth
        name="name"
        onChange={handleChange}
        placeholder="name"
        required
      />

      <Input
        fullWidth
        name="description"
        onChange={handleChange}
        placeholder="description"
        required
      />

      <Input
        fullWidth
        name="price"
        onChange={handleChange}
        placeholder="price"
        required
        type="number"
      />

      <SelectCategory handleChange={handleChange} />

      <Input
        fullWidth
        name="stock"
        onChange={handleChange}
        placeholder="stock"
        required
        type="number"
      />

      <div>
        <Button
          onClick={() => imageUploadBtnRef.current?.click()}
          size="sm"
          startIcon={<BiImageAdd />}
          type="button"
          variant="outlined"
        >
          Add image
        </Button>

        {createProductData.photo && (
          <Text
            as="span"
            color="secondary"
            style={{ marginLeft: "1rem" }}
            variant="caption"
          >
            {createProductData.photo?.name}
          </Text>
        )}
      </div>
      <input
        name="photo"
        onChange={handleChange}
        ref={imageUploadBtnRef}
        style={{ display: "none" }}
        type="file"
      />

      {error && (
        <Text color="danger" variant="caption">
          {error}
        </Text>
      )}
      {result && (
        <Text color="secondary">new product created : {result.name}</Text>
      )}

      <Button fullWidth isLoading={isLoading} type="submit">
        create product 🚀
      </Button>
    </StyledCreateProductForm>
  );
};

export default CreateProduct;
