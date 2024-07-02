<?php
// Function to enqueue scripts and styles
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
		"theId" => get_the_id(),
	];

	// Localize script to pass data from PHP to JavaScript
	wp_localize_script("main-script", "wpData", $wpData);
}

// Hook the enqueue_scripts function to the wp_enqueue_scripts action
add_action("wp_enqueue_scripts", "enqueue_scripts");

remove_action("template_redirect", "redirect_canonical");

function register_widgets()
{
	// Register Menu Widget
	register_sidebar([
		"id" => "menu",
		"name" => "Menu",
		"show_in_rest" => true,
	]);

	// Register Footer Widget
	register_sidebar([
		"id" => "footer",
		"name" => "Footer",
		"show_in_rest" => true,
	]);
}

add_action("widgets_init", "register_widgets");
