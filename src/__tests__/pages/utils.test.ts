import { storageObject } from 'src/utils';
import { describe, expect, it, vi } from 'vitest';

vi.spyOn(Storage.prototype, 'getItem').mockReturnValue(
	JSON.stringify(['bitcoin', 'ethereum'])
);
vi.spyOn(Storage.prototype, 'setItem').mockImplementation((data: string) => {
	const local = [];
	local.push(data);
	return local;
});

describe('Unit tests for Utils', () => {
	it('should get item from localstorage', () => {
		const local = storageObject.get<string[]>('portfolio');
		expect(local).toHaveLength(2);
		expect(local[0]).toBe('bitcoin');
	});
});
