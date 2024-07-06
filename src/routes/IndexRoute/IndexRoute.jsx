import ContentContainer from "../../components/ContentContainer/ContentContainer";

export default function IndexRoute() {
	const frontData = wpData.pageData.front;

	return (
		<>
			<h1>This is a Index/Home Route</h1>
			<ContentContainer content={frontData.post_content} />
		</>
	);
}
