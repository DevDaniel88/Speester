<?php

/**
 * Plugin Name: Speedster Custom Blocks
 * Description: A plugin to add custom Gutenberg blocks.
 * Version: 1.0.0
 * Author: Daniel Scholz
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly.
}

function speedster_custom_blocks_register_block()
{
    $plugin_dir = plugin_dir_url(__FILE__);
    $dist_dir = $plugin_dir . 'dist/';

    $files = scandir(plugin_dir_path(__FILE__) . 'dist');
    foreach ($files as $file) {
        if (pathinfo($file, PATHINFO_EXTENSION) === 'js') {
            $handle = pathinfo($file, PATHINFO_FILENAME);
            wp_enqueue_script(
                'speedster-custom-blocks-' . $handle,
                $dist_dir . $file,
                array('wp-blocks', 'wp-element', 'wp-editor', 'wp-components', 'wp-data'),
                filemtime(plugin_dir_path(__FILE__) . 'dist/' . $file),
                true
            );
        }
    }
    foreach ($files as $file) {
        if (pathinfo($file, PATHINFO_EXTENSION) === 'css') {
            $handle = pathinfo($file, PATHINFO_FILENAME);
            wp_enqueue_style(
                'speedster-custom-blocks-' . $handle,
                $dist_dir . $file,
                array(),
                filemtime(plugin_dir_path(__FILE__) . 'dist/' . $file)
            );
        }
    }
    register_block_type(plugin_dir_path(__FILE__) . 'Components/BlogGallery/block.json', array(
        'render_callback' => 'speedster_custom_blocks_render_bloggallery'
    ));
}
add_action('init', 'speedster_custom_blocks_register_block');


/** CATEGORIES */
/** Custom Block category */
function speedster_block_categories($categories, $post)
{
    return array_merge(
        array(
            array(
                'slug'  => 'speedster',
                'title' => __('Speedster Custom Blocks', 'text-domain'),
                'icon'  => 'dashicons-car',
            ),
        ),
        $categories
    );
}
add_filter('block_categories_all', 'speedster_block_categories', 10, 2);


/** SHORTCODES */
/** Returns a link that automatically forwards to the newest blog entry */
function latest_post_link()
{
    $latest_post = get_posts(array(
        'numberposts' => 1
    ));
    if (!empty($latest_post)) {
        $post_url = get_permalink($latest_post[0]->ID);
        $post_title = $latest_post[0]->post_title;
        return esc_url($post_url);
    }
    return '';
}
add_shortcode('latest_post', 'latest_post_link');


// Server-side rendering function for BlogGallery Component
function speedster_custom_blocks_render_bloggallery($attributes)
{
    $args = array(
        'post_type' => 'post',
        'posts_per_page' => 4,
        'paged' => isset($attributes['page']) ? $attributes['page'] : 1
    );

    $query = new WP_Query($args);

    $output = '<div class="bloggallery">';
    if ($query->have_posts()) {
        while ($query->have_posts()) {
            $query->the_post();
            $output .= '<div class="bloggallery-item">';
            if (has_post_thumbnail()) {
                $output .= '<div class="bloggallery-thumbnail">' . get_the_post_thumbnail() . '</div>';
            }
            $output .= '<div class="bloggallery-content">';
            $output .= '<h3 class="bloggallery-title">' . get_the_title() . '</h3>';
            $output .= '<p class="bloggallery-excerpt">' . get_the_excerpt() . '</p>';
            $output .= '<a class="bloggallery-readmore" href="' . get_permalink() . '">Read More</a>';
            $output .= '</div></div>';
        }
        wp_reset_postdata();
    } else {
        $output .= '<p>No posts found.</p>';
    }
    $output .= '</div>';

    // Determine if there are more posts to load
    $total_pages = $query->max_num_pages;
    $current_page = isset($attributes['page']) ? $attributes['page'] : 1;
    if ($current_page < $total_pages) {
        $output .= '<button class="bloggallery-loadmore" data-page="' . esc_attr($current_page) . '" data-last-page="false">Load More</button>';
    } else {
        $output .= '<button class="bloggallery-loadmore" data-page="' . esc_attr($current_page) . '" data-last-page="true" style="display: none;">Load More</button>';
    }

    return $output;
}


// Car Carousel Specifics
function speedster_custom_blocks_register()
{
    register_block_type(__DIR__ . '/Components/CarCarousel');
}
add_action('init', 'speedster_custom_blocks_register');

function speedster_custom_blocks_enqueue()
{
    // Enqueue Slick Carousel JS and CSS files from src folder
    wp_enqueue_script(
        'slick-carousel',
        plugins_url('src/js/slick.min.js', __FILE__),
        array('jquery'),
        '1.8.1',
        true
    );

    wp_enqueue_style(
        'slick-carousel-style',
        plugins_url('src/css/slick.css', __FILE__),
        array(),
        '1.8.1'
    );

    wp_enqueue_style(
        'slick-carousel-theme',
        plugins_url('src/css/slick-theme.css', __FILE__),
        array('slick-carousel-style'),
        '1.8.1'
    );

    wp_enqueue_style(
        'speedster-car-carousel-editor',
        plugins_url('Components/CarCarousel/editor.css', __FILE__),
        array('wp-edit-blocks'),
        filemtime(plugin_dir_path(__FILE__) . 'Components/CarCarousel/editor.css')
    );

    wp_enqueue_style(
        'speedster-car-carousel',
        plugins_url('Components/CarCarousel/style.css', __FILE__),
        array(),
        filemtime(plugin_dir_path(__FILE__) . 'Components/CarCarousel/style.css')
    );
}
add_action('enqueue_block_assets', 'speedster_custom_blocks_enqueue');
