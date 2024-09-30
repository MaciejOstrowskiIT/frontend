import { AuthResponse, LoginFormFields } from "types";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "./loginSchema";
import { FC, useEffect } from "react";
import {
	Button,
	Avatar,
	Box,
	Checkbox,
	FormControlLabel,
	Grid,
	Link,
	Typography,
	useMediaQuery,
} from "@mui/material";
import { Copyright, Google as GoogleIcon } from "@mui/icons-material";
import { FontSize, Text, FormTextfield } from "components";
import { useAuthorizedRequest } from "hooks";
import { useAlertContext, useLoginContext } from "providers"

const defaultValues: LoginFormFields = {
	email: "",
	password: "",
};


export const Login: FC = () => {
	const navigate = useNavigate();
	const {
		handleSubmit,
		control,
	} = useForm<LoginFormFields>({
		resolver: yupResolver(loginSchema),
		mode: "all",
		defaultValues,
	});



	const { setMessage } = useAlertContext();
	const { postRequest } = useAuthorizedRequest();
	const { setUser } = useLoginContext();

	//TODO: Refactor useMediaQuery
	const largeScreen = useMediaQuery("(min-width:2020px)");
	const normalScreen = useMediaQuery("(min-width:1800px)");

	const navigateToDashboard = () => {
		navigate("/dashboard");
	};
	const navigateToRegister = () => {
		navigate("/auth/register");
	};
	useEffect(() => {
		console.log('hello')
	}, [])

	const onSubmit: SubmitHandler<LoginFormFields> = async (data) => {
		console.log(data);
		await postRequest<AuthResponse>("api/login", data).then((response) => {
			if (response.data.status === "200") {
				setUser(response.data);
				setMessage({ content: response.data.message, alertType: "info" });
				navigateToDashboard();
			} else {
				setMessage({ content: response.data.message, alertType: "warning" });
			}
		}).catch((err) => console.log(err));
	};


	/*jesli chcesz poprawnie stylowac komponenty mui to stworz sobie folder components w src i tam tworz
	swoje customowe komponenty z wykorzystaniem funkcji styled z MUI https://mui.com/system/styled/ */

	return (
		<>
			<Grid item
				sx={{
					borderRadius: normalScreen ? "0px 50px 50px 0px" : "50px",
					background: "white",
					height: "100%",
					minWidth: normalScreen ? { xs: "10%", md: "10%" } : { xs: "80%", md: "80%" },
				}}
				xs={normalScreen ? 6 : 12}>
				<Box
					sx={{
						px: largeScreen ? "70px" : "20px",
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					<Avatar sx={{ m: 1, bgcolor: "secondary.main" }} />
					<Text size={FontSize.BIG}
						text={"Sign in"} />
					<Typography component="h1"
						sx={{ mt: "25%" }}
						variant="h3">
						Welcome Back
					</Typography>
					<Typography component="p">
						Enter your email and password to access your account
					</Typography>
					<Box component="form"
						onSubmit={handleSubmit(onSubmit)}
						sx={{ mt: 5 }}>
						<FormTextfield
							control={control}
							name={"email"}
							margin={"normal"}
							fullWidth

							id="email"
							label="Email Address"
							autoComplete="email"
						/>
						<FormTextfield
							control={control}
							name={"password"}
							margin={"normal"}
							fullWidth

							id="password"
							type="password"
							label="Password"
							autoComplete="current-password"
						/>
						<FormControlLabel
							control={<Checkbox value="remember"
								color="primary" />}
							label="Remember me"
						/>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{
								mt: 3,
								mb: 2,
								color: "white",
								backgroundColor: "black",
								borderRadius: "10px",
								textDecoration: "none",
								fontWeight: "bold",
							}}
						>
							Sign In
						</Button>
						<Button
							fullWidth
							variant="outlined"
							sx={{ textTransform: "none", color: "black", borderRadius: "10px" }}
						><GoogleIcon sx={{ pr: 1 }} />
							Sign In with Google
						</Button>
						<Grid container>
							<Grid item
								xs>
								<Link href="#"
									variant="body2"
									sx={{ color: "black", textDecoration: "none", fontWeight: "bold" }}>
									Forgot password?
								</Link>
							</Grid>
							<Grid item>
								<Link
									onClick={navigateToRegister}
									variant="body2"
									sx={{ color: "black", cursor: "pointer", fontWeight: "bold" }}>
									{"Don't have an account? Sign Up"}
								</Link>
							</Grid>
						</Grid>
						<Copyright sx={{ mt: 5 }} />
					</Box>
				</Box>
			</Grid>
		</>
	);
};