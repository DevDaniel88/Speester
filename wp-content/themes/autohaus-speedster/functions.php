<?php

/** ENQUEUE STYLES */
function autohaus_speedster_enqueue_styles()
{
    wp_enqueue_style('style', get_stylesheet_uri());
}
add_action('wp_enqueue_scripts', 'autohaus_speedster_enqueue_styles');


/** ENQUEUE SCRIPTS */
function autohaus_speedster_enqueue_scripts()
{
    wp_enqueue_script('header-js', 'src/js/header.js', array(), null, true);
}
add_action('wp_enqueue_scripts', 'autohaus_speedster_enqueue_scripts');


/** SETUP */
function autohaus_speedster_setup()
{
    // Add support for post thumbnails
    add_theme_support('post-thumbnails');
}
add_action('after_setup_theme', 'autohaus_speedster_setup');
