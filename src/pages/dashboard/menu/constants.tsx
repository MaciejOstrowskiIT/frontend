import InboxIcon from "@mui/icons-material/MoveToInbox";
import { BugReport, Create, ManageAccounts } from "@mui/icons-material";
import * as React from "react";

export const MenuElements = [
	{ label: "Transactions", icon: <InboxIcon/>, pathTo: "transactions" },
	{ label: "Create", icon: <Create/>, pathTo: "create" },
	{ label: "Utils", icon: <BugReport/>, pathTo: "utils" },
	{ label: "Personalization", icon: <ManageAccounts/>, pathTo: "personalization" },
];

export const ProtectedMenuElements = [

	{ label: "Admin", icon: <ManageAccounts/>, pathTo: "admin" },
];

// const TopMenuElements = {
// 	"Transactions": {
// 		elem:<InboxIcon/>,
// 	route: 'url'},
// };
// tak bedzie lepiej zamiast odwolan do indexow i jakis object.keys