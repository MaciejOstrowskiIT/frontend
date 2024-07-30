import { object, ref, string } from "yup";

export const userSchema = object( {
	username: string().min( 3 , "Incorrect Username"),
	email: string().email().required('Email is required'),
	password: string().required("Password is required").min( 5 ),
	repeatPassword: string().oneOf([ref("password")], "Passwords must match")
} );