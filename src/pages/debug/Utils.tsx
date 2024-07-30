import Button from "@mui/material/Button";
import { useAlert } from "../../providers/AlertProvider";

export const Utils = () => {
	const { setMessage } = useAlert();
	return (
		<>
			<h1>
				Utils menu:
			</h1>
			<Button onClick={ () => setMessage( { content: "Test", alertType: "warning" } ) }>Test Alert</Button>
		</>
	);
};