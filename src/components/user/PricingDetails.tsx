import { useCart } from "contexts/cart-context";
import { H4, H5, Text } from "haki-ui";
import { StyledPricingDetailsContainer } from "./styles";

const PricingDetails = () => {
  const { cartItems, cartItemsTotalPrice } = useCart();

  return (
    <StyledPricingDetailsContainer>
      <H4>PRICING DETAILS</H4>

      <div className="individual-products-container">
        {cartItems.map(({ count, name, price, product }) => (
          <div className="individual-product" key={product}>
            <Text>
              {name}{" "}
              <Text as="span" color="disabled" variant="body2">
                x{count}
              </Text>
            </Text>

            <Text>{price * count}</Text>
          </div>
        ))}
      </div>

      <div className="price-total">
        <H5 weight="semi-bold">Total</H5>
        <H5 weight="semi-bold">{cartItemsTotalPrice}</H5>
      </div>
    </StyledPricingDetailsContainer>
  );
};

export default PricingDetails;
