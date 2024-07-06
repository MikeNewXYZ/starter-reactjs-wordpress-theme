// Takes a flat array and builds an array tree
// This is useful for menu items from wordpress which are flat by default
export default function buildTree(items, parentIdKey, IdKey) {
	if (!items) return;

	function sort(items, parent = 0) {
		return items
			.filter((item) => parseInt(item[parentIdKey]) === parent)
			.map((item) => ({ ...item, childItems: sort(items, parseInt(item[IdKey])) }));
	}

	return sort(items);
}
