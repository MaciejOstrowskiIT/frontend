import { number, object, string } from "yup";

export const transactionSchema = object( {
	debit: number().required( "Debit is required" ).moreThan(0),
	credit: number().required( "Credit is required" ).moreThan(0),
	value: string().required( "Value is required" ),
	senderName: string().required( "Sender mame is required" ),
	senderAccount: string().required( "Sender account is required" ),
	receiverAccount: string().required( "Receiver account is required" ),
} );