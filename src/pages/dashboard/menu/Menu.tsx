import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import {
	Box,
	CssBaseline,
	Divider,
	Drawer,
	IconButton,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Toolbar,
	Typography,
} from "@mui/material";
import { ChevronLeft as ChevronLeftIcon, ChevronRight as ChevronRightIcon, Logout, Menu as MenuIcon } from "@mui/icons-material";
import { Outlet, useNavigate } from "react-router-dom";
import { useAlertContext, useLoginContext } from "providers";
import { useAuthorizedRequest } from "hooks";
import { AppBar } from "./components/AppBar";
import { Main } from "./components/Main";
import { DrawerHeader } from "./components/DrawerHeader";
import { MenuElements, ProtectedMenuElements } from "./constants";

const drawerWidth = 240;

export const Menu = () => {
	const theme = useTheme();
	const [open, setOpen] = useState(true);
	const [selectedIndex, setSelectedIndex] = useState(-1);
	const navigate = useNavigate();
	const {setMessage} = useAlertContext();
	const {userData} = useLoginContext();
	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};
	const handleLogout = () => {
		sessionStorage.removeItem("token");
		sessionStorage.removeItem("email");
		navigate("/auth/login");
		setMessage({content: "Logged out", alertType: "info"});
	};

	const {getRequest} = useAuthorizedRequest();
	const [isPermitted, setIsPermitted] = useState(false);

	const getPermission = async() => {
		await getRequest<string>("api/get-permissions", "4001").then((res) => {
			console.log(res.data);
			res.data === "admin"
				? setIsPermitted(true)
				: setIsPermitted(false);

		}).catch((err) => console.log(err));
	};
	/*
	Tutaj fajnie będzie zrobić z getPermission hooka, który będzie sprawdzał permisję już na poziomie logowania, żeby
	 można było prosto i fajnie stworzyć Menu, które będzie odpowiednio przy uzyskaniu permisji wyświetlać bądź nie
	  dany element, który jest zastrzeżony dla danego usera
	 */

	useEffect(() => {
		getPermission();
	}, []);


	return (
		<Box sx={{display: "flex"}}>
			<CssBaseline/>
			<AppBar
				open={open}>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						onClick={handleDrawerOpen}
						edge="start"
						sx={{mr: 2, ...(open && {display: "none"})}}
					>
						<MenuIcon/>
					</IconButton>
					<Typography variant="h6"
						noWrap
						component="div">
						Dashboard
					</Typography>
				</Toolbar>
			</AppBar>
			<Box sx={{display: "flex", justifyContent: "stretch"}}>
				<Drawer
					sx={{
						padding: "10px",
						width: drawerWidth,
						flexShrink: 0,
						"& .MuiDrawer-paper": {
							width: drawerWidth,
							boxSizing: "border-box",
						},
					}}
					variant="persistent"
					anchor="left"
					open={open}
				>
					<DrawerHeader>
						<IconButton onClick={handleDrawerClose}>
							{theme.direction === "ltr" ? <ChevronLeftIcon/> : <ChevronRightIcon/>}
						</IconButton>
					</DrawerHeader>
					<Typography variant="h6"
						sx={{p: 1, fontFamily: "monospace"}}>GENERAL</Typography>
					<Divider variant={"middle"}/>
					<List>
						{MenuElements.map((menuItem, index) => (
							<ListItem
								key={menuItem.label}
								onClick={() => navigate(`/dashboard/${menuItem.pathTo}`)}
								disablePadding
							>
								<ListItemButton
									selected={selectedIndex === index}
									onClick={() => setSelectedIndex(index)}
								>
									<ListItemIcon>{menuItem.icon}</ListItemIcon>
									<ListItemText primary={menuItem.label}/>
								</ListItemButton>
							</ListItem>
						))}
					</List>
					{isPermitted ? <List>
						<Divider/>
						{ProtectedMenuElements.map((menuItem, index) => (
							<ListItem
								key={menuItem.label}
								onClick={() => navigate(`/dashboard/${menuItem.pathTo}`)}
								disablePadding
							>
								<ListItemButton>
									<ListItemIcon>{menuItem.icon}</ListItemIcon>
									<ListItemText primary={menuItem.label}/>
								</ListItemButton>
							</ListItem>
						))}
					</List> : <></>}
					<Typography variant="h6"
						sx={{p: 1, fontFamily: "monospace"}}>EXIT</Typography>
					<Divider variant={"middle"}/>
					<ListItem
						onClick={() => handleLogout()}
						disablePadding>
						<ListItemButton>
							<ListItemIcon><Logout/></ListItemIcon>
							<ListItemText primary={"Logout"}/>
						</ListItemButton>
					</ListItem>
					<Typography sx={{marginTop: "auto", padding: "10px"}}>Logged as: {userData?.email}</Typography>
				</Drawer>
			</Box>
			<Main open={open}>
				<DrawerHeader/>
				<Outlet/>
			</Main>
		</Box>
	);
};