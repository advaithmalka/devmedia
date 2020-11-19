import React from "react";
import { useMutation } from "@apollo/client";
import { loader } from "graphql.macro";

const FOLLOW = loader("../graphql/FOLLOW.graphql");
const FollowButton = (props: any) => {
	const [follow] = useMutation(FOLLOW, {
		variables: {
			userID: props.userId,
		},
	});
	const isFollower = props.followers.find(
		(follower: any) => follower.username === props.authUser
	);
	return (
		<>
			{!isFollower ? (
				<button className="follow-btn" onClick={(e) => follow()}>
					Follow
				</button>
			) : (
				<button
					className="follow-btn unfollow"
					onClick={(e) => follow()}
				>
					Unfollow
				</button>
			)}
		</>
	);
};

export default FollowButton;
