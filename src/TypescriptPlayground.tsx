
import { useState } from "react";

type Person = {
	name: string,
	lastName: string,
	age: number,
	isMarried: boolean
}

interface PersonWithCountry extends Person {
	country: string
}
type PersonWithCountryType = Person & {
	country: string
}

type PersonWithoutName = Omit<Person, 'name'>;
type PersonName = Pick<Person, 'name'>;

type PersonWithDetails = Omit<Person, 'isMarried'> & {
	details: {
		isMarried: boolean,
		country: string
	}
}

type Details = {
	country: string,
	alive: boolean;
}

type GenericPerson<T> = {
	person: Person,
	data: T
}

enum Country  {
	'USA' = "United states of America",
	'PL' = 'Poland'
}
export const TypescriptPlayground = () => {
	const [field, setField] = useState(0)

	const genericPerson:GenericPerson<Details> = {
		person: {
			name: 'Joe',
			lastName: "Doe",
			age: 20,
			isMarried: true
		},
		data: {country: 'usa', alive: false}
	}

	const name:PersonName = { name: "Joe" };

	const person:PersonWithDetails = {
		name: 'Joe',
		lastName: "Doe",
		age: 20,
		details: {isMarried: true, country: "USa"},
	}

return (
	<div>
		{/*<button onClick={(event) => setField((prevState) => prevState > 10 ? event.target : prevState)}>change state</button>*/}
	</div>
)}

