import { useLoaderData, useNavigate, useParams, useRevalidator } from "react-router-dom";
import ContentContainer from "../../components/ContentContainer/ContentContainer";

export default function PostsRoute() {
	const posts = useLoaderData();
	const params = useParams();
	const navigate = useNavigate();
	const revalidator = useRevalidator();

	function handleNextPage() {
		if (!params?.index) {
			navigate("page/2");
		} else {
			navigate(`page/${parseInt(params?.index) + 1}`);
		}
		revalidator.revalidate();
	}

	function handPrevPage() {
		if (parseInt(params?.index) === 2) {
			navigate("");
		} else {
			navigate(`page/${parseInt(params?.index) - 1}`);
		}

		revalidator.revalidate();
	}

	return (
		<>
			<h1>This is a Blog Posts Route</h1>

			<div>
				{posts?.map(({ ID, title, excerpt, link }) => (
					<article key={ID}>
						<header>
							<a href={link}>{title.rendered}</a>
						</header>
						<ContentContainer content={excerpt.rendered} />
					</article>
				))}
			</div>

			<div role="group">
				<button disabled={!params?.index} onClick={handPrevPage}>
					Prev
				</button>
				<button
					disabled={Math.ceil(parseInt(wpData.postsCount) / 10) === parseInt(params?.index)}
					onClick={handleNextPage}
				>
					Next
				</button>
			</div>
		</>
	);
}
