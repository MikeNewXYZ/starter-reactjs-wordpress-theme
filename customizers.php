<?php

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
