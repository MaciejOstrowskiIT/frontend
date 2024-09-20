import { AuthResponse, RegisterFormFields } from "types";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "./registerSchema";
import { FC } from "react";
import { Avatar, Box, Button, Grid, Link, Typography, useMediaQuery } from "@mui/material";
import { Copyright, Google as GoogleIcon } from "@mui/icons-material";
import { useAuthorizedRequest } from "hooks";
import { useAlertContext } from "providers";
import { FormTextfield } from "components";

export const Register: FC = () => {
	const {setMessage} = useAlertContext();
	const {postRequest} = useAuthorizedRequest();

	const navigate = useNavigate();
	const {
		control,
		handleSubmit,
	} = useForm<RegisterFormFields>({
		resolver: yupResolver(registerSchema),
		mode: "all",
		defaultValues: {
			username: "",
			email: "",
			password: "",
			repeatPassword: "",
		},
	});

	//TODO: Refactor useMediaQuery
	const largeScreen = useMediaQuery("(min-width:2020px)");
	const normalScreen = useMediaQuery("(min-width:1800px)");
	const navigateToLogin = () => {
		navigate("/auth/login");
	};

	const onSubmit: SubmitHandler<RegisterFormFields> = async(data) => {
		await postRequest<AuthResponse>("api/signup", data).then((response) => {
			if (response.data.status === "201") {
				setMessage({content: "test", alertType: "success"});
				navigate("/auth/login");
			} else {
				return console.log(response.data.message);
			}
		}).catch((err) => setMessage({content: err, alertType: "error"}))
	};


	return (
			<Grid item
				sx={{
					borderRadius: normalScreen ? "0px 50px 50px 0px" : "50px",
					background: "white",
					height: "100%",
					minWidth: normalScreen ? {xs: "10%", md: "10%"} : {xs: "80%", md: "80%"},
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
					<Avatar sx={{m: 1, bgcolor: "secondary.main"}}>
					</Avatar>
					<Typography component="h1"
						variant="h5">
						Sign up
					</Typography>
					<Typography component="h1"
						sx={{mt: 3}}
						variant="h3">
						Welcome
					</Typography>
					<Typography component="p">
						Enter your email and password to create your new account
					</Typography>
					<Box component="form"
						onSubmit={handleSubmit(onSubmit)}
						sx={{mt: 5}}>
						<FormTextfield
							control={control}
							name={"email"}
							margin={"normal"}
							fullWidth
							autoFocus
							id="email"
							label="Email Address"
							autoComplete="email"
						/>
						<FormTextfield
							control={control}
							name={"username"}
							margin={"normal"}
							fullWidth
							autoFocus
							id="username"
							type="text"
							label="Username"
						/>
						<FormTextfield
							control={control}
							name={"password"}
							margin={"normal"}
							fullWidth
							autoFocus
							id="password"
							type="password"
							label="Password"
							autoComplete="current-password"
						/>
						<FormTextfield
							control={control}
							name={"repeatPassword"}
							margin={"normal"}
							fullWidth
							autoFocus
							id="repeatPassword"
							type="password"
							label="Repeat Password"
							autoComplete="current-password"
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
							Sign Up
						</Button>
						<Button
							type="submit"
							fullWidth
							variant="outlined"
							sx={{textTransform: "none", color: "black", borderRadius: "10px"}}
						><GoogleIcon sx={{pr: 1}}/>
							Sign Up with Google
						</Button>
						<Grid container>
							<Grid item>
								<Link
									onClick={navigateToLogin}
									variant="body2"
									sx={{color: "black", cursor: "pointer", fontWeight: "bold"}}>
									{"Already registered? Sign In!"}
								</Link>
							</Grid>
						</Grid>
						<Copyright sx={{mt: 5}}/>
					</Box>
				</Box>
			</Grid>
	);
};
