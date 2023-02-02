import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AppRoutes } from '../../App';
import { describe, expect, vi, it, afterEach } from 'vitest';
import cryptoListMock from '../../__mocks__/cryptocurrency.mock.json';
import cryptoListMockPageTwo from '../../__mocks__/cryptocurrencyPageTwo.mock.json';
import cryptoNftListMockPageOne from 'src/__mocks__/nftPageOneMock.mock.json';
import { ContainerWrapper } from './container';
import { storageObject } from 'src/utils';

global.scrollTo = vi.fn(() => ({ x: 0, y: 0 }));

vi.mock('axios', async () => {
	const create = vi.fn().mockImplementation(({ baseURL }) => {
		return {
			get: vi.fn().mockImplementation((url) => {
				const apiFilterUrl: string = baseURL + url;
				if (
					apiFilterUrl.includes(
						'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d'
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
	afterEach(() => {
		vi.clearAllMocks();
	});

	it('should show title', async () => {
		render(<AppRoutes />, { wrapper: ContainerWrapper });
		expect(screen.getByText(/Coineko/i)).toBeDefined();
	});

	it('should list one crypto', async () => {
		render(<AppRoutes />, { wrapper: ContainerWrapper });
		expect((await screen.findByText('Tether')).textContent).toBe('Tether');
		expect((await screen.findByText('BTC')).textContent).toBe('BTC');
		expect((await screen.findByText('BTC')).textContent).not.toBe('ETH');
		expect(
			(await screen.findByText('$67,916,847,953.00')).textContent
		).toBeDefined();
	});

	it('should snap all cryptos in home', () => {
		const { container } = render(<AppRoutes />, { wrapper: ContainerWrapper });
		expect(container.children[0]).toMatchSnapshot();
	});

	it('should go to page two', async () => {
		render(<AppRoutes />, { wrapper: ContainerWrapper });
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
		render(<AppRoutes />, { wrapper: ContainerWrapper });
		const buttonNextPage = await screen.findByTestId('next-button');
		fireEvent.click(buttonNextPage);
		await waitFor(async () => {
			const previousPage = await screen.findByTestId('previous-button');
			fireEvent.click(previousPage);
			const bitcoinPageOne = await screen.findByText('Bitcoin');
			expect(bitcoinPageOne.textContent).toBe('Bitcoin');
		});
	});

	it('should already had starred cryptocurrency in portfolio', async () => {
		vi.spyOn(storageObject, 'get').mockReturnValue([
			'bitcoin',
			'ethereum',
			'eos'
		]);
		render(<AppRoutes />, { wrapper: ContainerWrapper });
		const cryptoButtons = await screen.findAllByTestId('favorite-crypto');

		await waitFor(async () => {
			cryptoButtons.forEach((button) => {
				if (button.dataset.crypto === 'bitcoin') {
					expect(button.classList.contains('fill-purple-neko')).toBeTruthy();
				}
				if (button.dataset.crypto === 'ethereum') {
					expect(button.classList.contains('fill-purple-neko')).toBeTruthy();
				}
				if (button.dataset.crypto === 'tether') {
					expect(button.classList.contains('fill-purple-neko')).toBeFalsy();
				}
				if (button.dataset.crypto === 'eos') {
					expect(button.classList.contains('fill-[none]')).toBeFalsy();
				}
			});
		});
	});

	it('should go to another category page', async () => {
		render(<AppRoutes />, { wrapper: ContainerWrapper });
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
});
