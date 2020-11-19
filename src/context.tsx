import React, { createContext, useReducer } from "react";
import decodeJWT from "jwt-decode";
const token = localStorage.getItem("token");
let decodedToken: any;
if (token) {
	decodedToken = decodeJWT(token);
	if (decodedToken.exp * 1000 < Date.now()) {
		localStorage.removeItem("token");
	}
}
export const AuthContext = createContext({
	user: null,
	loginUser: (data: any) => undefined,
	logoutUser: (data: any) => undefined,
});

interface Action {
	type: string;
	payload?: any;
}

const AuthReducer = (state: any, action: Action) => {
	switch (action.type) {
		case "LOGIN_USER":
			return {
				...state,
				user: action.payload,
			};
		case "LOGOUT_USER":
			return {
				...state,
				user: null,
			};
		default:
			return state;
	}
};

export const AuthProvider = (props: any) => {
	const [state, dispatch] = useReducer(AuthReducer, {
		user: decodedToken || null,
	});
	const loginUser = (data: any) => {
		localStorage.setItem("token", data.token);
		dispatch({
			type: "LOGIN_USER",
			payload: data,
		});
	};
	const logoutUser = () => {
		localStorage.removeItem("token");
		dispatch({
			type: "LOGOUT_USER",
		});
	};
	return (
		<AuthContext.Provider
			value={{
				user: state.user,
				loginUser,
				logoutUser,
			}}
			{...props}
		>
			{props.children}
		</AuthContext.Provider>
	);
};
