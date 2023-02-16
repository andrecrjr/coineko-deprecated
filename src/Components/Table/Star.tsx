import { useContext } from 'react';
import Star from './star.svg?component';
import { PortfolioContext } from 'src/state/Contexts';

export const StarPortfolioCurrency = ({
	currencyId
}: {
	currencyId: string;
}) => {
	const { userCurrency, setPortfolio } = useContext(PortfolioContext);
	return (
		<Star
			className={`w-6 ${
				userCurrency?.some((item) => item === currencyId)
					? 'fill-purple-neko'
					: 'fill-[none]'
			}`}
			onClick={(e) => {
				e.preventDefault();

				if (userCurrency?.some((currency) => currency === currencyId)) {
					setPortfolio({ type: 'REMOVE_COIN', payload: currencyId });
					return;
				}
				setPortfolio({ type: 'ADD_COIN', payload: currencyId });
			}}
			data-crypto={currencyId}
			data-testid="favorite-crypto"
		/>
	);
};
