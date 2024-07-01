import { twMerge } from "tailwind-merge";
import DOMPurify from "dompurify";

export default function Content({ className, data }) {
	const sanitizedData = () => ({
		__html: DOMPurify.sanitize(data),
	});

	return (
		<article
			class={twMerge("prose mx-auto px-2 lg:prose-xl", className)}
			dangerouslySetInnerHTML={sanitizedData()}
		></article>
	);
}
