import React, { useEffect } from "react";
import "../assets/css/LandingPage.scss";
import followImg from "../assets/img/follow-img.jpg";
import postImg from "../assets/img/post-img.png";
import { Link } from "react-router-dom";
const LandingPage = (props: any) => {
	useEffect(() => {
		document.title = "Welcome | DevMedia";
	}, []);
	return (
		<>
			<div className="landing-welcome">
				<div className="welcome">
					<h1 className="fs-60">Welcome to DevMedia</h1>
					<p className="lead fs-25 text-center">
						A social media app built for developers, by developers
					</p>
				</div>
				<div className="lit-card landing-showcase d-none d-lg-block ">
					<img
						src="https://webcourses.us/wp-content/uploads/2020/05/17-Beginner-C-Walkthrough-Projects-step-by-step-Course.jpg"
						alt="devmedia showcase"
						className="lit-card-img"
					/>
					<div className="lit-card-body">
						<div className="lit-card-title">New project!</div>
						<div className="lit-card-text pb-3">
							Hey guys I made a new project! <br />
							Check it out!
						</div>
					</div>
				</div>
			</div>

			<div className="landing-features ">
				<div className="row d-lg-none">
					<div className="col">
						<div
							className="lit-card landing-showcase bg-white mx-auto"
							style={{ maxWidth: 600 }}
						>
							<img
								src="https://webcourses.us/wp-content/uploads/2020/05/17-Beginner-C-Walkthrough-Projects-step-by-step-Course.jpg"
								alt="devmedia showcase"
								className="lit-card-img"
							/>
							<div className="lit-card-body">
								<div className="lit-card-title">
									New project!
								</div>
								<div className="lit-card-text pb-3">
									Hey guys I made a new project! <br />
									Check it out!
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="container py-5">
					<h1 className="text-center mb-4">
						Share your projects with the world
					</h1>
					<div className="row">
						<div className="col-md my-3">
							<div className="lit-card bg-white">
								<img
									src={postImg}
									alt="devmedia showcase"
									className="lit-card-img"
								/>
								<div className="lit-card-body">
									<div className="lit-card-title">Post</div>
									<div className="lit-card-text pb-3">
										Post your project to DevMedia for the
										world to see
									</div>
								</div>
							</div>
						</div>
						<div className="col-md my-3">
							<div className="lit-card bg-white">
								<img
									src="https://images.clipartlogo.com/files/istock/previews/9770/97708761-positive-feedback.jpg"
									alt="devmedia showcase"
									className="lit-card-img"
								/>
								<div className="lit-card-body">
									<div className="lit-card-title">
										Feedback
									</div>
									<div className="lit-card-text pb-3">
										Get feedback from other creators on the
										platform or give feedback to other
										developers
									</div>
								</div>
							</div>
						</div>
						<div className="col-md my-3">
							<div className="lit-card bg-white">
								<img
									src={followImg}
									alt="devmedia showcase"
									className="lit-card-img"
								/>
								<div className="lit-card-body">
									<div className="lit-card-title">Follow</div>
									<div className="lit-card-text pb-3">
										Follow creators that you find
										interesting or inspirational
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="text-center my-5">
						<Link to="/signup">
							<button
								className="navbar-btn fs-20"
								style={{ padding: "15px 30px" }}
							>
								SIGNUP NOW
							</button>
						</Link>
					</div>
				</div>
			</div>
		</>
	);
};

export default LandingPage;
