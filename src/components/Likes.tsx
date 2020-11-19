import React, { useState, useEffect, useContext } from "react";
import { useMutation } from "@apollo/client";
import Tippy from "@tippyjs/react";
import { loader } from "graphql.macro";
import HeartOutline from "../assets/img/heart-outline.svg";
import HeartFilled from "../assets/img/heart-filled.svg";
import { AuthContext } from "../context";
import { User } from "../types/User";
const LIKE = loader("../graphql/LIKE.graphql");
const Likes = (props: any) => {
	const [isLiked, setIsLiked] = useState(false);
	const {
		user: authUser,
	}: { user: User | null; logoutUser: any } = useContext(AuthContext);
	useEffect(() => {
		if (
			props.likeData.find(
				(like: any) => like.username === authUser!.username
			)
		) {
			setIsLiked(true);
		} else {
			setIsLiked(false);
		}
	}, [props.likeData, authUser]);
	const [like] = useMutation(LIKE, {
		variables: {
			ID: props.id,
		},
	});
	return (
		<>
			<Tippy content={isLiked ? "Unlike post" : "Like post"}>
				<div
					style={{ cursor: "pointer" }}
					className="float-right mt-2 mr-3"
					onClick={(e) => like()}
				>
					<img
						src={isLiked ? HeartFilled : HeartOutline}
						alt="Unlike"
						width={30}
					/>
				</div>
			</Tippy>
			<span className="float-right mt-2 mr-2">{props.likeCount}</span>
		</>
	);
};

export default Likes;
