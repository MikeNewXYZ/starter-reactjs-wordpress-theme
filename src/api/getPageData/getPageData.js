// Fetch page data using page id
export default async function getPageData(pageId) {
	try {
		const response = await fetch(`${wpData.baseUrl}/wp-json/wp/v2/pages/${pageId}`);

		if (!response.ok) throw new Error(response.statusText);

		const data = await response.json();

		return {
			success: true,
			data,
		};
	} catch (error) {
		console.error(error);

		return {
			success: false,
			error: error.message,
		};
	}
}
