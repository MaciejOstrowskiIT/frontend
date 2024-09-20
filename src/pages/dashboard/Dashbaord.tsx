import { Menu } from "./menu/Menu";
import { Grid } from "@mui/material";
import { useState } from "react";

export const Dashbaord = () => {
	const [ selectedComponent, setSelectedComponent ] = useState<string>( "transactions" );
	const handleMenuClick = (componentName: string) => {
		setSelectedComponent( componentName );
	};
	return (
		<Grid container
			sx={ { flexDirection: "column" } }>
			<Menu/>
		</Grid>
	);
};