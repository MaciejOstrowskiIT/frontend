import { FormValues, AuthResponse } from "../../../types/authTypes";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { userSchema } from "../utils/userSchema";
import { FC } from "react";
import Button from "@mui/material/Button";
import GoogleIcon from "@mui/icons-material/Google";
import {
	Avatar,
	Box,
	Checkbox,
	FormControlLabel,
	Grid,
	Link,
	Typography,
	useMediaQuery
} from "@mui/material";
import { Copyright } from "@mui/icons-material";
import { FontSize, Text } from "../../../components/Text";
import { FormInput } from "../../../components/FormInput";
import { FormTextfield } from "../../../components/FormTextfield";
import { useAuthorizedRequest } from "../../../hooks/useAuthorizedReq";
import { useAlert } from "../../../providers/AlertProvider";
import { useLogin } from "../../../providers/LoginProvider";


export const Login: FC = () => {
	const navigate = useNavigate();
	const {
		handleSubmit,
		control
	} = useForm<Pick<FormValues, "email" | "password">>( {
		resolver: yupResolver( userSchema ),
		mode: "onSubmit",
		defaultValues: {
			email: "",
			password: "",
		}
	} );

	const { setMessage } = useAlert();
	const { postRequest } = useAuthorizedRequest();
	const { setUser } = useLogin();

	//TODO: Refactor useMediaQuery
	const largeScreen = useMediaQuery( "(min-width:2020px)" );
	const normalScreen = useMediaQuery( "(min-width:1800px)" );

	const navigateToDashboard = () => {
		navigate( "/dashboard" );
	};
	const navigateToRegister = () => {
		navigate( "/auth/register" );
	};

	const onSubmit: SubmitHandler<FormValues> = async (data) => {
		console.log(data);
		await postRequest<AuthResponse>( "api/login", data )
			.then( (response) => {
				if ( response.data.status === "200" ) {
					setUser( response.data );
					console.log("response.data.user ", response.data.user)
					console.log("response.data ", response.data)
					setMessage( { content: response.data.message, alertType: "info" } );
					navigateToDashboard();
				}
				else {
					setMessage( { content: response.data.message, alertType: "warning" } );
				}
			} )
			.catch( (err) => console.log( err ) );
	};


	/*jesli chcesz poprawnie stylowac komponenty mui to stworz sobie folder components w src i tam tworz
	swoje customowe komponenty z wykorzystaniem funkcji styled z MUI https://mui.com/system/styled/ */

	return (
		<>
			<Grid item
				sx={ {
					borderRadius: normalScreen ? "0px 50px 50px 0px" : "50px",
					background: "white",
					height: "100%",
					minWidth: normalScreen ? { xs: "10%", md: "10%" } : { xs: "80%", md: "80%" }
				} }
				xs={ normalScreen ? 6 : 12 }>
				<Box
					sx={ {
						px: largeScreen ? "70px" : "20px",
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					} }
				>
					<Avatar sx={ { m: 1, bgcolor: "secondary.main" } }/>
					<FormInput text={ "test" }
						label={ "test" }
						required={ true }
						fullWidth={ true }/>
					<Text size={ FontSize.BIG }
						text={ "Sign in" }/>
					<Typography component="h1"
						sx={ { mt: "25%" } }
						variant="h3">
						Welcome Back
					</Typography>
					<Typography component="p">
						Enter your email and password to access your account
					</Typography>
					<Box component="form"
						onSubmit={ handleSubmit( onSubmit ) }
						sx={ { mt: 5, } }>
						<FormTextfield
							control={ control }
							name={ "email" }
							margin={ "normal" }
							fullWidth
							autoFocus
							id="email"
							label="Email Address"
							autoComplete="email"
						/>
						<FormTextfield
							control={ control }
							name={ "password" }
							margin={ "normal" }
							fullWidth
							autoFocus
							id="password"
							type="password"
							label="Password"
							autoComplete="current-password"
						/>
						<FormControlLabel
							control={ <Checkbox value="remember"
								color="primary"/> }
							label="Remember me"
						/>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={ {
								mt: 3,
								mb: 2,
								color: "white",
								backgroundColor: "black",
								borderRadius: "10px",
								textDecoration: "none",
								fontWeight: "bold"
							} }
						>
							Sign In
						</Button>
						<Button
							fullWidth
							variant="outlined"
							sx={ { textTransform: "none", color: "black", borderRadius: "10px" } }
						><GoogleIcon sx={ { pr: 1 } }/>
							Sign In with Google
						</Button>
						<Grid container>
							<Grid item
								xs>
								<Link href="#"
									variant="body2"
									sx={ { color: "black", textDecoration: "none", fontWeight: "bold" } }>
									Forgot password?
								</Link>
							</Grid>
							<Grid item>
								<Link
									onClick={ navigateToRegister }
									variant="body2"
									sx={ { color: "black", cursor: "pointer", fontWeight: "bold" } }>
									{ "Don't have an account? Sign Up" }
								</Link>
							</Grid>
						</Grid>
						<Copyright sx={ { mt: 5 } }/>
					</Box>
				</Box>
			</Grid>
		</>
	);
};