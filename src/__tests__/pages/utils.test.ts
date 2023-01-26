import { storageObject } from 'src/utils';
import { describe, expect, it, vi } from 'vitest';

describe('Unit tests for Utils', () => {
	it('should get item from storageObject utils', () => {
		vi.spyOn(Storage.prototype, 'getItem').mockReturnValue(
			JSON.stringify(['bitcoin', 'ethereum'])
		);
		const local = storageObject.get<string[]>('portfolio');
		expect(local).toHaveLength(2);
		expect(local[0]).toBe('bitcoin');
	});
	it('should return empty from storageObject utils', () => {
		vi.spyOn(Storage.prototype, 'getItem').mockReturnValue(null);
		const local = storageObject.get<string[]>('portfolio');

		expect(local).toHaveLength(0);
		expect(local).not.toBeNull();
		expect(local).toStrictEqual([]);
	});

	it('should set item to storageObject utils', () => {
		let localstorageData = '';
		vi.spyOn(Storage.prototype, 'setItem').mockImplementation(
			(data: string, item: string) => {
				localstorageData = localstorageData + item;
				return localstorageData;
			}
		);
		storageObject.set('portfolio', ['bitcoin', 'banano']);
		vi.spyOn(Storage.prototype, 'getItem').mockReturnValue(localstorageData);
		const getLocal = storageObject.get<string>('portfolio');
		console.log(getLocal);
		expect(getLocal).toHaveLength(2);
	});
});
