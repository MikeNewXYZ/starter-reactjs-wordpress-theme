import buildTree from "../../lib/buildTree/buildTree";

export default function Footer() {
	const menuItems = buildTree(wpData.menuItems.footerMenu, "menu_item_parent", "ID");

	return (
		<footer className="container">
			<hr />
			<aside>
				<nav>
					<ul className="grid" style={{ alignItems: "start" }}>
						{menuItems.map(({ title, url, ID, childItems }) => (
							<li key={ID}>
								<a href={url}>{title}</a>

								{childItems.length !== 0 && (
									<ul>
										{childItems.map(({ title, url, ID }) => (
											<li key={ID}>
												<a href={url}>- {title}</a>
											</li>
										))}
									</ul>
								)}
							</li>
						))}
					</ul>
				</nav>
			</aside>
		</footer>
	);
}
