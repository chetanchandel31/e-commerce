import useEndpoint from "api/useEndpoint";
import { useAuth } from "contexts/auth-context";
import {
  Backdrop,
  Button,
  Card,
  CircularProgress,
  Input,
  Text,
  useTheme,
} from "haki-ui";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { MdUpload } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { Product } from "shared-types";
import { isInputTypeFile } from "./helper/isInputTypeFile";
import SelectCategory from "./helper/SelectCategory";
import {
  StyledEditFormBottomBtnsContainer,
  StyledEditProductForm,
} from "./styles";
import { EditProductDataInitialState } from "./types";

const editProductDataInitialState: EditProductDataInitialState = {
  name: "",
  description: "",
  price: "",
  category: "",
  stock: "",
};

const EditProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { colors } = useTheme();
  const { userInfo } = useAuth();

  const [{ category, description, name, price, stock }, setEditProductData] =
    useState(editProductDataInitialState);

  const {
    error: getProductError,
    isLoading: isGetProductLoading,
    result: getProductResult,
  } = useEndpoint<undefined, Product>({
    endpoint: `/product/${params?.productId}`,
    preLoadResult: true,
  });

  useEffect(() => {
    if (getProductResult !== null) {
      // TODO: think about photo
      const { category, description, name, price, stock } = getProductResult;
      setEditProductData((prev) => ({
        ...prev,
        category: category._id,
        description,
        name,
        price: String(price),
        stock: String(stock),
      }));
    }
  }, [getProductResult]);

  const handleChange = ({
    target,
  }: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (isInputTypeFile(target)) {
      setEditProductData((prev) => ({
        ...prev,
        photo: target.files && target.files[0],
      }));
    } else {
      setEditProductData((prev) => ({
        ...prev,
        [target.name]: target.value,
      }));
    }
  };

  const {
    error: updateProductError,
    isLoading: isUpdateProductLoading,
    makeRequest: makeUpdateProductRequest,
  } = useEndpoint<FormData, Product>({
    endpoint: `/product/${params?.productId}/${userInfo?.user._id}`,
    method: "PUT",
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const editProductData = { category, description, name, price, stock };
    const formData = new FormData();

    Object.entries(editProductData).forEach(([key, value]) => {
      if (value) formData.set(key, value);
    });

    const res = await makeUpdateProductRequest(formData);

    if (res.type === "success") {
      navigate("/admin-dashboard/manage-products");
    }
  };

  return (
    <Backdrop blur={2} show>
      <Card
        variant="elevated"
        style={{
          backgroundColor: colors.primary.contrastText,
          width: "90%",
        }}
      >
        {getProductError && <Text color="danger">{getProductError}</Text>}

        {isGetProductLoading && (
          <div>
            <CircularProgress style={{ margin: "8rem auto" }} />
          </div>
        )}

        {getProductResult !== null && (
          <StyledEditProductForm onSubmit={handleSubmit}>
            <div className="edit-form-item">
              <div className="edit-form-item-name">name:</div>
              <Input
                fullWidth
                name="name"
                onChange={handleChange}
                placeholder="name"
                required
                value={name}
              />
            </div>

            <div className="edit-form-item">
              <div className="edit-form-item-name">description:</div>
              <Input
                fullWidth
                name="description"
                onChange={handleChange}
                placeholder="description"
                required
                value={description}
              />
            </div>

            <div className="edit-form-item">
              <div className="edit-form-item-name">price:</div>
              <Input
                fullWidth
                name="price"
                onChange={handleChange}
                placeholder="price"
                required
                type="number"
                value={price}
              />
            </div>

            <div className="edit-form-item">
              <div className="edit-form-item-name">category:</div>
              <SelectCategory handleChange={handleChange} value={category} />
            </div>

            <div className="edit-form-item">
              <div className="edit-form-item-name">stock:</div>
              <Input
                fullWidth
                name="stock"
                onChange={handleChange}
                placeholder="stock"
                required
                type="number"
                value={stock}
              />
            </div>

            {updateProductError && (
              <Text color="danger">{updateProductError}</Text>
            )}

            <StyledEditFormBottomBtnsContainer>
              <Button
                isLoading={isUpdateProductLoading}
                startIcon={<MdUpload />}
                type="submit"
              >
                save
              </Button>
              <Button
                color="danger"
                onClick={() => navigate("/admin-dashboard/manage-products")}
                type="button"
                variant="ghost"
              >
                cancel
              </Button>
            </StyledEditFormBottomBtnsContainer>
          </StyledEditProductForm>
        )}
      </Card>
    </Backdrop>
  );
};

export default EditProduct;
