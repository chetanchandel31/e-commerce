import { useCart } from "contexts/cart-context";
import { H4, H5 } from "haki-ui";
import { StyledPricingDetailsContainer } from "./styles";

const PricingDetails = () => {
  const { cartItems } = useCart();

  const totalAmount = cartItems.reduce(
    (prevVal, currentVal) => prevVal + currentVal.price,
    0
  );

  return (
    <StyledPricingDetailsContainer>
      <H4>PRICING DETAILS</H4>

      <div className="individual-products-container">
        {cartItems.map((product) => (
          <div className="individual-product" key={product._id}>
            <span>{product.name}</span>
            <span>{product.price}</span>
          </div>
        ))}
      </div>

      <div className="price-total">
        <H5 weight="semi-bold">Total</H5>
        <H5 weight="semi-bold">{totalAmount}</H5>
      </div>
    </StyledPricingDetailsContainer>
  );
};

export default PricingDetails;
