import { useEffect, useState } from "@wordpress/element";
import Content from "../../components/Content/Content";
import getPageData from "../../api/getPageData/getPageData";

export default function PageRoute() {
	const [data, setData] = useState(null);
	const [error, setError] = useState({ isError: false, errorMessage: "" });

	// Fetch page data
	useEffect(() => {
		const getData = async () => {
			const response = await getPageData(wpData.theId);

			if (!response.success) {
				setError({ isError: true, errorMessage: response.error });
				return;
			}

			setData(response.data);
		};
		getData();
	}, []);

	// Render error message if fetching page data fails
	if (error.isError) {
		return <p>ERROR: {error.errorMessage}</p>;
	}

	// Render loading message when page is still loading data
	if (!data) {
		return <p>loading</p>;
	}

	// Render main content if page data is successfully fetched
	return (
		<main className="container mx-auto">
			<Content data={`<h1>${data.title.rendered}</h1>${data.content.rendered}`} />
		</main>
	);
}
