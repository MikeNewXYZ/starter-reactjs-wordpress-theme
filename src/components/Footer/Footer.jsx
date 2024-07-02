import { useEffect, useState } from "@wordpress/element";
import DOMPurify from "dompurify";
import getWidgets from "../../api/getWidgets/getWidgets";

// TODO layout styles for widget don't load for some reason

export default function Footer() {
	const [footerHtml, setFooterHtml] = useState(null);
	const [error, setError] = useState({ isError: false, errorMessage: "" });

	// Fetch footer data
	useEffect(() => {
		const getFooterHtml = async () => {
			const response = await getWidgets("footer");

			if (!response.success) {
				setError({ isError: true, errorMessage: response.error });
				return;
			}

			const html = response.data.map(({ rendered }) => rendered).join("");

			setFooterHtml(html);
		};
		getFooterHtml();
	}, []);

	// Sanitize html
	const sanitizedFooterHtml = () => ({
		__html: DOMPurify.sanitize(footerHtml),
	});

	// Render error message if fetching footer data fails
	if (error.isError) {
		return <p>ERROR: {error.errorMessage}</p>;
	}

	// Render loading message when footer is still loading data
	if (!footerHtml) {
		return <p>loading</p>;
	}

	return (
		<footer className="bg-neutral p-10 text-neutral-content">
			<ul dangerouslySetInnerHTML={sanitizedFooterHtml()}></ul>
		</footer>
	);
}
