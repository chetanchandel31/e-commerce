import { Backdrop, Button, Card, Chip, H5, Text } from "haki-ui";
import { MdRemoveShoppingCart, MdShoppingCart } from "react-icons/md";
import { Product } from "shared-types";
import { StyledProductCard } from "../styles";

type ProductCardProps = {
  enableAddToCart?: boolean;
  product: Product;
};

const ProductCard = ({ enableAddToCart = true, product }: ProductCardProps) => {
  const { _id, category, description, name, price, stock } = product;

  const isOutOfStock = stock < 1;

  return (
    <Card>
      <StyledProductCard isOutOfStock={isOutOfStock}>
        <Card.Media
          src={`${process.env.REACT_APP_BACKEND}/product/photo/${_id}`}
          alt="doggo"
          height={200}
        />

        <Card.Content>
          <div className="product-card-content">
            <H5 weight="semi-bold">{name}</H5>

            <Text>{description}</Text>

            <div className="price-category-container">
              <Chip color="secondary" size="sm">
                {category.name}
              </Chip>
              <Text as="span" color="primary" weight="semi-bold">
                ₹{price}.00
              </Text>
            </div>

            {enableAddToCart ? (
              <Button fullWidth startIcon={<MdShoppingCart />}>
                Add to cart
              </Button>
            ) : (
              <Button
                color="danger"
                fullWidth
                startIcon={<MdRemoveShoppingCart />}
                variant="outlined"
              >
                Remove from cart
              </Button>
            )}
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
