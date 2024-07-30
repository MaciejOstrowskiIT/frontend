import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Outlet, useNavigate } from "react-router-dom";
import "../../../proto/stringExtensions";
import { Logout } from "@mui/icons-material";
import { useAlert } from "../../../providers/AlertProvider";
import { useLogin } from "../../../providers/LoginProvider";
import { useEffect, useState } from "react";
import { AppBar } from "./components/AppBar";
import { Main } from "./components/Main";
import { DrawerHeader } from "./components/DrawerHeader";
import { MenuElements, ProtectedMenuElements } from "./constants";
import { useAuthorizedRequest } from "../../../hooks/useAuthorizedReq";

const drawerWidth = 240;

export const Menu = () => {
	const theme = useTheme();
	const [ open, setOpen ] = useState( true );
	const [ selectedIndex, setSelectedIndex ] = useState( -1 );
	const [ selectedIndexProtected, setSelectedIndexProtected ] = useState( -1 );
	const navigate = useNavigate();
	const { setMessage } = useAlert();
	const { userData } = useLogin();
	const handleDrawerOpen = () => {
		setOpen( true );
	};

	const handleDrawerClose = () => {
		setOpen( false );
	};
	const handleLogout = () => {
		sessionStorage.removeItem( "token" );
		sessionStorage.removeItem( "email" );
		navigate( "/auth/login" );
		setMessage( { content: "Logged out", alertType: "info" } );
	};

	const { getRequest } = useAuthorizedRequest();
	const [ isPermitted, setIsPermitted ] = useState( false );

	const getPermission = async () => {
		await getRequest<string>( "api/get-permissions", "4001" )
			.then( (res) => {
				console.log( res.data );
				res.data === "admin"
					? setIsPermitted( true )
					: setIsPermitted( false );

			} )
			.catch( (err) => console.log( err ) );
	};
	/*
	Tutaj fajnie będzie zrobić z getPermission hooka, który będzie sprawdzał permisję już na poziomie logowania, żeby
	 można było prosto i fajnie stworzyć Menu, które będzie odpowiednio przy uzyskaniu permisji wyświetlać bądź nie
	  dany element, który jest zastrzeżony dla danego usera
	 */

	useEffect( () => {
		getPermission();
	}, [] );


	return (
		<Box sx={ { display: "flex", } }>
			<CssBaseline/>
			<AppBar
				open={ open }>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						onClick={ handleDrawerOpen }
						edge="start"
						sx={ { mr: 2, ...(open && { display: "none" }) } }
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
			<Box sx={ { display: "flex", justifyContent: "stretch" } }>
				<Drawer
					sx={ {
						padding: "10px",
						width: drawerWidth,
						flexShrink: 0,
						"& .MuiDrawer-paper": {
							width: drawerWidth,
							boxSizing: "border-box",
						},
					} }
					variant="persistent"
					anchor="left"
					open={ open }
				>
					<DrawerHeader>
						<IconButton onClick={ handleDrawerClose }>
							{ theme.direction === "ltr" ? <ChevronLeftIcon/> : <ChevronRightIcon/> }
						</IconButton>
					</DrawerHeader>
					<Typography variant="h6"
						sx={ { p: 1, fontFamily: "monospace" } }>GENERAL</Typography>
					<Divider variant={ "middle" }/>
					<List>
						{ MenuElements.map( (menuItem, index) => (
							<ListItem
								key={ menuItem.label }
								onClick={ () => navigate( `/dashboard/${ menuItem.pathTo }` ) }
								disablePadding
							>
								<ListItemButton
									selected={ selectedIndex === index }
									onClick={ () => setSelectedIndex( index ) }
								>
									<ListItemIcon>{ menuItem.icon }</ListItemIcon>
									<ListItemText primary={ menuItem.label }/>
								</ListItemButton>
							</ListItem>
						) ) }
					</List>
					{ isPermitted ? <List>
						<Divider/>
						{ ProtectedMenuElements.map( (menuItem, index) => (
							<ListItem
								key={ menuItem.label }
								onClick={ () => navigate( `/dashboard/${ menuItem.pathTo }` ) }
								disablePadding
							>
								<ListItemButton>
									<ListItemIcon>{ menuItem.icon }</ListItemIcon>
									<ListItemText primary={ menuItem.label }/>
								</ListItemButton>
							</ListItem>
						) ) }
					</List> : <></> }
					<Typography variant="h6"
						sx={ { p: 1, fontFamily: "monospace" } }>EXIT</Typography>
					<Divider variant={ "middle" }/>
					<ListItem
						onClick={ () => handleLogout() }
						disablePadding>
						<ListItemButton>
							<ListItemIcon><Logout/></ListItemIcon>
							<ListItemText primary={ "Logout" }/>
						</ListItemButton>
					</ListItem>
					<Typography sx={ { marginTop: "auto", padding: "10px" } }>Logged as: { userData?.email }</Typography>
				</Drawer>
			</Box>
			<Main open={ open }>
				<DrawerHeader/>
				<Outlet/>
			</Main>
		</Box>
	);
};