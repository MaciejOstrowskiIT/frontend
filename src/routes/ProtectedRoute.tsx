import { Route, BrowserRouter as Router, Routes, Outlet } from "react-router-dom";
import { useAuthorizedRequest } from "../hooks/useAuthorizedReq";
import { useEffect, useState } from "react";


export const ProtectedRoute = () => {

	const { getRequest } = useAuthorizedRequest();
	const [ isPermitted, setIsPermitted ] = useState( false );

	const getPermission = async () => {
		await getRequest<string>( "api/get-permissions", "4001" )
			.then( (res) => {
				console.log( res.data );
				res.data === "admin"
					? setIsPermitted( true )
					: setIsPermitted( false );

			} )
			.catch( (err) => console.log( err ) );
	};
	/*
	Tutaj fajnie będzie zrobić z getPermission hooka, który będzie sprawdzał permisję już na poziomie logowania, żeby
	 można było prosto i fajnie stworzyć Menu, które będzie odpowiednio przy uzyskaniu permisji wyświetlać bądź nie
	  dany element, który jest zastrzeżony dla danego usera
	 */

	useEffect( () => {
		getPermission();
	}, [] );

	return (
		<>
			{ isPermitted ? <Outlet/> : <h1>Not permitted</h1> }
		</>
	);
};