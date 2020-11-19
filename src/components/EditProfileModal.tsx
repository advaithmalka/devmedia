import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import { loader } from "graphql.macro";

const EDIT_PROFILE = loader("../graphql/EDIT_PROFILE.graphql");
const EditProfileModal = ({
	show,
	handleShow,
	user,
	userPosts,
	refetch,
}: any) => {
	const [errors, setErrors] = useState("");
	const [values, setValues] = useState({
		profileImg: user.profileImg,
		bio: user.bio,
	});
	const [editProfile, { loading }] = useMutation(EDIT_PROFILE, {
		onCompleted() {
			refetch();
			handleShow(false);
		},
	});

	const handleChange = ({ target }: { target: any }) => {
		setValues((prev) => ({
			...prev,
			[target.name]: target.value,
		}));
	};
	async function imageExists(url: string, callback: any) {
		let img = new Image();
		img.src = url;
		img.onload = function () {
			callback(true);
		};
		img.onerror = function () {
			callback(false);
		};
	}

	const handleSubmit = (e: any) => {
		e.preventDefault();
		imageExists(values.profileImg, (img: boolean) => {
			if (img) {
				editProfile({
					variables: {
						profileImg: values.profileImg,
						bio: values.bio,
					},
				});
			} else {
				setErrors("Please provide a valid image url");
			}
		});
	};
	return (
		<Modal
			show={show}
			onHide={() => handleShow(false)}
			size="lg"
			dialogClassName="addPostModal"
		>
			<Modal.Body>
				<div
					className="lit-pfp my-3"
					style={{ backgroundColor: "white" }}
				>
					<div className="lit-pfp-body pb-4">
						<h3 className="text-center mt-2 mb-4">Edit profile</h3>
						<div>
							<div className="lit-pfp my-3">
								<div className="row">
									<div className="col-lg-4">
										<img
											className="lit-pfp-img"
											src={values.profileImg}
											alt=""
										/>
									</div>
									<div className="col-lg-8">
										<div className="lit-pfp-body text-left">
											<h1 className="lit-pfp-title mb-3">
												{user.username}
											</h1>
											<div className="row">
												<div className="col">
													<p>
														{user.followers.length}{" "}
														{user.followers
															.length === 1
															? "follower"
															: "followers"}
													</p>
												</div>
												<div className="col">
													<p>
														{userPosts &&
															userPosts.queryPosts
																.length}{" "}
														{userPosts &&
														userPosts.queryPosts
															.length === 1
															? "post"
															: "posts"}
													</p>
												</div>
											</div>
											<pre
												style={{
													wordWrap: "break-word",
													fontFamily: "sans-serif",
												}}
											>
												{values.bio}
											</pre>
										</div>

										<p className="fs-13 float-right mt-n5 mr-4">
											User since{" "}
											{user.dateCreated.substring(
												3,
												user.dateCreated.length
											)}
										</p>
									</div>
								</div>
							</div>
						</div>
						<form onSubmit={handleSubmit}>
							<label htmlFor="add-bio">Bio:</label>
							<textarea
								required
								maxLength={100}
								id="add-bio"
								className="form-control mb-3"
								placeholder="New bio"
								name="bio"
								value={values.bio}
								onChange={handleChange}
							/>
							<label htmlFor="add-pfp">Profile image URL</label>
							<input
								type="text"
								required
								id="add-pfp"
								className="form-control mb-3"
								placeholder="New Profile Picture link"
								name="profileImg"
								value={
									values.profileImg ===
									"https://api-private.atlassian.com/users/e812f09921af2cab1f19566a43710317/avatar"
										? ""
										: values.profileImg
								}
								onChange={handleChange}
							/>
							<div className="text-center mt-3">
								<p className="text-center text-danger mt-3">
									{errors}
								</p>
								<button className="navbar-btn">
									{!loading ? (
										"UPDATE PROFILE"
									) : (
										<div
											className="spinner-border"
											style={{
												width: 25,
												height: 25,
											}}
											role="status"
										>
											<span className="sr-only">
												Loading...
											</span>
										</div>
									)}
								</button>
							</div>
						</form>
					</div>
				</div>
			</Modal.Body>
		</Modal>
	);
};

export default EditProfileModal;
