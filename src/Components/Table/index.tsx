import { useState } from "react";
import Star from "./star.svg?component";
import Cat from "../../assets/cat.svg?component";
interface Props {
  description: string;
}
export const Table = ({}: Props) => {
  return (
    <section className="flex flex-col justify-center sm:items-center ml-2 sm:ml-0">
      <section className="flex items-center mt-8 w-10/12 mb-2">
        <span>
          <Cat className="w-[35px] h-[35px]" />
        </span>
        <h3 className="text-xs text-left items-start">
          Price of cryptocurrency by Markecap
        </h3>
      </section>
      <section
        className="overflow-x-scroll 
				 sm:overflow-x-auto sm:w-10/12"
      >
        <table className="bg-[#DEDEDE]  rounded-md table-auto w-full">
          <thead className="">
            <tr>
              <td className="table--head px-0 w-0 h-0 inline"></td>
              <td className="table--head px-3 text-left">#</td>
              <td className="table--head pl-[32px]">Coin</td>
              <td className="table--head min-w-[170px]">Price</td>
              <td className="table--head">24h</td>
              <td className="table--head">7d</td>
              <td className="table--head">Marketcap</td>
            </tr>
          </thead>
          <tbody className="border-t-[2px] border-[#B8BAFF]">
            <CurrencyChild />
          </tbody>
        </table>
      </section>
    </section>
  );
};

export const CurrencyChild = () => {
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
          />
        </span>
      </td>
      <td
        className="table--body text-left max-w-[100px] 
			text-dark-purple-neko font-bold overflow-scroll sm:overflow-auto pl-3"
      >
        1
      </td>
      <td className="table--body table--body__coin">
        <section className="grid grid-cols-[auto_1fr] auto-rows-max">
          <img
            src="https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png?1547033579"
            className="mx-auto mt-auto"
            style={{ userSelect: "none" }}
          />
          <a
            className="row-span-2 w-max flex 
										items-center pl-3 max-w-[150px] font-bold 
										 break-words overflow-scroll sm:overflow-hidden"
            style={{ userSelect: "none" }}
          >
            Bitcoin
          </a>
          <p
            className="text-[10px] text-center 
					text-dark-purple-neko font-bold max-w-[26px] break-words"
          >
            BTC
          </p>
        </section>
      </td>

      <td className="table--body overflow-scroll sm:overflow-auto">U$45.000</td>
      <td className="table--body text-green-500">+ 25%</td>
      <td className="table--body text-red-600">- 7%</td>
      <td className="table--body">1.000.000.000</td>
    </tr>
  );
};
