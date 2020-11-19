import React, { useRef, useContext } from "react";
import Hamburger from "./Hamburger";
import { Link } from "react-router-dom";
import "../assets/css/Navbar.scss";
import { AuthContext } from "../context";
import Logo from "../assets/img/devmedia-logo3.png";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { User } from "../types/User";
function Navbar() {
	const {
		user,
		logoutUser,
	}: { user: User | null; logoutUser: any } = useContext(AuthContext);
	const navBurger = useRef<HTMLElement>(null);
	const navbarContent = useRef<HTMLDivElement>(null);

	const hamburgerClick = (): void => {
		if (!navbarContent.current!.classList.contains("open")) {
			navBurger.current!.classList.add("clicked");
			navbarContent.current!.classList.add("open");
		} else {
			navBurger.current!.classList.remove("clicked");
			navbarContent.current!.classList.remove("open");
		}
	};

	const handleUser = () => {
		user && logoutUser();
	};
	return (
		<>
			<nav
				id="navbar"
				className="sticky-top navbar navbar-expand-lg navbar-light nav-color py-2 custom-shadow"
			>
				<Link to="/" style={{ textDecoration: "none" }}>
					<span className="navbar-brand d-block d-lg-none">
						<img
							src={`${process.env.PUBLIC_URL}/logo512.png`}
							alt="Logo"
							width={40}
						/>
					</span>
				</Link>
				<button
					onClick={hamburgerClick}
					data-toggle="collapse"
					data-target="#navbarContent"
					aria-controls="navbars"
					aria-expanded="false"
					aria-label="Toggle navigation"
					className="navbar-toggler bg-white"
					style={{
						border: "none !important",
						cursor: "pointer",
					}}
					id="navbar-hamburger"
				>
					<Hamburger _id="inner-nav-hamburger" ref={navBurger} />
				</button>
				<Link to="/">
					<div
						id="home-logo"
						className="navbar-brand d-none d-lg-block"
					>
						<img
							alt="go to home page"
							src={Logo}
							height={40}
							style={{ marginBottom: 10, marginRight: 5 }}
						/>
					</div>
				</Link>
				<div
					id="navbarContent"
					ref={navbarContent}
					className="collapse navbar-collapse justify-content-end "
				>
					<ul className="navbar-nav">
						<Link
							to={user ? `/users/${user!.username}` : "/signup"}
							style={{ textDecoration: "none" }}
						>
							<li className="nav-item nav-content nav-link nav-title text-uppercase fs-16 r-router-link">
								{`${user ? user!.username : ""}`}
							</li>
						</Link>
						<Link
							to={user ? "/login" : "/signup"}
							style={{ float: "right" }}
						>
							<li>
								<button
									className="navbar-btn"
									onClick={handleUser}
								>
									{user ? "LOGOUT" : "SIGNUP"}
								</button>
							</li>
						</Link>
					</ul>
				</div>
			</nav>
			<HelmetProvider>
				<Helmet>
					<script src="https://cdn.jsdelivr.net/npm/bootstrap.native@3.0.0/dist/bootstrap-native.min.js"></script>
				</Helmet>
			</HelmetProvider>
		</>
	);
}

export default Navbar;
