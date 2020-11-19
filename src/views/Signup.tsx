import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import "../assets/css/form.scss";
import { useMutation } from "@apollo/client";
import { loader } from "graphql.macro";
import bgGrad from "../assets/img/grad.png";
import { AuthContext } from "../context";
const SIGNUP_USER = loader("../graphql/SIGNUP_USER.graphql");
const Signup = (props: any) => {
	const context = useContext(AuthContext);
	const history = useHistory();
	if (context.user) {
		history.replace("/");
	}
	const body = document.body;
	useEffect(() => {
		document.title = "Signup | DevMedia";
		body.style.backgroundImage = `url(${bgGrad})`;
		body.style.backgroundSize = "cover";
		body.style.backgroundAttachment = "fixed";

		return () => {
			body.style.backgroundImage = `none`;
			body.style.backgroundSize = "";
			body.style.backgroundAttachment = "";
		};
	});
	const [input, setInput] = useState({
		username: "",
		email: "",
		password: "",
		repeatPassword: "",
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

	const [signupUser, { loading }] = useMutation(SIGNUP_USER, {
		onCompleted({ signup }) {
			context.loginUser(signup);
			props.history.push("/");
		},
		onError({ graphQLErrors }) {
			setMsgs(graphQLErrors[0].extensions!.exception.errors);
		},
	});

	const handleSubmit = (e: any) => {
		e.preventDefault();
		if (input.password !== input.repeatPassword) {
			setMsgs({
				error: "Your passwords don't match!",
			});
		}
		signupUser({ variables: input });
	};

	return (
		<div className="container">
			<form onSubmit={handleSubmit} className="sl-form pt-3 signup">
				<h3 className="text-center f-roboto fw-400 fs-35 my-3">
					Sign up for DevMedia
				</h3>
				<div
					className="group"
					style={{ marginBottom: "0px !important" }}
				>
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
				<div className="group" style={{ marginTop: "0px !important" }}>
					<input
						name="email"
						type="text"
						required
						value={input.email}
						onChange={handleChange}
					/>
					<span className="highlight"></span>
					<span className="bar"></span>
					<label>Email</label>
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
				<div className="group">
					<input
						name="repeatPassword"
						type="password"
						required
						value={input.repeatPassword}
						onChange={handleChange}
					/>
					<span className="highlight"></span>
					<span className="bar"></span>
					<label>Repeat password</label>
				</div>

				{Object.values(msgs).map((error) => (
					<p key={error} className="text-danger text-center">
						{error}
					</p>
				))}
				<div className="box">
					<button
						name="signup-submit"
						className="btn btn-submit blue-grad"
						type="submit"
						disabled={loading}
					>
						{!loading ? (
							"SIGN UP"
						) : (
							<div
								className="spinner-border"
								style={{
									width: 25,
									height: 25,
									// borderTopRightRadius: 30,
								}}
								role="status"
							>
								<span className="sr-only">Loading...</span>
							</div>
						)}
					</button>
					<p className="mt-2">
						Already have an account?{" "}
						<Link to="/login" className="link-unstyled">
							Login
						</Link>
					</p>
				</div>
			</form>
		</div>
	);
};

export default Signup;
