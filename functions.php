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
		"baseUrl" => esc_url(home_url()), // Base URL of the site
		"siteName" => get_bloginfo("name"), // Site name
		"siteDescription" => get_bloginfo("description"), // Site description
		"isPage" => is_page(), // Determines whether the query is for an existing single page
		"isSingle" => is_single(), // Determines whether the query is for an existing single post
		"isSingular" => is_singular(), // Determines whether the query is for an existing single post of any post type
		"theId" => get_the_id(), // Get the Id of a given page
		"nonce" => wp_create_nonce("wp_rest"), // Create nonce value for rest api
	];

	// Localize script to pass data from PHP to JavaScript
	wp_localize_script("main-script", "wpData", $wpData);
}
add_action("wp_enqueue_scripts", "enqueue_scripts");

// Register menu locations
function register_menus()
{
	register_nav_menus([
		"headerMenu" => __("Header Menu"),
		"footerMenu" => __("Footer Menu"),
	]);
}
add_action("init", "register_menus");

/* -------------------------------------------------------------------------- */
/*                                 CUSTOMIZERS                                */
/* -------------------------------------------------------------------------- */

// Header Section
function theme_header_customizer($wp_customize)
{
	$wp_customize->add_section("header_section", [
		"title" => "Header",
		"priority" => 160,
	]);

	// Title Text Setting
	$wp_customize->add_setting("title_text_setting", [
		"default" => "FooBar Blog",
	]);
	$wp_customize->add_control("title_text_setting", [
		"section" => "header_section",
		"label" => "Title",
		"type" => "text",
	]);

	// Logo Image Setting
	$wp_customize->add_setting("logo_image_setting");
	$wp_customize->add_control(
		new WP_Customize_Image_Control($wp_customize, "logo_image_setting", [
			"section" => "header_section",
			"label" => "Logo",
		])
	);
}
add_action("customize_register", "theme_header_customizer");
