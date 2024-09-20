export interface AuthResponse {
	status: string;
	message: string;
	token: string;
	user: {
			username: string
			email: string
			_id: string
	};
}
