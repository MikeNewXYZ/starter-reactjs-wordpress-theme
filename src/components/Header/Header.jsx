import buildTree from "../../lib/buildTree/buildTree";

export default function Header() {
	const headerCustomizer = wpData.customizer.header;
	const menuItems = buildTree(wpData.menuItems.headerMenu, "menu_item_parent", "ID");

	return (
		<header className="container">
			<nav>
				<ul>
					<li>
						{/* Header Title from customizer */}
						<strong>
							<a href="/">{headerCustomizer.title}</a>
						</strong>
					</li>
				</ul>

				<ul>
					{menuItems.map(({ title, url, ID, childItems }, index) => {
						// Menu item has no child items
						if (childItems.length === 0) {
							return (
								<li key={ID}>
									<a href={url} class="secondary">
										{title}
									</a>
								</li>
							);
						}

						// Menu item has child items
						return (
							<li key={ID}>
								<details class="dropdown">
									<summary>{title}</summary>

									{/* If menu item is last then change dropdown direction to prevent overflow */}
									<ul dir={menuItems.length - 1 === index ? "rtl" : "ltr"}>
										{childItems.map(({ title, url, ID }) => (
											<li key={ID}>
												<a href={url}>{title}</a>
											</li>
										))}
									</ul>
								</details>
							</li>
						);
					})}
				</ul>
			</nav>
			<hr style={{ margin: 0, marginBottom: "30px" }} />
		</header>
	);
}
