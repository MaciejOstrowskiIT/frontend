import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Register } from "../pages/auth/register/Register";
import { Login } from "../pages/auth/login/Login";
import { Dashbaord } from "../pages/dashboard/Dashbaord";
import { Auth } from "../pages/auth/Auth";
import { AlertProvider } from "../providers/AlertProvider";
import { LoginProvider } from "../providers/LoginProvider";
import { TransactionCreator } from "../pages/content/TransactionCreator";
import TransactionsTable from "../pages/content/TransactionsTable";
import { Utils } from "../pages/debug/Utils";
import { Personalization } from "../pages/personalization/Personalization";
import { ProtectedRoute } from "./ProtectedRoute";
import { AdminPanel } from "../pages/content/AdminPanel";
import axios from "axios";

export const MainRoute = () => {
	// axios.post('http://127.0.0.1:4002/api/set-permissions')
	console.log("https://code-with-me.global.jetbrains.com/BoTN2JZycQ4TyQrqbI28cg#p=WS&fp=FED017071C15112C78C0A22AB804DD4C69EF4D5097C7310245452404F815C0D4&newUi=true")
	console.log("test")
	return (
		<Router>
			<AlertProvider>
				<LoginProvider>
					<Routes>
						<Route path="/"
							element={ <Navigate to="/auth/login"/> }/>
						<Route path="dashboard"
							element={ <Dashbaord/> }>
							<Route path="create"
								element={ <TransactionCreator/> }/>
							<Route path="transactions"
								element={ <TransactionsTable/> }/>
							<Route path="personalization"
								element={ <Personalization/> }/>
							<Route path="utils"
								element={ <Utils/> }/>
							<Route element={ <ProtectedRoute/> }>
								<Route path="admin"
									element={ <AdminPanel/> }/>
							</Route>
						</Route>
						<Route path="auth"
							element={ <Auth/> }>
							<Route path="login"
								element={ <Login/> }/>
							<Route path="register"
								element={ <Register/> }/>
						</Route>
					</Routes>
				</LoginProvider>
			</AlertProvider>
		</Router>
	);
};