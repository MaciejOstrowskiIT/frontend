import Button from "@mui/material/Button";
import { useAlertContext } from "providers";

export const Utils = () => {
	const { setMessage } = useAlertContext();
	return (
		<>
			<h1>
				Utils menu:
			</h1>
			<Button onClick={ () => setMessage( { content: "Test", alertType: "warning" } ) }>Test Alert</Button>
		</>
	);
};