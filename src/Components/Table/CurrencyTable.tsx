import { useState } from 'react';
import { Currency } from 'src/Types';
import { formatterMoney } from 'src/utils';
import Star from './star.svg?component';

const ColumnCurrencyInfoGrid = ({
	currency
}: {
	currency: Currency | undefined;
}) => {
	return (
		<>
			<td
				className="table--body text-left
			text-dark-purple-neko font-bold overflow-scroll sm:overflow-auto pl-3 "
			>
				{currency?.market_cap_rank || '...'}
			</td>
			<td className="table--body table--body__coin">
				<section className="grid grid-cols-[auto_1fr] auto-rows-max">
					<img
						src={`${
							currency?.image.replace('large', 'thumb') ||
							'https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png?1547033579'
						}`}
						className="mx-auto mt-auto"
						style={{ userSelect: 'none' }}
						width="25"
						height="25"
						alt={currency?.name}
					/>
					<a
						className="row-span-2 w-max flex 
                            items-center pl-3 max-w-[150px] font-bold 
                             break-words overflow-scroll sm:overflow-hidden"
						style={{ userSelect: 'none' }}
					>
						{currency?.name || 'Loading....'}
					</a>
					<p
						className="text-[10px] text-center 
        text-dark-purple-neko font-bold max-w-[auto] break-words"
					>
						{currency?.symbol.toUpperCase() || '...'}
					</p>
				</section>
			</td>
		</>
	);
};

export const CurrencyChild = ({ currency }: { currency?: Currency }) => {
	const [Favorite, setFavorite] = useState(false);
	return (
		<tr className="table--body__line pt-4">
			<td className="table--body w-[35px] mr-15">
				<span>
					<Star
						className={`w-5 ${Favorite ? 'fill-purple-neko' : 'fill-[none]'}`}
						onClick={(e) => {
							e.preventDefault();
							setFavorite((state) => !state);
						}}
						data-testid="favorite-crypto"
					/>
				</span>
			</td>

			<ColumnCurrencyInfoGrid currency={currency} />
			<ColumnMoneyFormatter
				classNames={'table--body overflow-scroll sm:overflow-auto'}
				formatPrice={currency?.current_price || 0}
			/>

			<ColumnPercentageCurrency
				currencyNumber={currency?.price_change_percentage_1h_in_currency}
			/>
			<ColumnPercentageCurrency
				currencyNumber={currency && currency?.market_cap_change_percentage_24h}
			/>
			<ColumnPercentageCurrency
				currencyNumber={currency?.price_change_percentage_7d_in_currency}
			/>
			<ColumnMoneyFormatter
				classNames="table--body"
				formatPrice={currency?.market_cap || 0}
			/>
		</tr>
	);
};

const ColumnMoneyFormatter = ({
	classNames,
	formatPrice
}: {
	classNames: string;
	formatPrice: number;
}) => {
	return (
		<td className={classNames}>
			{formatterMoney(
				'en-US',
				{
					style: 'currency',
					currency: 'USD'
				},
				formatPrice
			)}
		</td>
	);
};

const ColumnPercentageCurrency = ({
	currencyNumber
}: {
	currencyNumber: number | undefined;
}) => {
	return (
		<td
			className={`table--body  ${
				currencyNumber && currencyNumber > 0 ? 'text-green-500' : 'text-red-600'
			}`}
		>
			{(currencyNumber && currencyNumber.toFixed(2)) || '0.00'}%
		</td>
	);
};

const CurrencyTable = ({ currencyList }: { currencyList: Currency[] }) => {
	if (currencyList?.length > 0)
		return (
			<>
				{currencyList.map((currency: Currency) => (
					<CurrencyChild key={currency.name} currency={currency} />
				))}
			</>
		);
	return <></>;
};

export default CurrencyTable;
