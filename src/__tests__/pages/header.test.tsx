import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { SearchBar } from 'src/Components/Header/SearchBar';
import { describe, expect, it, vi } from 'vitest';
import searchMock from 'src/__mocks__/searchCrypto.mock.json';

vi.mock('axios', async () => {
	const create = vi.fn().mockImplementation(({ baseURL }) => {
		return {
			get: vi.fn().mockImplementation((url) => {
				const apiFilterUrl: string = baseURL + url;
				if (
					apiFilterUrl.includes(
						'https://api.coingecko.com/api/v3/search?query=Bit'
					)
				) {
					return { data: searchMock };
				}
			})
		};
	});

	return { default: { create } };
});

describe('Header test', () => {
	it('should input searchbox', () => {
		render(<SearchBar />);
		const input = screen.getByPlaceholderText(
			'Search Currency or Exchange'
		) as HTMLInputElement;
		fireEvent.change(input, { target: { value: 'Bit' } });
		expect(input.value).toBe('Bit');
	});

	it('should render with auto complete in searchbox', async () => {
		const { container } = render(<SearchBar />);
		const input = screen.getByPlaceholderText(
			'Search Currency or Exchange'
		) as HTMLInputElement;
		fireEvent.change(input, { target: { value: 'Bit' } });
		fireEvent.blur(input);
		const suggestBox = await screen.findAllByRole('option');
		expect(suggestBox[0].textContent).toBe('Bitcoin');
		expect(suggestBox[1].textContent).not.toBe('Ethereum');
		expect(suggestBox[2].textContent).toBe('Bitcoin Cash');
		expect(container.children).toMatchSnapshot();
	});
});
