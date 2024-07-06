import ContentContainer from "../../components/ContentContainer/ContentContainer";

export default function PageRoute() {
	const pageData = wpData.pageData.current;

	return (
		<>
			<h1>This is a Page Route</h1>
			<ContentContainer content={pageData.post_content} />
		</>
	);
}
