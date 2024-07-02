import { useEffect, useState } from "@wordpress/element";
import Comments from "../../components/Comments/Comments";

export default function PostRoute() {
	const [data, setData] = useState(null);
	const [comments, setComments] = useState([]);

	useEffect(() => getData(), []);

	const getData = async () => {
		const reponse = await fetch(`${wpData.baseUrl}/wp-json/wp/v2/posts/${wpData.theId}`);
		const data = await reponse.json();

		if (data.comment_status == "open") {
			getComments();
		}

		console.log(data);

		setData(data);
	};

	const getComments = async (query = "&per_page=5") => {
		const reponse = await fetch(
			`${wpData.baseUrl}/wp-json/wp/v2/comments?post=${wpData.theId}${query}`,
		);
		const data = await reponse.json();

		setComments(data);
	};

	if (!data) {
		return <p>loading</p>;
	}

	return (
		<div className="container mx-auto">
			<h1>{data.title.rendered}</h1>
			<section dangerouslySetInnerHTML={{ __html: data.content.rendered }}></section>
			<Comments comments={comments} getComments={getComments} />
		</div>
	);
}
