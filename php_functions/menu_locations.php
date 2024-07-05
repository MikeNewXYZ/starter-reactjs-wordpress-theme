<?php

// Register menu locations
function register_menus()
{
	register_nav_menus([
		"headerMenu" => "Header Menu",
		"footerMenu" => "Footer Menu",
	]);
}
add_action("init", "register_menus");

?>
