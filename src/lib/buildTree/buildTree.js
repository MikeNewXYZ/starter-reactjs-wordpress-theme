export default function buildTree(items, parentIdKey, IdKey) {
	if (!items) return;

	function sort(items, parent = 0) {
		return items
			.filter((item) => parseInt(item[parentIdKey]) === parent)
			.map((item) => ({ ...item, children: sort(items, item[IdKey]) }));
	}

	return sort(items);
}
