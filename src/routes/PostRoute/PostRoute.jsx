import ContentContainer from "../../components/ContentContainer/ContentContainer";

export default function PostRoute() {
	const postData = wpData.pageData.current;

	return (
		<>
			<h1>This is a Post Route</h1>
			<ContentContainer content={postData.post_content} />
		</>
	);
}
