import React from "react";
import { Link } from "react-router-dom";
import Tippy from "@tippyjs/react";
import Trash from "../assets/img/trash.svg";

interface commentProps {
	username: string;
	text: string;
	dateCreated: string;
	profileImg: string;
	deletable: boolean;
	id: string;
	deleteHandler: any;
}

const Comment = (props: commentProps) => {
	return (
		<div className="comment">
			<div className="float-left">
				<Link to={`../users/${props.username}`}>
					<img
						src={props.profileImg}
						alt=""
						className="float-left circle"
						style={{
							borderRadius: "50%",
							width: 80,
							height: 80,
						}}
					/>
				</Link>
			</div>
			{props.deletable && (
				<Tippy content="Delete comment">
					<img
						className="float-right trans-100 trash-img"
						src={Trash}
						style={{ cursor: "pointer" }}
						alt="delete comment"
						width={18}
						onClick={(e) => props.deleteHandler(props.id)}
					/>
				</Tippy>
			)}
			<div style={{ marginLeft: 100 }}>
				<p className="fw-500">{props.username}</p>
				<p>{props.text}</p>
			</div>
			<p className="float-right" style={{ fontSize: 15 }}>
				{props.dateCreated}
			</p>
			<br />
		</div>
	);
};

export default Comment;
