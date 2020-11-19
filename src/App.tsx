import React, { useContext } from "react";
import "./assets/css/App.scss";
import Home from "./views/Home";
import Login from "./views/Login";
import Signup from "./views/Signup";
import Profile from "./views/Profile";
import NavbarTop from "./components/Navbar";
import { AuthProvider } from "./context";
import Post from "./components/Post";
import { AuthContext } from "./context";
import LandingPage from "./views/LandingPage";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from "react-router-dom";
// @ts-ignore
function RestrictedRoute({ component: Component, ...routeProps }) {
	const { user } = useContext(AuthContext);
	return (
		<Route
			{...routeProps}
			render={(props) =>
				user ? <Component {...props} /> : <Redirect to="/signup" />
			}
		/>
	);
}
//@ts-ignore
function HomeRoute({ ...routeProps }) {
	const { user } = useContext(AuthContext);
	return (
		<Route
			{...routeProps}
			render={(props) =>
				user ? <Home {...props} /> : <LandingPage {...props} />
			}
		/>
	);
}

const App = (props: any) => {
	return (
		<AuthProvider>
			<div className="app">
				<Router basename={process.env.PUBLIC_URL}>
					<NavbarTop {...props} />
					<Switch>
						<HomeRoute
							//  @ts-ignore
							path="/"
							exact
						/>
						<RestrictedRoute
							//  @ts-ignore
							path="/posts/:id"
							component={Post}
						/>
						<RestrictedRoute
							//  @ts-ignore
							path="/users/:username"
							component={Profile}
						/>

						<Route path="/" exact component={LandingPage} />
						<Route path="/login" component={Login} />
						<Route path="/signup" component={Signup} />
						<Route>
							<Redirect to="/signup" />
						</Route>
					</Switch>
				</Router>
			</div>
		</AuthProvider>
	);
};

export default App;
