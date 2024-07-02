export default async function getWidgets(id) {
	try {
		const response = await fetch(`${wpData.baseUrl}/wp-json/wp/v2/widgets?sidebar=${id}`);

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
