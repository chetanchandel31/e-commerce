import { useCart } from "contexts/cart-context";
import { Backdrop, Button, Card, Chip, H5, IconButton, Text } from "haki-ui";
import {
  MdRemoveShoppingCart,
  MdShoppingCart,
  MdOutlineAdd,
  MdOutlineRemove,
} from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Product } from "shared-types";
import { StyledProductCard } from "../styles";

type ProductCardProps = {
  enableAddToCart?: boolean;
  product: Product;
};

const ProductCard = ({ enableAddToCart = true, product }: ProductCardProps) => {
  const { _id, category, description, name, price, stock } = product;

  const navigate = useNavigate();

  const {
    addToCart,
    cartItems,
    decreaseCartProductQuantity,
    increaseCartProductQuantity,
    removeFromCart,
  } = useCart();

  const quantity = cartItems.find(
    (cartProduct) => cartProduct.product === _id
  )?.count;

  const isProductAlreadyInCart =
    cartItems.findIndex(
      (cartProduct) => cartProduct.product === product._id
    ) !== -1;

  const addToCartBtn = isProductAlreadyInCart ? (
    <Button
      fullWidth
      onClick={() => navigate("/cart")}
      startIcon={<MdShoppingCart />}
      variant="outlined"
    >
      Go to cart
    </Button>
  ) : (
    <Button
      fullWidth
      onClick={() => addToCart({ count: 1, name, price, product: _id })}
      startIcon={<MdShoppingCart />}
    >
      Add to cart
    </Button>
  );

  const isOutOfStock = stock < 1;

  return (
    <Card data-testid="product-card">
      <StyledProductCard isOutOfStock={isOutOfStock}>
        <Card.Media
          alt={product.name}
          height={200}
          src={`${process.env.REACT_APP_BACKEND}/product/photo/${_id}`}
        />

        <Card.Content>
          <div className="product-card-content">
            <H5 weight="semi-bold">{name}</H5>

            <Text>{description}</Text>

            {!enableAddToCart && (
              <div className="quantity-counter">
                <Text color="disabled" weight="semi-bold">
                  Quantity:
                </Text>

                <div>
                  <IconButton
                    circular
                    disabled={Boolean(quantity && quantity <= 1)}
                    icon={<MdOutlineRemove />}
                    onClick={() => decreaseCartProductQuantity(_id)}
                    size="sm"
                    variant="ghost"
                  />
                  {quantity}
                  <IconButton
                    circular
                    icon={<MdOutlineAdd />}
                    onClick={() => increaseCartProductQuantity(_id)}
                    size="sm"
                    variant="ghost"
                  />
                </div>
              </div>
            )}

            <div className="price-category-container">
              <Chip color="secondary" size="sm">
                {category.name}
              </Chip>
              <Text as="span" color="primary" weight="semi-bold">
                ???{price}.00
              </Text>
            </div>

            <div className="cart-btn">
              {enableAddToCart ? (
                addToCartBtn
              ) : (
                <Button
                  color="danger"
                  fullWidth
                  onClick={() => removeFromCart(product._id)}
                  startIcon={<MdRemoveShoppingCart />}
                  variant="outlined"
                >
                  Remove from cart
                </Button>
              )}
            </div>
          </div>
        </Card.Content>

        {isOutOfStock && (
          <Backdrop show>
            <div className="out-of-stock">
              Out of <br /> stock
            </div>
          </Backdrop>
        )}
      </StyledProductCard>
    </Card>
  );
};

export default ProductCard;
