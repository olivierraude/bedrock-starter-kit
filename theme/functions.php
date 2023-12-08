<?php

function theme_supports()
{
  add_theme_support('title-tag');
}

function theme_register_assets()
{
  wp_register_style('monstyle', get_stylesheet_directory_uri() . '/sass/style.css');

  wp_register_script('gsap', 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js', [], false, true);
  wp_register_script('monscript', get_stylesheet_directory_uri() . '/js/main.js', [], false, true);

  wp_enqueue_style('monstyle');

  wp_enqueue_script('gsap');
  wp_enqueue_script('monscript');
}


add_action('after_setup_theme', 'theme_supports');
add_action('wp_enqueue_scripts', 'theme_register_assets');
