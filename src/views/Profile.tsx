import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context";
import { useQuery } from "@apollo/client";
import { loader } from "graphql.macro";
import plusIcon from "../assets/img/plus.svg";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import AddPost from "../components/AddPost";
import DeletePost from "../components/DeletePost";
import Card from "../components/Card";
import moment from "moment";
import { Modal } from "react-bootstrap";
import { User } from "../types/User";
import { useHistory } from "react-router-dom";
import EditProfileModal from "../components/EditProfileModal";
import EditIcon from "../assets/img/edit.svg";
import FollowButton from "../components/FollowButton";
const QUERY_POSTS = loader("../graphql/QUERY_POSTS.graphql");
const QUERY_USERS = loader("../graphql/QUERY_USERS.graphql");
const Profile = ({ match }: { match: any }) => {
	const {
		user: authUser,
	}: { user: User | null; logoutUser: any } = useContext(AuthContext);

	const history = useHistory();

	useEffect(() => {
		document.title = `${match.params.username} | Profile`;
	});

	const { data, loading, refetch: refetchUser } = useQuery(QUERY_USERS, {
		variables: { username: match.params.username },
	});
	let user;
	if (data) {
		user = data.queryUsers[0];
	}

	const [msgs, setMsgs] = useState("");
	const [postID, setPostID] = useState("");
	const { data: userPosts, loading: userPostsLoading, refetch } = useQuery(
		QUERY_POSTS,
		{
			variables: { username: match.params.username },
		}
	);

	const [show, setShow] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [editProfileModal, setEditProfileModal] = useState(false);

	const handleOutput = () => {
		setMsgs("Post was created successfully");
		setShow(false);
		refetch();
	};

	const handleModal = () => {
		setMsgs("");
		setShow(true);
	};

	const deletePostHandler = (id: string) => {
		setPostID(id);
		setShowDeleteModal(true);
	};
	let cardProps = {};

	if (authUser && authUser!.username === match.params.username) {
		cardProps = {
			deletable: true,
			deletePost: deletePostHandler,
		};
	}
	if (!loading && (!data || !user)) {
		history.replace("/");
		return <></>;
	}

	return (
		<>
			{loading ? (
				<div
					className="d-flex justify-content-center"
					style={{ marginTop: "30vh" }}
				>
					<div
						className="spinner-border"
						style={{ width: "6rem", height: "6rem" }}
						role="status"
					>
						<span className="sr-only">Loading...</span>
					</div>
				</div>
			) : (
				<div>
					<div className="lit-pfp my-3">
						<div className="row">
							<div className="col-sm-4">
								<img
									className="lit-pfp-img"
									src={user.profileImg}
									alt=""
								/>
							</div>

							<div className="col-sm-8">
								{match.params.username ===
									authUser!.username && (
									<Tippy content="Edit profile">
										<img
											className="float-right mr-3 mt-3"
											width={25}
											src={EditIcon}
											alt="edit profile"
											style={{
												cursor: "pointer",
											}}
											onClick={(e) =>
												setEditProfileModal(true)
											}
										/>
									</Tippy>
								)}
								<div className="lit-pfp-body text-left">
									{match.params.username !==
										authUser!.username && (
										<FollowButton
											userId={user.id}
											followers={user.followers}
											authUser={authUser!.username}
										/>
									)}
									<h1 className="lit-pfp-title mb-3">
										{user.username}
									</h1>
									<div className="row">
										<div className="col">
											<p>
												{user.followers.length}{" "}
												{user.followers.length === 1
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
												userPosts.queryPosts.length ===
													1
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
										{user.bio}
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
			)}
			{user && (
				<EditProfileModal
					handleShow={setEditProfileModal}
					show={editProfileModal}
					user={user}
					userPosts={userPosts}
					refetch={refetchUser}
				/>
			)}
			<p className="text-center text-success"> {msgs}</p>
			<div className="row mx-auto mb-5" style={{ maxWidth: 1200 }}>
				{!userPostsLoading &&
					(userPosts.queryPosts.length === 0 ? (
						authUser!.username === match.params.username ? (
							<p className="text-center mx-auto text-muted">
								No posts yet! <br /> Add your first post by
								clicking the plus button
							</p>
						) : (
							<p className="text-center mx-auto text-muted">
								This person doesn't have any posts yet! <br />{" "}
								Check back later
							</p>
						)
					) : (
						userPosts.queryPosts.map((post: any) => {
							return (
								<Card
									key={post.id}
									title={post.title}
									img={post.img}
									id={post.id}
									description={post.description}
									date={moment
										.unix(post.dateCreated)
										.fromNow()}
									styles="col-lg-4"
									noLikes
									noComments
									{...cardProps}
								/>
							);
						})
					))}
			</div>
			{authUser!.username === match.params.username && (
				<Tippy content="Add post" delay={[500, 0]}>
					<button className="pos-fixed bottom-25 right-25 add-post-btn">
						<img
							onClick={handleModal}
							data-toggle="modal"
							data-target="#addPostModal"
							src={plusIcon}
							alt="add post"
							width={50}
						/>
					</button>
				</Tippy>
			)}
			{/* Add post modal */}
			<Modal
				show={show}
				onHide={() => setShow(false)}
				size="lg"
				dialogClassName="addPostModal"
				aria-labelledby="example-custom-modal-styling-title"
			>
				<Modal.Body>
					<AddPost handleOutput={handleOutput} />
				</Modal.Body>
			</Modal>

			{/* Delete post modal */}
			<Modal
				show={showDeleteModal}
				onHide={() => setShowDeleteModal(false)}
			>
				<Modal.Header closeButton>
					<Modal.Title>Are you sure?</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					This action cannot be undone and your post will be lost
					forever
				</Modal.Body>
				<Modal.Footer>
					<DeletePost
						setModal={setShowDeleteModal}
						postId={postID}
						refetch={refetch}
					/>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default Profile;
