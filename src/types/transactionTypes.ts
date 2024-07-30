export interface Transaction {
	_id?: string
	debit: number;
	credit: number;
	date: string;
	value: string;
	senderName: string;
	senderAccount: string;
	receiverName: string;
	receiverAccount: string;
}

