import useEndpoint from "api/useEndpoint";
import EmptyStateOrders from "assets/empty-state-orders.svg";
import { useAuth } from "contexts/auth-context";
import { Card, Chip, CircularProgress, H4, Text } from "haki-ui";
import { Order } from "shared-types";
import {
  OrdersContainer,
  SingleOrder,
  SingleOrderProductsContainer,
} from "./styles";

const Orders = () => {
  const { userInfo } = useAuth();

  const { error, isLoading, result } = useEndpoint<undefined, Order[]>({
    endpoint: `/order/all/${userInfo?.user._id}`,
    preLoadResult: true,
  });

  const totalSales = result?.reduce(
    (prevVal, currentVal) => prevVal + currentVal.amount,
    0
  );

  return (
    <OrdersContainer>
      {isLoading && (
        <CircularProgress size={70} style={{ margin: "2rem auto" }} />
      )}

      {error && <Text color="danger">{error}</Text>}

      {result && result?.length === 0 && !isLoading && !error && (
        <div className="orders-empty-state-container">
          <img alt="no-orders" src={EmptyStateOrders} />
          <H4>When products are purchased, orders will be shown here</H4>
        </div>
      )}

      {result && result?.length > 0 && !isLoading && !error && (
        <>
          <h2>Total sales: {totalSales}</h2>

          {result?.map((order) => (
            <Card key={order._id} maxWidth={600} style={{ width: "100%" }}>
              <SingleOrder>
                <div className="order-sub-item">
                  <Text as="span" weight="semi-bold">
                    Buyer:{" "}
                  </Text>
                  {order.user.name}
                </div>

                <div className="order-sub-item">
                  <Text as="span" weight="semi-bold">
                    Bought at:{" "}
                  </Text>
                  {new Date(order.createdAt).toLocaleString()}
                </div>

                <div className="order-sub-item">
                  <Text as="span" weight="semi-bold">
                    Status:{" "}
                  </Text>
                  <Chip color="secondary" size="sm">
                    {order.status}
                  </Chip>
                </div>

                <SingleOrderProductsContainer>
                  <Text as="span" weight="semi-bold">
                    Products:
                  </Text>
                  {order.products.map(({ count, name, price, _id }) => (
                    <div className="single-order-products" key={_id}>
                      <Text as="span">
                        {name}{" "}
                        <Text as="span" color="disabled" variant="body2">
                          x{count}
                        </Text>
                      </Text>

                      <div>{price * count}</div>
                    </div>
                  ))}
                </SingleOrderProductsContainer>

                {/* TODO: use currency symbol */}
                <div className="order-sub-item">
                  <Text as="span" weight="semi-bold">
                    Amount:
                  </Text>{" "}
                  {order.amount}
                </div>
              </SingleOrder>
            </Card>
          ))}
        </>
      )}
    </OrdersContainer>
  );
};

export default Orders;
