import { useState, createContext, useContext, FC, ReactNode, useEffect } from "react";
import { AuthResponse } from "types/AuthResponse";

export interface LoginProviderProps {
	children: ReactNode;
}

export interface LoginContextType {
	username: string | null;
	setUsername: (msg: string) => void;
	setUser: (data: AuthResponse) => void; // auth response zmienic na UserResponse, tj. backend ma zwracac te dane, ktore sa w typie UserResponse;
	userData: UserData | null;
}

interface UserData {
	username: string;
	email: string;
	_id: string;
}

const LoginContext = createContext<LoginContextType | null>(null);

export const useLoginContext = () => {
	const context = useContext(LoginContext);
	if (!context) {
		throw new Error("useLogin must be used within an LoginProvider");
	}
	return context;
};


export const LoginProvider: FC<LoginProviderProps> = ({ children }) => {

	//tutaj w zasadzie potrzebujemy przechowywac tylko JWT token
	const [username, setUsername] = useState(sessionStorage.getItem("token"));
	//to tez jest potrzebne
	const [userData, setUserData] = useState<UserData | null>(null);

	const setUser = (data: AuthResponse) => {
		sessionStorage.setItem("token", data.token);
		setUserData({
			username: data.user.username,
			email: data.user.email,
			_id: data.user._id,
		});
		console.log(userData);
	};

	useEffect(() => {
		//tutaj powinnismy robic axios.get(/user-info*).then((res) => 
		// setUserData( {
		// 	username: res.data.user.username,
		// 	email: res.data.user.email,
		// 	_id: res.data.user._id,
		// } );	
		// )
	}, []) //pusty array, zeby wykonywal sie po kazdym refreshu contextu

	return (
		<LoginContext.Provider
			value={{
				username,
				setUsername,
				setUser,
				userData
			}}
		>
			{children}
		</LoginContext.Provider>
	);
};
