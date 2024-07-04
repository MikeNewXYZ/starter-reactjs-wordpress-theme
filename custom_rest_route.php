<?php

// Menu Locations
// => /wp-json/custom/menu-locations
function wp_menu_locations_route()
{
	$menuLocations = get_nav_menu_locations();
	return $menuLocations;
}
add_action("rest_api_init", function () {
	register_rest_route("custom", "/menu-locations/", [
		"methods" => "GET",
		"callback" => "wp_menu_locations_route",
	]);
});

// Individual Menus
// => /wp-json/custom/menu/(LOCATION ID)

function wp_menu_route($data)
{
	$menuID = $data["id"];
	$primaryNav = wp_get_nav_menu_items($menuID);
	return $primaryNav;
}
add_action("rest_api_init", function () {
	register_rest_route("custom", "/menu/(?P<id>\d+)", [
		"methods" => "GET",
		"callback" => "wp_menu_route",
	]);
});
