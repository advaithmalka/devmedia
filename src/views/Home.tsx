import React, { useEffect } from "react";
import Card from "../components/Card";
import { useQuery } from "@apollo/client";
import { Row, Container } from "react-bootstrap";
import moment from "moment";
import { loader } from "graphql.macro";

const QUERY_POSTS = loader("../graphql/QUERY_POSTS.graphql");

const Home = (props: any) => {
	useEffect(() => {
		document.title = "Home | DevMedia";
	});
	const { data, loading } = useQuery(QUERY_POSTS);

	return (
		<>
			<Container style={{ maxWidth: 700 }}>
				<Row className="justify-content-center ">
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
						data &&
						data.queryPosts.map((post: any) => {
							return (
								<Card
									title={post.title}
									description={post.description}
									img={post.img}
									key={post.id}
									date={moment
										.unix(post.dateCreated)
										.fromNow()}
									likeCount={post.countLikes}
									likeData={post.likes}
									postUser={post.username}
									id={post.id}
									commentCount={post.countComments}
								/>
							);
						})
					)}
				</Row>
			</Container>
		</>
	);
};

export default Home;
