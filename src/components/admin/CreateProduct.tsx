import { Input, Select } from "haki-ui";
import { ChangeEvent, FormEvent, useState } from "react";

const createProductDataInitialState = {
  name: "",
  description: "",
  price: "",
  category: "",
  stock: "",
};

const CreateProduct = () => {
  const [createProductData, setCreateProductData] = useState(
    createProductDataInitialState
  );

  console.log(createProductData);

  const handleChange = ({
    target,
  }: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setCreateProductData((prev) => ({
      ...prev,
      [target.name]: target.value,
    }));
  };
  // console.log(createProductData.get("name"), "hi");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(createProductData).forEach((key) =>
      formData.set(key, (createProductData as any)[key])
    );

    console.log(
      formData.get("name"),
      formData.get("description"),
      formData.get("stock")
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        padding: "2rem 1rem",
      }}
    >
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
      <Select fullWidth name="category" onChange={handleChange} required>
        <option>hi</option>
      </Select>
      <Input
        name="stock"
        onChange={handleChange}
        placeholder="stock"
        required
        type="number"
      />
      <input style={{ border: "solid 2px black" }} type="file" />
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
    </form>
  );
};

export default CreateProduct;
