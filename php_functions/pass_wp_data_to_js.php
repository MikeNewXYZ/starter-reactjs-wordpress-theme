<?php

// Function to gather various WordPress data and localize it for use in JavaScript.
function pass_wp_data_to_js()
{
	// Get page data for current and specific pages and apply "the_content" filter to the post_content property
	$currentPageData = get_post(get_the_ID());
	$currentPageData->post_content = apply_filters("the_content", $currentPageData->post_content);

	$frontPageData = get_post(get_option("page_on_front"));
	$frontPageData->post_content = apply_filters("the_content", $frontPageData->post_content);

	$postsPageData = get_post(get_option("page_for_posts"));
	$postsPageData->post_content = apply_filters("the_content", $postsPageData->post_content);

	// Prepare an array with various WordPress data
	$wpData = [
		// Check if the current page is a single page, post, or a singular
		"isPage" => is_page(),
		"isSingle" => is_single(),
		"isSingular" => is_singular(),

		// Total number of published posts
		"postsCount" => wp_count_posts()->publish,

		// Page data for current and specific pages
		"pageData" => [
			"current" => $currentPageData,
			"front" => $frontPageData,
			"posts" => $postsPageData,
		],

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
