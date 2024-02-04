import axios from "axios";
import { useContext } from "react";
import { urlAccounts } from "../endpoints";
import { authenticationResponse, userCredentials } from "./auth.models";
import AuthenticationContext from "./AuthenticationContext";
import AuthForm from "./AuthForm";
import { getClaims, saveToken } from "./handleJWT";
import { useNavigate } from "react-router-dom";
import { useAlert } from 'react-bootstrap-hooks-alert'

export default function Register() {
	const navigate = useNavigate();
	const { update } = useContext(AuthenticationContext);
	const { danger, success } = useAlert()


	async function login(credentials: userCredentials) {
		try {
			const response = await axios.post<authenticationResponse>(`${urlAccounts}/create`, credentials);
			saveToken(response.data);
			update(getClaims());
			navigate('/');
		}
		catch (error: any) {
			danger(error.response.data.description)
		}
	}

	return (
		<>
			<div className="container w-75">
				<h3 className="text-center align-middle">Register</h3>
				<AuthForm model={{ email: '', password: '' }} onSubmit={async values => await login(values)} />
			</div>

		</>
	)
}