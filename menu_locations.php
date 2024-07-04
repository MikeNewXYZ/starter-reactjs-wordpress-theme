<?php

// Register menu locations
function register_menus()
{
	register_nav_menus([
		"headerMenu" => __("Header Menu"),
		"footerMenu" => __("Footer Menu"),
	]);
}
add_action("init", "register_menus");
