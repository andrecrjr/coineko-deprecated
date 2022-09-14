import { ReactElement } from "react";
import { render, screen, RenderResult } from "@testing-library/react";
import App from "../../App";
import { describe, test, expect, beforeEach, vi } from "vitest";
import cryptoListMock from "../../__mocks__/cryptocurrency.mock.json";

vi.mock("axios", async () => {
  const create = vi.fn().mockImplementation((createUrl) => {
    return {
      get: vi.fn().mockImplementation((url) => {
        let apiFilterUrl = createUrl.baseURL + url;

        if (
          apiFilterUrl.includes(
            "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&sparkline=false&page=1&price_change_percentage=1h%2C24h%2C7d"
          )
        ) {
          console.log("meu retorno");
          return { data: cryptoListMock };
        }
      }),
    };
  });

  return { default: { create } };
});

describe("Main App test", () => {
  let mainApp: RenderResult;

  beforeEach(() => {
    mainApp = render(<App />);
  });

  test("should show title", () => {
    expect(screen.getByText(/coineko/i)).toBeDefined();
  });

  test("should list one crypto", async () => {
    expect((await screen.findByText("Bitcoin")).textContent).toBe("Bitcoin");
    expect((await screen.findByText("BTC")).textContent).toBe("BTC");
    expect((await screen.findByText("BTC")).textContent).not.toBe("ETH");
    expect(
      (await screen.findByText("$67,916,847,953.00")).textContent
    ).toBeDefined();
  });

  test("should snap all cryptos in home", () => {
    expect(mainApp.container.children[0]).toMatchSnapshot();
  });
});
