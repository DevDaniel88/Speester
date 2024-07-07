<!DOCTYPE html>
<html <?php language_attributes(); ?>>

<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php wp_title(); ?></title>
    <link rel="apple-touch-icon" sizes="180x180" href="src/favicon/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="src/favicon/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="src/favicon/favicon-16x16.png">
    <link rel="manifest" href="src/favicon/site.webmanifest">
    <?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
    <header class="site-header">
        <div class="container">
            <div class="logo">
                <a href="<?php echo esc_url(home_url('/')); ?>">
                    <img src="<?php echo get_template_directory_uri(); ?>/images/logo.png" alt="<?php bloginfo('name'); ?>" />
                </a>
            </div>
            <nav class="main-navigation">
                <?php
                wp_nav_menu(array(
                    'theme_location' => 'primary',
                    'menu_class'     => 'menu',
                    'container'      => false,
                ));
                ?>
            </nav>
            <nav class="mobile-navigation">
                <?php
                wp_nav_menu(array(
                    'theme_location' => 'secondary',
                    'menu_class'     => 'menu',
                    'container'      => false,
                ));
                ?>
            </nav>
            <div class="burger-menu">
                <button id="burger-icon">&#9776;</button>
            </div>
        </div>
    </header>