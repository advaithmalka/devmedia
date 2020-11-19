import React, { useState, useContext, useEffect } from "react";
import Card from "../components/Card";
import { loader } from "graphql.macro";
import { AuthContext } from "../context";
import { useMutation, useQuery } from "@apollo/client";
const CREATE_POST = loader("../graphql/CREATE_POST.graphql");
const QUERY_POSTS = loader("../graphql/QUERY_POSTS.graphql");
const AddPost = (props: any) => {
	const [values, setValues] = useState({
		title: "",
		description: "",
		img: "",
	});
	const [msgs, setMsgs] = useState({
		error: "",
		success: "",
	});
	interface Target {
		name: string;
		value: string;
	}
	const handleChange = ({ target }: { target: Target }) => {
		setValues({
			...values,
			[target.name]: target.value,
		});
		setMsgs((prev) => ({
			...prev,
			error: "",
		}));
	};
	useEffect(() => {
		return () => {
			setValues({
				title: "",
				description: "",
				img: "",
			});
			setMsgs({
				error: "",
				success: "",
			});
		};
	}, []);

	const [createPost, { error, loading }] = useMutation(CREATE_POST, {
		variables: values,
		onCompleted() {
			setValues({
				title: "",
				description: "",
				img: "",
			});
			props.handleOutput();
		},
		update(cache, data) {
			const posts: any = cache.readQuery({
				query: QUERY_POSTS,
			});
			cache.writeQuery({
				query: QUERY_POSTS,
				data: {
					queryPosts: [data.data.createPost, ...posts.queryPosts],
				},
			});
		},
	});
	if (error) {
		setMsgs((prev) => {
			return {
				...prev,
				error: "An error occurred",
			};
		});
	}
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
		imageExists(values.img, (img: boolean) => {
			if (img) {
				createPost();
			} else {
				setMsgs((prev) => {
					return {
						...prev,
						error: "Please provide a valid image url",
					};
				});
			}
		});
	};

	useQuery(QUERY_POSTS);

	const { user }: { user: any } = useContext(AuthContext);
	return (
		<div className="lit-pfp my-3" style={{ backgroundColor: "white" }}>
			<div className="lit-pfp-body pb-4">
				<h3 className="text-center mt-2 mb-4">Create a post</h3>
				<h4 className="text-center fw-400">Preview</h4>
				<Card
					title={values.title}
					description={values.description}
					img={values.img}
					date={"Just now"}
					likeCount={0}
					postUser={`${user.username}`}
					id={``}
					styles={"col-lg-12"}
					commentCount={0}
					noLikes
				/>

				<form onSubmit={handleSubmit}>
					<input
						type="text"
						required
						className="form-control my-3"
						placeholder="Project title"
						name="title"
						value={values.title}
						onChange={handleChange}
					/>
					<input
						type="text"
						className="form-control my-3"
						placeholder="Project image url"
						required
						name="img"
						value={values.img}
						onChange={handleChange}
					/>
					<textarea
						required
						className="form-control my-3"
						placeholder="Project description"
						name="description"
						value={values.description}
						onChange={handleChange}
					/>
					<div className="text-center mt-3">
						<p className="text-center text-success mt-3">
							{msgs.success}
						</p>
						<p className="text-center text-danger mt-3">
							{msgs.error}
						</p>
						<button className="navbar-btn">
							{!loading ? (
								"CREATE POST"
							) : (
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
							)}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default AddPost;
