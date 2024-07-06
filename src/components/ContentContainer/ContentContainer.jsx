import DOMPurify from "dompurify";

export default function ContentContainer({ content }) {
	const sanitizedContent = () => ({
		__html: DOMPurify.sanitize(content),
	});

	return <section dangerouslySetInnerHTML={sanitizedContent()}></section>;
}
