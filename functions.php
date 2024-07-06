<?php

// Enqueue scripts and styles
function enqueue_scripts()
{
	// Enqueue the main JavaScript file
	wp_enqueue_script(
		"main-script",
		get_template_directory_uri() . "/build/index.js",
		["wp-element"],
		"1.0.0",
		true
	);

	// Enqueue the main stylesheet
	wp_enqueue_style("main-styles", get_template_directory_uri() . "/build/index.css");
}
add_action("wp_enqueue_scripts", "enqueue_scripts");

include get_template_directory() . "/php_functions/pass_wp_data_to_js.php";
include get_template_directory() . "/php_functions/menu_locations.php";
include get_template_directory() . "/php_functions/customizers.php";

?>
