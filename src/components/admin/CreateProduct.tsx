import { Button, Input, Text } from "haki-ui";
import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { BiImageAdd } from "react-icons/bi";
import { isInputTypeFile } from "./helper/isInputTypeFile";
import SelectCategory from "./helper/SelectCategory";
import { StyledCreateProductForm } from "./styles";

type CreateProductDataInitialState = {
  name: string;
  description: string;
  price: string;
  category: string;
  stock: string;
  photo: File | null;
};

const createProductDataInitialState: CreateProductDataInitialState = {
  name: "",
  description: "",
  price: "",
  category: "",
  stock: "",
  photo: null,
};

const CreateProduct = () => {
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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();

    Object.entries(createProductData).forEach(([key, value]) => {
      if (value) formData.set(key, value);
    });
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
          startIcon={<BiImageAdd />}
          type="button"
          variant="outlined"
        >
          Add image
        </Button>

        {createProductData.photo && (
          <Text as="span" color="secondary" style={{ marginLeft: "1rem" }}>
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

      <Button fullWidth type="submit">
        submit
      </Button>
    </StyledCreateProductForm>
  );
};

export default CreateProduct;
