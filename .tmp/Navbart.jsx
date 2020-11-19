import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import devMediaLogo from "../assets/img/devMedia-logo2.png";
import { Link } from "react-router-dom";
const NavbarTop = () => {
	return (
		<>
			<Navbar
				collapseOnSelect
				expand="lg"
				// style={{ backgroundColor: "black" }}
			>
				<Link to="/">
					<Navbar.Brand>
						<img
							src={devMediaLogo}
							className="d-inline-block align-top"
							alt="Dev media logo"
							height={30}
						/>
					</Navbar.Brand>
				</Link>
				<Navbar.Toggle aria-controls="responsive-navbar-nav" />
				<Navbar.Collapse id="responsive-navbar-nav">
					<Nav className="mr-auto">
						<Nav.Link href="#features">Features</Nav.Link>
						<Nav.Link href="#pricing">Pricing</Nav.Link>
						<NavDropdown
							title="Dropdown"
							id="collasible-nav-dropdown"
						>
							<NavDropdown.Item href="#action/3.1">
								Action
							</NavDropdown.Item>
							<NavDropdown.Item href="#action/3.2">
								Another action
							</NavDropdown.Item>
							<NavDropdown.Item href="#action/3.3">
								Something
							</NavDropdown.Item>
							<NavDropdown.Divider />
							<NavDropdown.Item href="#action/3.4">
								Separated link
							</NavDropdown.Item>
						</NavDropdown>
					</Nav>
					<Nav>
						<Nav.Link href="#deets">More deets</Nav.Link>
						<Nav.Link eventKey={2} href="#memes">
							Dank memes
						</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		</>
	);
};

export default NavbarTop;
