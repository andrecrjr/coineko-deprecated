import { useCallback, useContext, useEffect, useState } from "react";
import Star from "./star.svg?component";
import Cat from "src/assets/cat.svg?component";
import { axiosInstance } from "src/Services/ApiService";
import { CurrencyList, Currency } from "src/Types";
import { formatterMoney } from "src/utils";
import Pagination from "./Pagination";
import { FilterGlobalContext, PaginationContext } from "src/Contexts";

interface Props {
  description: string;
  category?: string;
}

export const Table = ({ description, category }: Props) => {
  const filter = useContext(FilterGlobalContext);
  const [currencyList, setList] = useState<CurrencyList>([]);
  const [page, setPagination] = useState<number>(1);
  const urlQuery =
    window.location.search.length > 0 &&
    parseInt(new URLSearchParams(window.location.search).get("page") || "1");

  const fetchServiceByFilterAndUpdateData = useCallback(
    async (filterPaginationAndCategory) => {
      let result;
      if (filter)
        if (filterPaginationAndCategory) {
          result = new URLSearchParams({
            ...filter,
            ...filterPaginationAndCategory,
          }).toString();
        }
      const { data } = await axiosInstance.get(
        `/coins/markets?${result ? result : ""}`
      );
      setList(data);
    },
    [filter, category]
  );

  useEffect(() => {
    if (category) {
      fetchServiceByFilterAndUpdateData({
        category,
        ...{ page: page || urlQuery },
      });
    } else {
      fetchServiceByFilterAndUpdateData({ ...{ page: urlQuery || page } });
    }
  }, [page, filter, category, urlQuery]);

  return (
    <PaginationContext.Provider value={{ page, setPagination }}>
      <section className="flex flex-col justify-center sm:items-center ml-2 sm:ml-0 relative">
        <section className="flex items-center mt-8 w-10/12 mb-2 md:mb-5 md:mt-10 ">
          <span>
            <Cat className="w-[35px] h-[35px]" />
          </span>
          <h3 className="text-xs text-left items-start md:text-base">
            {description}
          </h3>
        </section>
        <section
          className="overflow-x-scroll 
				 sm:overflow-x-auto sm:w-10/12 mb-10"
        >
          <table className="bg-[#DEDEDE]  rounded-md table-auto w-full min-h-screen">
            <thead className="">
              <tr>
                <td className="table--head px-0 w-5 h-auto"></td>
                <td className="table--head px-3 text-left">#</td>
                <td className="table--head pl-[32px]">Coin</td>
                <td className="table--head min-w-[170px]">Price</td>
                <td className="table--head">1h</td>
                <td className="table--head">24h</td>
                <td className="table--head">7d</td>
                <td className="table--head">Market Cap.</td>
              </tr>
            </thead>
            <tbody className="border-t-[2px] border-[#B8BAFF]">
              {currencyList.length > 0 &&
                currencyList.map((currency: Currency) => (
                  <CurrencyChild key={currency.name} currency={currency} />
                ))}
            </tbody>
          </table>
          <Pagination />
        </section>
      </section>
    </PaginationContext.Provider>
  );
};

export const CurrencyChild = ({ currency }: { currency: Currency }) => {
  const [Favorite, setFavorite] = useState(false);
  return (
    <tr className="table--body__line pt-4">
      <td className="table--body w-[35px] mr-15">
        <span>
          <Star
            className={`w-5 ${Favorite ? "fill-purple-neko" : "fill-[none]"}`}
            onClick={(e) => {
              e.preventDefault();
              setFavorite((state) => !state);
            }}
            data-testid="favorite-crypto"
          />
        </span>
      </td>
      <td
        className="table--body text-left max-w-[100px] 
			text-dark-purple-neko font-bold overflow-scroll sm:overflow-auto pl-3"
      >
        {currency.market_cap_rank}
      </td>
      <td className="table--body table--body__coin">
        <section className="grid grid-cols-[auto_1fr] auto-rows-max">
          <img
            src={`${currency.image.replace("large", "thumb")}`}
            className="mx-auto mt-auto"
            style={{ userSelect: "none" }}
            width="25"
            height="25"
          />
          <a
            className="row-span-2 w-max flex 
										items-center pl-3 max-w-[150px] font-bold 
										 break-words overflow-scroll sm:overflow-hidden"
            style={{ userSelect: "none" }}
          >
            {currency.name}
          </a>
          <p
            className="text-[10px] text-center 
					text-dark-purple-neko font-bold max-w-[auto] break-words"
          >
            {currency.symbol.toUpperCase()}
          </p>
        </section>
      </td>

      <td className="table--body overflow-scroll sm:overflow-auto">
        {formatterMoney(
          "en-US",
          {
            style: "currency",
            currency: "USD",
          },
          currency.current_price
        )}
      </td>
      <td
        className={`table--body ${
          currency.price_change_percentage_1h_in_currency > 0
            ? "text-green-500"
            : "text-red-600"
        }`}
      >
        {currency.price_change_percentage_1h_in_currency &&
          currency.price_change_percentage_1h_in_currency.toFixed(2)}
        %
      </td>
      <td
        className={`table--body ${
          currency.market_cap_change_percentage_24h > 0
            ? "text-green-500"
            : "text-red-600"
        }`}
      >
        {currency.market_cap_change_percentage_24h &&
          currency.market_cap_change_percentage_24h.toFixed(2)}{" "}
        %
      </td>
      <td
        className={`table--body  ${
          currency.price_change_percentage_7d_in_currency > 0
            ? "text-green-500"
            : "text-red-600"
        }`}
      >
        {currency.price_change_percentage_7d_in_currency &&
          currency.price_change_percentage_7d_in_currency.toFixed(2)}{" "}
        %
      </td>
      <td className="table--body">
        {formatterMoney(
          "en-US",
          {
            style: "currency",
            currency: "USD",
          },
          currency.market_cap || 0
        )}
      </td>
    </tr>
  );
};
