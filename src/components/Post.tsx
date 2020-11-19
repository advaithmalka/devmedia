import React, { useEffect, useContext, useState, useRef } from "react";
import { useQuery } from "@apollo/client";
import { loader } from "graphql.macro";
import Card from "./Card";
import moment from "moment";
import Comment from "./Comment";
import noPFP from "../assets/img/nopfp.png";
import { AuthContext } from "../context";
import { User } from "../types/User";
import { Modal } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import commentIcon from "../assets/img/comment-btn.svg";
import Tippy from "@tippyjs/react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useHistory } from "react-router-dom";

const QUERY_POST = loader("../graphql/QUERY_POST.graphql");
const COMMENT = loader("../graphql/COMMENT.graphql");
const DELETE_COMMENT = loader("../graphql/DELETE_COMMENT.graphql");
const Post = ({ match }: { match: any }) => {
	const {
		user: authUser,
	}: { user: User | null; logoutUser: any } = useContext(AuthContext);
	const history = useHistory();
	const { data, loading } = useQuery(QUERY_POST, {
		variables: {
			ID: match.params.id,
		},
	});
	let post: any;
	if (data) {
		post = data.queryPost;
	}
	if (!loading && (!data || !post)) {
		history.replace("/");
	}
	useEffect(() => {
		document.title = `${post && post.title} | DevMedia`;
	});
	const [commentModal, setCommentModal] = useState(false);
	const [commentID, setCommentID] = useState("");

	const commentInput = useRef<HTMLInputElement>(null);
	const [commentValue, setCommentValue] = useState("");
	const [deleteComment, { loading: deleteCommentLoading }] = useMutation(
		DELETE_COMMENT,
		{
			onCompleted() {
				setCommentModal(false);
			},
		}
	);

	const [addComment, { loading: addCommentLoading }] = useMutation(COMMENT, {
		onCompleted() {
			setCommentValue("");
			commentInput.current!.classList.add("hide");
		},
		variables: {
			postID: match.params.id,
			text: commentValue,
		},
	});

	const deleteCommentHandler = (id: string) => {
		setCommentID(id);
		setCommentModal(true);
	};

	const handleCommentSubmit = (e: any) => {
		e.preventDefault();
		addComment();
	};

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
				post && (
					<div className="my-5">
						<Tippy content="Comment" delay={[700, 0]}>
							<div
								className="comment-btn"
								onClick={(e) => {
									commentInput.current!.classList.toggle(
										"hide"
									);
								}}
							>
								<img
									src={commentIcon}
									alt="Comment"
									width={30}
									className="mt-1"
								/>
							</div>
						</Tippy>

						<Card
							title={post.title}
							description={post.description}
							img={post.img}
							key={post.id}
							date={moment.unix(post.dateCreated).fromNow()}
							likeCount={post.countLikes}
							likeData={post.likes}
							postUser={post.username}
							id={post.id}
							commentCount={post.countComments}
							styles="big-post"
							noLinks
						/>
						<form
							onSubmit={handleCommentSubmit}
							className="comment-form"
							autoComplete="off"
						>
							<div
								className="group animate__animated animate__fadeIn hide"
								ref={commentInput}
								style={{ animationDuration: "200ms" }}
							>
								<div className="form-group">
									<label
										htmlFor="input-textarea"
										className="fs-20"
									>
										Comment
									</label>
									<textarea
										className="form-control trans-100"
										id="input-textarea"
										placeholder="Add a comment"
										rows={3}
										required
										value={commentValue}
										onChange={(e) =>
											setCommentValue(e.target.value)
										}
									></textarea>
								</div>

								<button className="comment-btn-submit">
									{addCommentLoading ? (
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
									) : (
										"COMMENT"
									)}
								</button>
							</div>
						</form>
						{post.comments.length > 0 ? (
							<>
								<h2
									className="mx-auto mt-5"
									style={{ maxWidth: 800 }}
								>
									Comments
								</h2>
								{post.comments.map((comment: any) => (
									<Comment
										key={comment.id}
										id={comment.id}
										username={comment.username}
										dateCreated={moment(
											comment.dateCreated
										).fromNow()}
										text={comment.text}
										profileImg={comment.profileImg || noPFP}
										deleteHandler={deleteCommentHandler}
										deletable={
											authUser!.username ===
											comment.username
												? true
												: false
										}
									/>
								))}
								<Modal
									show={commentModal}
									onHide={() => setCommentModal(false)}
								>
									<Modal.Header closeButton>
										<Modal.Title>
											Delete comment
										</Modal.Title>
									</Modal.Header>
									<Modal.Body>
										This action cannot be undone and your
										comment will be lost forever
									</Modal.Body>
									<Modal.Footer>
										<button
											className="navbar-btn navbar-btn-primary"
											onClick={() =>
												setCommentModal(false)
											}
										>
											Close
										</button>
										<button
											className="navbar-btn navbar-btn-danger"
											onClick={() => {
												deleteComment({
													variables: {
														postID: match.params.id,
														commentID,
													},
												});
											}}
										>
											{deleteCommentLoading ? (
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
											) : (
												"Delete"
											)}
										</button>
									</Modal.Footer>
								</Modal>
							</>
						) : (
							<p className="text-muted text-center mt-4">
								No comments yet, be the first to comment!
							</p>
						)}
					</div>
				)
			)}
			<HelmetProvider>
				<Helmet>
					<link
						rel="stylesheet"
						href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
					/>
				</Helmet>
			</HelmetProvider>
		</>
	);
};

export default Post;
