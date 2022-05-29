import { screen, waitForElementToBeRemoved } from "@testing-library/react";
import { BASE_URL } from "api";
import Home from "components/core/Home";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { customRender } from "__testing-utils__/custom-render/custom-render";
import { dummyProductsList } from "__testing-utils__/fixtures/dummyProducts";

describe("Homepage", () => {
  const server = setupServer(
    rest.get(`${BASE_URL}/products`, (req, res, ctx) => {
      return res(ctx.json(dummyProductsList));
    }),
    rest.get(`${BASE_URL}/categories`, (req, res, ctx) => {
      return res(ctx.json([]));
    })
  );

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("shows spinner initially and then removes it", async () => {
    customRender(<Home />);

    const loader = await screen.findByTestId("homepage-spinner");
    expect(loader).toBeInTheDocument();

    await waitForElementToBeRemoved(() =>
      screen.getByTestId("homepage-spinner")
    );

    expect(loader).not.toBeInTheDocument();
  });

  it("shows list of products", async () => {
    customRender(<Home />);

    const productCards = await screen.findAllByTestId("product-card");

    expect(productCards.length).toBeGreaterThan(0);
    productCards.forEach((productCard) => expect(productCard).toBeVisible());
  });

  it("shows reload button and error message if network request fails", async () => {
    server.use(
      rest.get(`${BASE_URL}/products`, (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    customRender(<Home />);

    const reloadButton = await screen.findByRole("button", { name: /reload/i });
    const errorMessage = await screen.findByText(
      /network request failed, please check console/i
    );

    expect(reloadButton).toBeInTheDocument();
    expect(errorMessage).toBeInTheDocument();
  });

  it("shows 'out of stock' on 2 cards", async () => {
    // currently the mock data is such, only 2 cards should show "out of stock"

    customRender(<Home />);

    const outOfStockCards = await screen.findAllByText("Out of stock");

    expect(outOfStockCards).toHaveLength(2);

    outOfStockCards.forEach((outOfStockCard) =>
      expect(outOfStockCard).toBeInTheDocument()
    );
  });
});
