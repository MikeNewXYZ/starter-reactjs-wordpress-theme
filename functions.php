<?php
// Enqueue scripts and styles
function enqueue_scripts()
{
	// Enqueue the main JavaScript file
	wp_enqueue_script(
		"main-script", // Handle name for the script
		get_template_directory_uri() . "/build/index.js", // Path to the script file
		["wp-element"], // Dependencies for this script (in this case, wp-element)
		"1.0.0", // Version of the script
		true // Load script in footer
	);

	// Enqueue the main stylesheet
	wp_enqueue_style("main-styles", get_template_directory_uri() . "/build/index.css");

	// Collect data from wordpress PHP to be passed onto JavaScript
	$wpData = [
		"isPage" => is_page(),
		"isSingle" => is_single(),
		"isSingular" => is_singular(),
		"theId" => get_the_ID(),
		"menuItems" => [
			"headerMenu" => wp_get_nav_menu_items(wp_get_nav_menu_name("headerMenu")),
			"footerMenu" => wp_get_nav_menu_items(wp_get_nav_menu_name("footerMenu")),
		],
	];

	// Localize script to pass data from PHP to JavaScript
	wp_localize_script("main-script", "wpData", $wpData);
}
add_action("wp_enqueue_scripts", "enqueue_scripts");

include get_template_directory() . "./menu_locations.php";
include get_template_directory() . "./customizers.php";
