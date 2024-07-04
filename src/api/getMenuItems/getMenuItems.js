async function getMenuId(menuLocation) {
	try {
		const response = await fetch(`/wp-json/wp/v2/menu-locations/${menuLocation}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				"X-WP-Nonce": wpData.nonce,
			},
		});

		if (!response.ok) throw new Error(response.statusText);

		const data = await response.json();

		return {
			success: true,
			data: data.menu,
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
		.filter((menuItem) => menuItem.parent === parent)
		.map((menuItem) => ({ ...menuItem, children: buildTree(menuItems, menuItem.id) }));

	return newMenuItems;
}

export default async function getMenuItems(menuLocation) {
	try {
		const menuId = await getMenuId(menuLocation);

		if (!menuId.success) throw new Error(menuId.error);

		const response = await fetch(`/wp-json/wp/v2/menu-items?menus=${menuId.data}`, {
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
			dat: menuItemsTree,
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
