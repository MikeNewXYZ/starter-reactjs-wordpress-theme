async function getMenuId(menuLocation) {
	try {
		const response = await fetch("/wp-json/custom/menu-locations", {
			method: "GET",
			headers: { "Content-Type": "application/json" },
		});

		if (!response.ok) throw new Error(response.statusText);

		const data = await response.json();

		return {
			success: true,
			data: data[menuLocation],
		};
	} catch (error) {
		console.error(error);

		return {
			success: false,
			error: error.message,
		};
	}
}

// Converts a flat array of objects into an array tree
function buildTree(menuItems, parent = 0) {
	const newMenuItems = menuItems
		.filter((menuItem) => parseInt(menuItem.menu_item_parent) === parent)
		.map((menuItem) => ({ ...menuItem, children: buildTree(menuItems, menuItem.ID) }));

	return newMenuItems;
}

export default async function getMenuItems(menuLocation) {
	try {
		const menuId = await getMenuId(menuLocation);

		if (!menuId.success) throw new Error(menuId.error);

		const response = await fetch(`/wp-json/custom/menu/${menuId.data}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				"X-WP-Nonce": wpData.nonce,
			},
		});

		if (!response.ok) throw new Error(response.statusText);

		const data = await response.json();

		const menuItemsTree = buildTree(data);

		return {
			success: true,
			data: menuItemsTree,
		};
	} catch (error) {
		console.error(error);

		return {
			success: false,
			error: error.message,
		};
	}
}
getMenuItems("headerMenu");
