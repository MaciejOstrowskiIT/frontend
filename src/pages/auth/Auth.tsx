import { Box, Grid, Grow, Snackbar, Typography, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import { AlertContextType } from "../../providers/AlertProvider";

export const Auth = () => {

	const [ openSnackbar, setOpenSnackbar ] = useState( false );
	const handleCloseSnackbar = () => {
		setOpenSnackbar( false );
	};

	const normalScreen = useMediaQuery( "(min-width:1800px)" );
	const smallScreen = useMediaQuery( "(min-width:900px)" );
	const mobile = useMediaQuery( "(min-width:600px)" );

	return (
		<>
			<Snackbar
				open={ openSnackbar }
				autoHideDuration={ 4000 }
				onClose={ handleCloseSnackbar }
				anchorOrigin={ {
					vertical: "top",
					horizontal: "center"
				} }
			/>
			<Box display="flex"
				alignItems="center"
				justifyContent="center"
				minHeight="100vh"
				sx={ {
					backgroundImage: "url(https://source.unsplash.com/random?wallpapers)",
					backgroundRepeat: "no-repeat",
					backgroundSize: "cover",
					backgroundPosition: "center",
					height: "100vh"
				} }>
				<Grid container
					direction="row"
					justifyContent="center"
					alignItems="center"
					alignContent="center"
					rowSpacing={ 1 }
					columnSpacing={ { md: 0 } }
					sx={ {
						maxWidth: mobile ? { xs: "80%", md: "80%" } : { xs: "100%", md: "0" }
					} }
				>
					<Grid item
						container
						sx={ {
							height: "80vh",
							borderRadius: "50px",
						} }
						xs={ smallScreen ? 8 : 12 }>
						{ normalScreen && (<Grid item
							sx={ {
								height: "100%",
								border: "10px solid white",
								borderRadius: "50px",
								background: "transparent",
								boxShadow: "50px 0px 0px 0px white",
							} }
							xs={ 6 }>
							<Grid item
								sx={ {
									py: 3,
									px: 7,
									display: "flex",
									flexDirection: "column",
									justifyContent: "space-between",
									color: "white",
									height: "100%",
								} }
							>
								<Typography component="h2"
									variant="h5"> A WISE QUOTE </Typography>
								<Grid item>
									<Typography component="p"
										sx={ { fontSize: "4vw" } }> Get Everything You Want </Typography>
									<Typography component="p"> You can get everything you want if you work hard. </Typography>
									<Typography component="p"> Trust the process, and stick to the plan. </Typography>
								</Grid>
							</Grid>
						</Grid>) }
							<Outlet/>
					</Grid>
				</Grid>
			</Box>
		</>
	);
};