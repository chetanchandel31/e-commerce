import { Input } from "haki-ui";
import { ChangeEvent, FormEvent, useState } from "react";
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
      <Input name="name" onChange={handleChange} placeholder="name" required />
      <Input
        name="description"
        onChange={handleChange}
        placeholder="description"
        required
      />
      <Input
        name="price"
        onChange={handleChange}
        placeholder="price"
        required
        type="number"
      />
      <SelectCategory handleChange={handleChange} />
      <Input
        name="stock"
        onChange={handleChange}
        placeholder="stock"
        required
        type="number"
      />
      <input
        name="photo"
        onChange={handleChange}
        style={{ border: "solid 2px black" }}
        type="file"
      />
      <button
        name="haha"
        onClick={(e) => console.log((e.target as HTMLButtonElement).name)}
        type="button"
      >
        aa
      </button>
      {/* <Button onClick={({ target }) => console.log(target.name)} type="button"> */}
      {/* hi */}
      {/* </Button> */}
      <button type="submit">submit</button>
    </StyledCreateProductForm>
  );
};

export default CreateProduct;
