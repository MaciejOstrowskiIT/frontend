import { FC, ReactNode } from "react";
import { Button, TableCell } from "@mui/material";

export const TableCellButton: FC<{ onClick: () => void; disabled: boolean; children: ReactNode }> =
	({ onClick, disabled, children }) => {
		return (
			<TableCell>
				<Button onClick={ onClick }
					disabled={ disabled }>{ children }</Button>
			</TableCell>
		);
	};