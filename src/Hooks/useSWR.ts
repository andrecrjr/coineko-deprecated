import axios, { Method } from 'axios';
import useSWR from 'swr';
import { axiosInstance } from '../Services/ApiService';

const defaultConfig = {
	revalidateOnFocus: true
};

const fetcher = async (url: string) => {
	const { data } = await axiosInstance.get(url);
	return data;
};

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
