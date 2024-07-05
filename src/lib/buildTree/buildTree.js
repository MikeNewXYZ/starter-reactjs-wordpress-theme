export default function buildTree(items, parentIdKey, IdKey) {
	if (!items) return;

	function sort(items, parent = 0) {
		return items
			.filter((item) => parseInt(item[parentIdKey]) === parent)
			.map((item) => ({ ...item, childItems: sort(items, parseInt(item[IdKey])) }));
	}

	return sort(items);
}
