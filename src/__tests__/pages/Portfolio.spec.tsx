import { render, screen, RenderResult } from '@testing-library/react';

import { describe, expect, beforeEach, vi, it, afterEach } from 'vitest';
import { ContainerWrapper } from './container';
import { PortfolioPage } from 'src/Page/PortfolioPage';
import portfolioMock from 'src/__mocks__/portfolio.mock.json';

import { storageObject } from 'src/utils';

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
	it('should render portfolio page title', async () => {
		render(
			<ContainerWrapper>
				<PortfolioPage />
			</ContainerWrapper>
		);
		expect((await screen.findByText('Your Portfolio')).textContent).toBe(
			'Your Portfolio'
		);
	});

	it('should not render portfolio user table', async () => {
		vi.spyOn(storageObject, 'get').mockReturnValue([]);
		render(
			<ContainerWrapper>
				<PortfolioPage />
			</ContainerWrapper>
		);
		expect(
			(await screen.findByText('Not found any cryptocurrency in your browser'))
				.textContent
		).toBe('Not found any cryptocurrency in your browser');
	});

	it('should render portfolio user table', async () => {
		vi.spyOn(storageObject, 'get').mockReturnValue([
			'ethereum',
			'bitcoin',
			'banano'
		]);
		const { container } = render(
			<ContainerWrapper>
				<PortfolioPage />
			</ContainerWrapper>
		);

		expect((await screen.findByText('Bitcoin')).textContent).toBe('Bitcoin');
		expect((await screen.findByText('Ethereum')).textContent).toBe('Ethereum');
		expect((await screen.findByText('Banano')).textContent).toBe('Banano');
		expect(container.children[0]).toMatchSnapshot();
	});
});
