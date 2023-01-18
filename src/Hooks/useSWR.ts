import axios, { Method } from 'axios';
import useSWR from 'swr';
import { axiosInstance } from '../Services/ApiService';

const defaultConfig = {
	revalidateOnFocus: true
};

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export function useFetch<T>(
	path: string,
	method: Method,
	swrOptions = defaultConfig
): { data: T; error: unknown; isLoading: boolean } {
	const { data, error, isLoading } = useSWR(
		`https://api.coingecko.com/api/v3/coins/markets${path}`,
		fetcher
	);
	return { data, error, isLoading };
}
