<?php

// Function to gather various WordPress data and localize it for use in JavaScript.
function pass_wp_data_to_js()
{
	// Prepare an array with various WordPress data
	$wpData = [
		// Check if the current page is a single page, post, or a singular
		"isPage" => is_page(),
		"isSingle" => is_single(),
		"isSingular" => is_singular(),

		// Get the ID and full post object of the current post/page
		"theId" => get_the_ID(),
		"postData" => get_post(get_the_ID()),

		// Retrieve navigation menu items from menu locations
		"menuItems" => [
			"headerMenu" => wp_get_nav_menu_items(wp_get_nav_menu_name("headerMenu")),
			"footerMenu" => wp_get_nav_menu_items(wp_get_nav_menu_name("footerMenu")),
		],

		// Retrieve customizer settings
		"customizer" => [
			"header" => [
				"title" => get_theme_mod("header_title_setting", "FooBar Blog"),
				"logo" => get_theme_mod("header_logo_setting"),
			],
		],
	];

	// Make the $wpData array available in the 'main-script' JavaScript file
	wp_localize_script("main-script", "wpData", $wpData);
}
add_action("wp_enqueue_scripts", "pass_wp_data_to_js");

?>
