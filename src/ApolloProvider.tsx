import React from "react";
import {
	ApolloClient,
	InMemoryCache,
	createHttpLink,
	ApolloProvider as Provider,
} from "@apollo/client";
import App from "./App";
import { setContext } from "@apollo/client/link/context";
const setAuthLink = setContext(() => {
	const token = localStorage.getItem("token");
	return {
		headers: {
			authorization: token ? `Bearer ${token}` : "",
		},
	};
});

const cache = new InMemoryCache();
const link = createHttpLink({
	uri: process.env.REACT_APP_SERVER_URI,
});

const client = new ApolloClient({
	link: setAuthLink.concat(link),
	cache,
	name: "devmedia-web-client",
});

export default function ApolloProvider() {
	return (
		<Provider client={client}>
			<App />
		</Provider>
	);
}
