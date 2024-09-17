import { object, ref, string } from "yup";

export const userSchema = object( {
	username: string().min( 3 , "Incorrect Username"),
	email: string().email().required('Email is required'),
	password: string().required("Password is required").min( 5 ), // w przypadku rejestracji przydalaby sie lepsza walidacja hasla (regex)
	repeatPassword: string().oneOf([ref("password")], "Passwords must match")
} );


/*
1. To nie util, to schema
2. Po co przy logowaniu jest Ci repeatPassword?
3. Kazdy formularz powinien miec swoje unikalne schema (nawet jak sa identyczne chwilowo)
	- a co jesli do rejestracji dorzucimy numer telefonu?
	- mozesz miec je na gorze komponentu
	- nazwa powinna odnosic sie do formularza, ktorego dotyczy (nawet jesli jest w tym samym pliku), 
	czyli nie userSchema, tylko loginSchema lub registerSchema. To nie jest formularz usera, tylko formularz rejestracji lub loginu.
*/