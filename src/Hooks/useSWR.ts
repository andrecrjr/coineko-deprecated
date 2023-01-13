import { Method } from 'axios';
import useSWR, { SWRConfiguration } from 'swr';
import { axiosInstance } from '../Services/ApiService';

const defaultConfig = {
	revalidateOnFocus: true
};

export function useFetch(
	path: string,
	method: Method,
	swrOptions = defaultConfig
) {
	const data = useSWR(
		path,
		async (url: string) => {
			const resp = await axiosInstance.request({ method, url });
			return resp.data;
		},
		swrOptions
	);
	return data;
}
