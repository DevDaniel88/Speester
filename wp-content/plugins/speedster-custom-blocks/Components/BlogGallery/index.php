<?php
function speedster_custom_blocks_render_bloggallery($attributes)
{
    $args = array(
        'post_type' => 'post',
        'posts_per_page' => 2,
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
            $output .= '<h2 class="bloggallery-title">' . get_the_title() . '</h2>';
            $output .= '<div class="bloggallery-excerpt">' . get_the_excerpt() . '</div>';
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
        $output .= '<button class="bloggallery-loadmore" data-page="' . esc_attr($current_page) . '">Load More</button>';
    }

    return $output;
}

function speedster_custom_blocks_register_bloggallery_block()
{
    register_block_type(__DIR__, array(
        'render_callback' => 'speedster_custom_blocks_render_bloggallery',
    ));
}
add_action('init', 'speedster_custom_blocks_register_bloggallery_block');
