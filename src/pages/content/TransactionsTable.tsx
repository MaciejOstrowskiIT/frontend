import React, { useState, useEffect, FC } from "react";
import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper, Button, Box } from "@mui/material";
import { TableCellButton } from "../../components/TableCellButton";
import { useAuthorizedRequest } from "../../hooks/useAuthorizedReq";
import { Transaction } from "../../types/transactionTypes";
import { format } from "date-fns";

const TransactionsTable: FC = () => {
	const [transactions, setTransactions] = useState<Transaction[]>([]);
	const [sortBy, setSortBy] = useState<keyof Transaction>("date");
	const [expandedRow, setExpandedRow] = useState<number | null>(null);
	const [hoveredRow, setHoveredRow] = useState<number | null>(null);

	const { getRequest } = useAuthorizedRequest();

	const fetchDataWithHook = async () => {
		try {
			const { data } = await getRequest<Transaction[]>(`api/task/:taskId?sortBy=${sortBy}`);
			const formattedData = data.map((item) => ({
				...item,
				date: format(new Date(item.date), "dd/MM/yyyy, HH:MM:ss:SS"),
			}));
			setTransactions(formattedData);
		} catch (err) {
			console.error("Error fetching transactions:", err);
		}
	};

	useEffect(() => {
		fetchDataWithHook();
	}, [sortBy]);

	const handleSort = (key: keyof Transaction) => {
		setSortBy(key);
	};

	const toggleRowExpansion = (index: number) => {
		setExpandedRow(expandedRow === index ? null : index);
	};

	const handleRowHover = (index: number) => {
		setHoveredRow(index);
	};

	return (
		<TableContainer component={Paper} style={{ boxShadow: "2px 4px 8px rgba(0, 0, 0, 0.1)", borderRadius: 12 }}>
			<Table style={{ minWidth: 650 }}>
				<TableHead>
					<TableRow style={{ backgroundColor: "rgba(0, 60, 255, 0.31)" }}>
						{Object.keys(transactions[0] || {}).map((key, index) => (
							<TableCellButton
								key={index}
								onClick={() => handleSort(key as keyof Transaction)}
								disabled={sortBy === key as keyof Transaction}
							>
								{key}
							</TableCellButton>
						))}
					</TableRow>
				</TableHead>
				<TableBody>
					{transactions.map((transaction, index) => (
						<React.Fragment key={index}>
							<TableRow
								onClick={() => toggleRowExpansion(index)}
								onMouseEnter={() => handleRowHover(index)}
								onMouseLeave={() => handleRowHover(-1)}
								style={{
									cursor: "pointer",
									backgroundColor: index === hoveredRow ? "#E3F2FD" : index % 2 === 0 ? "rgba(0, 0, 0, 0.02)" : "rgba(0, 0, 0, 0)"
								}}
							>
								{Object.values(transaction).map((value, index) => (
									<TableCell key={index} style={{ paddingTop: 16, paddingBottom: 16 }}>
										{value}
									</TableCell>
								))}
							</TableRow>
							{expandedRow === index && (
								<TableRow>
									<TableCell colSpan={Object.keys(transaction).length}>
										<Box display="flex" justifyContent="space-between" alignItems="center">
											<Button variant="contained" color="error" disabled>Delete</Button>
											<Button variant="contained" color="primary" disabled>Edit</Button>
											<Button variant="contained" color="secondary" disabled>Copy</Button>
										</Box>
									</TableCell>
								</TableRow>
							)}
						</React.Fragment>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default TransactionsTable;
