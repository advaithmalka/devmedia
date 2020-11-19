import React from "react";
import { useMutation } from "@apollo/client";
import { loader } from "graphql.macro";
const DELETE_POST = loader("../graphql/DELETE_POST.graphql");
const QUERY_POSTS = loader("../graphql/QUERY_POSTS.graphql");
const DeletePost = (props: any) => {
	const [deletePost, { loading: deletePostLoading }] = useMutation(
		DELETE_POST,
		{
			onCompleted() {
				props.setModal(false);
				props.refetch();
			},
			refetchQueries: [{ query: QUERY_POSTS }],
		}
	);
	return (
		<>
			<button
				className="navbar-btn navbar-btn-primary"
				onClick={() => props.setModal(false)}
			>
				Close
			</button>
			<button
				className="navbar-btn navbar-btn-danger"
				onClick={() => {
					deletePost({
						variables: {
							ID: props.postId,
						},
					});
				}}
			>
				{deletePostLoading ? (
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
				) : (
					"Delete"
				)}
			</button>
		</>
	);
};

export default DeletePost;
