import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import "../assets/css/form.scss";
import { useMutation } from "@apollo/client";
import { loader } from "graphql.macro";
import bgGrad from "../assets/img/grad.png";
import { AuthContext } from "../context";
const LOGIN_USER = loader("../graphql/LOGIN_USER.graphql");
const Login = (props: any) => {
	const body = document.body;
	let successMsg;
	let url = new URL(window.location.href);
	const context = useContext(AuthContext);
	const history = useHistory();

	const signup = url.searchParams.get("signup");
	if (signup === "success") {
		successMsg = "Signup was successful!";
	}
	useEffect(() => {
		document.title = "Login | DevMedia";
		body.style.backgroundImage = `url(${bgGrad})`;
		body.style.backgroundSize = "cover";
		body.style.backgroundAttachment = "fixed";
		if (context.user) {
			history.replace("/");
		}

		return () => {
			body.style.backgroundImage = `none`;
			body.style.backgroundSize = "";
			body.style.backgroundAttachment = "";
		};
	});
	const [input, setInput] = useState({
		username: "",
		password: "",
	});
	const [msgs, setMsgs] = useState({
		error: "",
	});

	const handleChange = ({ target }: any): void => {
		setInput({ ...input, [target.name]: target.value });
		if (msgs.error !== "") {
			setMsgs({
				error: "",
			});
		}
	};

	const [login, { loading }] = useMutation(LOGIN_USER, {
		update(cache, { data }) {
			context.loginUser(data.login);
		},
		onError({ graphQLErrors }) {
			setMsgs(graphQLErrors[0].extensions!.exception.errors);
		},
	});

	const handleSubmit = (e: any) => {
		e.preventDefault();
		login({ variables: input });
	};

	return (
		<div className="container">
			<form onSubmit={handleSubmit} className="sl-form pt-5">
				<h3 className="text-center f-roboto fw-400 fs-35 ">
					Login to DevMedia
				</h3>
				<div className="group">
					<input
						name="username"
						type="text"
						required
						value={input.username}
						onChange={handleChange}
					/>
					<span className="highlight"></span>
					<span className="bar"></span>
					<label>Username</label>
				</div>
				<div className="group">
					<input
						name="password"
						type="password"
						required
						value={input.password}
						onChange={handleChange}
					/>
					<span className="highlight"></span>
					<span className="bar"></span>
					<label>Password</label>
				</div>

				{Object.values(msgs).map((error) => (
					<p key={error} className="text-danger text-center">
						{error}
					</p>
				))}
				<p className="text-success text-center">{successMsg}</p>
				<div className="box">
					<button
						name="signup-submit"
						className="btn btn-submit blue-grad"
						type="submit"
						disabled={loading}
					>
						{!loading ? (
							"LOGIN"
						) : (
							<div
								className="spinner-border"
								style={{
									width: 25,
									height: 25,
								}}
								role="status"
							>
								<span className="sr-only">Loading...</span>
							</div>
						)}
					</button>
					<p className="mt-2">
						Don't have an account?{" "}
						<Link to="/signup" className="link-unstyled">
							Sign up
						</Link>
					</p>
				</div>
			</form>
		</div>
	);
};

export default Login;
