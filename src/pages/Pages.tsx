import { Navigate, Route, BrowserRouter as Router, Routes as RouterRoutes } from "react-router-dom";
import { Register } from "./auth/register/Register";
import { Login } from "./auth/login/Login";
import { Dashbaord } from "./dashboard/Dashbaord";
import { Auth } from "./auth/Auth";
import { TransactionCreator } from "./content/TransactionCreator";
import TransactionsTable from "./content/TransactionsTable";
import { Utils } from "./debug/Utils";
import { Personalization } from "./personalization/Personalization";
import { ProtectedRoute } from "../utils/ProtectedRoute";
import { AdminPanel } from "pages/content/AdminPanel";
//wszystko powinno byc importowane za pomoca Lazy https://react.dev/reference/react/lazy
// kazdy folder w pages powinien byc z duzej litery

export const Pages = () => {
	return (
		<Router>
			<RouterRoutes>
				<Route path="/"
					element={<Navigate to="/auth/login" />} />
				<Route path="dashboard"
					element={<Dashbaord />}>
					<Route path="create"
						element={<TransactionCreator />} />
					<Route path="transactions"
						element={<TransactionsTable />} />
					<Route path="personalization"
						element={<Personalization />} />
					<Route path="utils"
						element={<Utils />} />
					<Route element={<ProtectedRoute />}>
						<Route path="admin"
							element={<AdminPanel />} />
					</Route>
				</Route>
				<Route path="auth"
					element={<Auth />}>
					<Route path="login"
						element={<Login />} />
					<Route path="register"
						element={<Register />} />
				</Route>
			</RouterRoutes>
		</Router>
	);
};