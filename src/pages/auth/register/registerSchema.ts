import { object, ref, string } from "yup";

const registerSchema = object({
	username: string().min(3, "Incorrect Username").required(),
	email: string().email().required('Email is required').required(),
	password: string().required("Password is required").min(5, "Password must be at least 5 characters").matches(
		/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+=\-{};:"<>,./?]).{5,}$/,
		"Password must contain at least one letter, one number, and one special character",
	),
	repeatPassword: string().oneOf([ref("password")], "Passwords must match").required(),
});


export { registerSchema }