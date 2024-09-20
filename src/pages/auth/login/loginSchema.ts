import { object, string } from "yup";

const loginSchema = object({
	email: string().email().required('Email is required'),
	password: string().required('Password is required'),
});


export { loginSchema }