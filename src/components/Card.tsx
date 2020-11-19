import React from "react";
import "../assets/css/Card.scss";
import CommentIcon from "../assets/img/comment.svg";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { Link } from "react-router-dom";
import Trash from "../assets/img/trash.svg";
import Likes from "./Likes";
import { CardProps } from "../types/Card";

const Card = (props: CardProps) => {
	return (
		<div
			className={props.styles || "col-12 my-4"}
			style={{ wordWrap: "break-word" }}
		>
			<div className="lit-card my-3">
				{!props.noLinks ? (
					<Link
						to={`/posts/${props.id}`}
						className="text-decoration-none text-black"
					>
						<img
							className="lit-card-img "
							src={props.img}
							alt=""
							title="View post"
						/>
					</Link>
				) : (
					<img className="lit-card-img " src={props.img} alt="" />
				)}

				{!props.noLikes && (
					<Likes
						likeCount={props.likeCount}
						id={props.id}
						username={props.postUser}
						likeData={props.likeData}
					/>
				)}

				<div className="lit-card-body">
					{props.deletable && (
						<Tippy content="Delete post">
							<img
								className="float-right trans-100 trash-img"
								src={Trash}
								style={{ cursor: "pointer" }}
								alt="delete post"
								width={18}
								onClick={(e) => props.deletePost(props.id)}
							/>
						</Tippy>
					)}
					{!props.noLinks ? (
						<Link
							to={`/posts/${props.id}`}
							className="text-decoration-none text-black"
						>
							<h1
								className="lit-card-title mb-3"
								title="View post"
							>
								{props.title}
							</h1>
							<p className="fs-16">{props.description}</p>
						</Link>
					) : (
						<>
							<h1
								className="lit-card-title mb-3"
								title="View post"
							>
								{props.title}
							</h1>
							<p className="fs-16">{props.description}</p>
						</>
					)}
					{props.postUser && (
						<Link
							to={`/users/${props.postUser}`}
							className="text-decoration-none"
						>
							<p className="lit-card-text mb-3 mx-0">
								<span className="text-black">By: </span>
								{props.postUser}
							</p>
						</Link>
					)}
					<p className="fs-13 float-right">{props.date}</p>

					{!props.noComments ? (
						<>
							{props.noLinks ? (
								<img
									src={CommentIcon}
									width={35}
									alt="comment"
								/>
							) : (
								<Link to={`posts/${props.id}`}>
									<Tippy
										delay={[500, 0]}
										content={
											props.commentCount === 1
												? "View 1 comment"
												: props.commentCount === 0
												? "No comments yet"
												: `View ${props.commentCount} comments`
										}
									>
										<img
											src={CommentIcon}
											width={35}
											alt="comment"
										/>
									</Tippy>
								</Link>
							)}
							<span className="ml-1">{props.commentCount}</span>
						</>
					) : (
						<br />
					)}
				</div>
			</div>
		</div>
	);
};

export default Card;
