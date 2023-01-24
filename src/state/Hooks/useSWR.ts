import { Method } from 'axios';
import useSWR from 'swr';
import { axiosInstance } from 'src/Services/ApiService';

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
	const { data, error, isLoading } = useSWR(`${path}`, fetcher, swrOptions);
	return { data, error, isLoading };
}
