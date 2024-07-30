import { boolean, object, string } from "yup";

// const peselOrNipRegex = /^(?:[0-9]{11}|[0-9]{10})$/;


export const personalizationSchema = object( {
	email: string().email().required( "Email is required" ),
	address: string().required( "Address is required" ),
	fullName: string().required( "Full Name is required" ),
	gender: string().required( "Gender is required" ),
	motherName: string().required( "Mother's Name is required" ),
	NIP: string().nullable()
		.required( "PESEL or NIP is required" ),
	PESEL: string().nullable()
		.required( "PESEL or NIP is required" ),
	isCompanyAccount: boolean().required(),
} );
