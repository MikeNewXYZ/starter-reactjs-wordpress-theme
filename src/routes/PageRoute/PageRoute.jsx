import { useEffect, useState } from "@wordpress/element";
import Content from "../../components/Content/Content";

export default function PageRoute() {
	const [data, setData] = useState(null);

	useEffect(() => getData(), []);

	const getData = async () => {
		const reponse = await fetch(`${wpData.baseUrl}/wp-json/wp/v2/pages/${wpData.theId}`);
		const data = await reponse.json();

		setData(data);
	};

	if (!data) {
		return <p>loading</p>;
	}

	return (
		<main className="container mx-auto">
			<h1 className="text-3xl font-bold underline">{data.title.rendered}</h1>
			<Content data={data.content.rendered} />
		</main>
	);
}
