import {
	render,
	screen,
	RenderResult,
	fireEvent,
	waitFor
} from '@testing-library/react';
import { AppRoutes } from '../../App';
import { describe, expect, beforeEach, vi, it } from 'vitest';
import { ContainerWrapper } from './container';
import { PortfolioPage } from 'src/Page/PortfolioPage';
import portfolioMock from 'src/__mocks__/portfolio.mock.json';

vi.mock('axios', async () => {
	const create = vi.fn().mockImplementation(({ baseURL }) => {
		return {
			get: vi.fn().mockImplementation((url) => {
				const apiFilterUrl: string = baseURL + url;
				if (
					apiFilterUrl.includes(
						'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=ethereum%2Cbitcoin%2Cbanano&order=market_cap_desc&per_page=100&page=1&sparkline=false'
					)
				) {
					return { data: portfolioMock };
				}
			})
		};
	});

	return { default: { create } };
});

describe('Portfolio page', () => {
	let Portfolio: RenderResult;

	beforeEach(() => {
		Portfolio = render(<PortfolioPage />, { wrapper: ContainerWrapper });
	});

	it('should render portfolio page title', async () => {
		expect((await screen.findByText('Your Portfolio')).textContent).toBe(
			'Your Portfolio'
		);
	});

	// it('should render portfolio user table', async () => {
	// 	expect((await screen.findByText('Ethereum')).textContent).toBe('Ethereum');
	// });
});
