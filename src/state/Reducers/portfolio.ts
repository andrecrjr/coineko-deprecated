import { storageObject } from 'src/utils';

export const PortfolioReducer = (
	state: string[],
	action: { type: string; payload: string }
) => {
	const addState = [...state, action.payload];
	const removeCurrency = [...state.filter((item) => item !== action.payload)];
	switch (action.type) {
		case 'ADD_COIN':
			storageObject.set('portfolio', addState);
			return addState;
		case 'REMOVE_COIN':
			storageObject.set('portfolio', removeCurrency);
			return removeCurrency;
		default:
			return state;
	}
};
