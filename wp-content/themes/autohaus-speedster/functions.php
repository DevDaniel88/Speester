<?php
function autohaus_speedster_enqueue_styles() {
    wp_enqueue_style('style', get_stylesheet_uri());
}
add_action('wp_enqueue_scripts', 'autohaus_speedster_enqueue_styles');
?>