export default function Comments({ comments = [], getComments = () => {} }) {
	if (comments.length === 0) {
		return <p>no comments</p>;
	}

	return (
		<section>
			<h1>COMMENTS SECTION</h1>
			<ol>
				{comments.map(({ id, content }) => (
					<li key={id} id={id} dangerouslySetInnerHTML={{ __html: content.rendered }}></li>
				))}
			</ol>
		</section>
	);
}
