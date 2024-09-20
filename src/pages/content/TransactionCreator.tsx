import { useEffect, useState } from "react";
import { useAuthorizedRequest } from "hooks";
import { SubmitHandler, useForm } from "react-hook-form";
import { AuthResponse, Transaction } from "types";
import { transactionSchema } from "../dashboard/utils/transactionSchema";
import { useAlertContext, useLoginContext } from "providers";
import { FormSelect, FormTextfield, SelectOption } from "components";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, CssBaseline, Grid, Paper } from "@mui/material";
/*
1. Sender account
	- te dane powinny byc autouzupelnione.
	- stworzyc funkcje (ewentualnie endpoint) do pobierania danych usera na ktorym jestesmy
	- zaladowanie tych dnaych do forma jako defaultValues
	- te inputy dotyczace senderAccount powinny byc niezmienialne


2. Receiver account
	- powinnismy miec select, w ktorym pobieramy dostepne konta
	- z bazy pobieramy wszystkie konta (jakims getem)
	- filtrujemy i pakujemy do selecta, select przyjmuje obiekty w strukturze {label: string, value: unknown}.
	- value powinno byc ID konta
	- label to powinna byc numer konta / nazwa uzytkownika
	- po wybraniu danego konta reszta danych powinna byc automatycznie uzupelniona:
	-- wybieramy numer konta z selecta -> automatycznie uzupelniaja sie pola takie jak: name, lastName, address itp 
*/

type UserDetails = {
	accountNumber: string
}
type Data = {
	userAccounts: Array<{
		userName: string,
		accountNumber: string,
	}
	>
}

type FormValuesType = Omit<Transaction, "date" | "receiverName">

export const TransactionCreator = () => {
	const {postRequest, getRequest} = useAuthorizedRequest();
	const {setMessage} = useAlertContext();
	const {userData} = useLoginContext();
	const [userDetails, setUserDetails] = useState(""); // accountNumber lub senderAccountNumber
	const [accountParams, setAccountsParams] = useState("8");
	const [accountOptions, setAccountOptions] = useState<SelectOption[]>([]);

	const {
		handleSubmit,
		control,
	} = useForm<FormValuesType>({
		resolver: yupResolver(transactionSchema),
		mode: "onSubmit",
		defaultValues: {
			debit: 0,
			credit: 0,
			value: "",
			senderName: userData?.username,
			senderAccount: userDetails,
			receiverAccount: "", //receiverAccountNumber
		},
	});


	const mapAccountsToOptions = ({userAccounts}: Data): SelectOption[] => {
		return userAccounts.map((account) => ({
			value: account.accountNumber,
			label: account.userName,
		}));
	};

	const getUserProfile = async() => {
		await getRequest<UserDetails>(`api/get-user-data/${userData?._id}`).then((res) => {
			setUserDetails(res.data.accountNumber);
		}).catch((err) => console.log(err));
	};
	const findAccounts = async() => {
		await getRequest<Data>(`api/find-accounts/${accountParams}`).then((res) => {
			const mappedAccounts = mapAccountsToOptions(res.data);
			setAccountOptions(mappedAccounts);
		}).catch((err) => console.log(err));
	};

	useEffect(() => {
		getUserProfile();
		findAccounts();
	}, []);


	const onSubmit: SubmitHandler<FormValuesType> = async(data) => {
		const receiverObj = accountOptions.find((account) => account.value === data.receiverAccount);
		const body = {...data, receiverName: receiverObj?.label};
		await postRequest<AuthResponse>("api/add-new-transaction", body).then(() => {
			setMessage({alertType: "success", content: "Transaction successfully created!"});
		}).catch((err) => setMessage({alertType: "error", content: "Something went wrong"}));
	};

	return (
		<>
			<CssBaseline/>
			<Grid
				sx={{padding: 2, display: "flex", justifyContent: "center"}}>
				<Paper elevation={2}
					sx={{p: 4}}>
					<form onSubmit={handleSubmit(onSubmit)}>
						<Grid container
							spacing={2}>
							<Grid item
								xs={12}
								md={12}
								sx={{display: "flex", flexDirection: "column", gap: "10px"}}>
								<FormTextfield control={control}
									name={"debit"}
									label="Debit"
									type="number"
									fullWidth
								/>
								<FormTextfield control={control}
									name={"credit"}
									label="Credit"
									type="number"
									fullWidth
								/>
								<FormTextfield control={control}
									name={"value"}
									label="Value"
									type="number"
									fullWidth
								/>
							</Grid>
							<Grid item
								xs={12}
								md={12}
								sx={{display: "flex", flexDirection: "column", gap: "10px"}}>
								<FormTextfield control={control}
									name={"senderName"}
									label="Sender Name"
									fullWidth
									disabled
								/>
								<FormTextfield control={control}
									name={"senderAccount"}
									label="Sender Account"
									fullWidth
									disabled
								/>
								<FormSelect
									control={control}
									name="receiverAccount"
									label="Receiver Account"
									id="receiver-account-id"
									options={accountOptions}
								/>
								{/*
							mozesz tutaj dodac niekontrolowanego inputa, ktory bedzie sie pojawial
							po kliknieciu switcha z nazwa 'Show account number'
							* conditional rendering
							*/}
							</Grid>
						</Grid>
						<Button type="submit"
							variant="contained"
							color="primary">
							Submit
						</Button>
					</form>
				</Paper>
			</Grid>
		</>
	);
};