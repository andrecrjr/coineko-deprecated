import {
	render,
	screen,
	RenderResult,
	fireEvent,
	waitFor
} from '@testing-library/react';
import { AppRoutes } from '../../App';
import { describe, expect, beforeEach, vi, it } from 'vitest';
import cryptoListMock from '../../__mocks__/cryptocurrency.mock.json';
import cryptoListMockPageTwo from '../../__mocks__/cryptocurrencyPageTwo.mock.json';
import cryptoNftListMockPageOne from '../../__mocks__/nftPageOneMock.mock.json';
import { ContainerWrapper } from './container';

global.scrollTo = vi.fn(() => ({ x: 0, y: 0 }));

vi.mock('axios', async () => {
	const create = vi.fn().mockImplementation(({ baseURL }) => {
		return {
			get: vi.fn().mockImplementation((url) => {
				const apiFilterUrl = baseURL + url;
				if (
					apiFilterUrl.includes(
						'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&sparkline=false&page=1&price_change_percentage=1h%2C24h%2C7d'
					)
				) {
					if (apiFilterUrl.includes('&category=non-fungible'))
						return { data: cryptoNftListMockPageOne };

					return { data: cryptoListMock };
				} else {
					return { data: cryptoListMockPageTwo };
				}
			})
		};
	});

	return { default: { create } };
});
vi.mock('../../Hooks/useFilter', () => {
	return {
		useFilter: vi.fn().mockImplementation((state) => {
			return `?vs_currency=usd&order=market_cap_desc&per_page=50&sparkline=false&page=${state.filterDataObject.page}&price_change_percentage=1h%2C24h%2C7d`;
		})
	};
});

describe('Main App test', () => {
	let mainApp: RenderResult;
	beforeEach(() => {
		mainApp = render(<AppRoutes />, { wrapper: ContainerWrapper });
	});
	it('should show title', async () => {
		expect(screen.getByText(/Coineko/i)).toBeDefined();
		vi.clearAllMocks();
	});

	it('should list one crypto', async () => {
		expect((await screen.findByText('Tether')).textContent).toBe('Tether');
		expect((await screen.findByText('BTC')).textContent).toBe('BTC');
		expect((await screen.findByText('BTC')).textContent).not.toBe('ETH');
		expect(
			(await screen.findByText('$67,916,847,953.00')).textContent
		).toBeDefined();
	});

	it('should snap all cryptos in home', () => {
		expect(mainApp.container.children[0]).toMatchSnapshot();
	});
	it('should go to page two', async () => {
		const buttonNextPage = await screen.findByTestId('next-button');
		fireEvent.click(buttonNextPage);

		await waitFor(() => {
			const thetaPageTwo = screen.getByText(/Theta Network/i);

			expect(thetaPageTwo.textContent).toBe('Theta Network');
			const kusamaPageTwo = screen.getByText(/Kusama/i);
			const ksmPageTwo = screen.getByText(/KSM/i);
			expect(kusamaPageTwo.textContent).toBe('Kusama');
			expect(ksmPageTwo.textContent).toBe('KSM');
		});
	});

	it('should go to page one from page two', async () => {
		const buttonNextPage = await screen.findByTestId('next-button');
		fireEvent.click(buttonNextPage);
		await waitFor(async () => {
			const previousPage = await screen.findByTestId('previous-button');
			fireEvent.click(previousPage);
			const bitcoinPageOne = await screen.findByText('Bitcoin');
			expect(bitcoinPageOne.textContent).toBe('Bitcoin');
		});
	});

	it('should go to another category page', async () => {
		const nftButton = await screen.findByTestId('button-nft');
		fireEvent.click(nftButton);

		await waitFor(async () => {
			const nftPage = await screen.findByText(
				'Ranking of NFT price by Market Capitalization.'
			);
			const flowPage = await screen.findByText('Flow');
			const apePage = await screen.findByText('ApeCoin');
			expect(nftPage.textContent).toBe(
				'Ranking of NFT price by Market Capitalization.'
			);
			expect(flowPage.textContent).toBe('Flow');
			expect(apePage.textContent).toBe('ApeCoin');
		});
	});

	it('should favorite a currency', async () => {
		const buttonApp = await screen.findAllByTestId('favorite-crypto');
		fireEvent.click(buttonApp[0]);
		expect(buttonApp[0].classList.contains('fill-purple-neko')).toBeTruthy();
		expect(buttonApp[0].classList.contains('fill-none')).toBeFalsy();
	});
});
