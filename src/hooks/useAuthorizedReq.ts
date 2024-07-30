import axios from "axios";

const getRequest = async <T>(url: string, port: string = "4000") =>

	axios.get<T>( `http://192.168.1.71:${port}/${ url }`, {
		headers: { "Authorization": sessionStorage.getItem( "token" ) }
	} );

const postRequest = async <T>(url: string, data: any, port: string = "4000") =>
	axios.post<T>( `http://192.168.1.71:${port}/${ url }`,
		data,
		{
			headers: {
				"Authorization": sessionStorage.getItem( "token" ) || "",
				"Content-Type": "application/json"
			}
		} );

export const useAuthorizedRequest = () => {
	return { getRequest, postRequest };
};
