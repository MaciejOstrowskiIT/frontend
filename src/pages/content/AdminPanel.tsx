import { AppBar, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";

export const AdminPanel = () => {
	return (
		<>
			<div>
				<AppBar position="static">
					<Toolbar>
						<Typography variant="h6"
							style={ { flexGrow: 1 } }>
							Admin Menu
						</Typography>
						<Button color="inherit">Strona główna</Button>
						<Button color="inherit">Informacje</Button>
						<Button color="inherit">Kontakt</Button>
					</Toolbar>
				</AppBar>
				<Paper style={ { margin: 20 } }>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell>ID</TableCell>
								<TableCell>Nazwa</TableCell>
								<TableCell>Opis</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							<TableRow>
								<TableCell>1</TableCell>
								<TableCell>Element A</TableCell>
								<TableCell>To jest opis dla elementu A.</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>2</TableCell>
								<TableCell>Element B</TableCell>
								<TableCell>To jest opis dla elementu B.</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>3</TableCell>
								<TableCell>Element C</TableCell>
								<TableCell>To jest opis dla elementu C.</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				</Paper>
				<div style={ { margin: 20 } }>
					<Button variant="contained"
						color="primary"
						style={ { marginRight: 10 } }>
						Dodaj
					</Button>
					<Button variant="outlined"
						color="secondary">
						Usuń
					</Button>
				</div>
			</div>
		</>
	);
};