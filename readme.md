# Autohaus Speedster Project - README

## Installation Guide

To install the Autohaus Speedster project locally, follow these steps:

1. **Set up a local WordPress environment:** I recommend using [Localwp](https://localwp.com/).
2. **Clone the repository:** Clone the repository into the appropriate folder from here: [https://github.com/DevDaniel88/Speester](https://github.com/DevDaniel88/Speester).
   - Integrate the files into your local WordPress setup.
3. **Open the terminal:** Navigate to the `speedster-custom-blocks` folder inside the `wp-content/plugins` directory.
4. **Install necessary packages:** Run `npm install` to install all required packages.
5. **Activate theme and plugin:** Log in to your local WordPress admin interface, activate the _Speedster Autohaus Theme_, and also activate the _speedster custom blocks_ plugin.
6. **Create a site:** Create a site and find the three new blocks in Gutenberg under the Speedster Category.

## Project Overview

The Autohaus Speedster project includes three custom Gutenberg blocks that enhance your WordPress site’s functionality and presentation:

- **Hero Stage:** Displays a full-size image with text and a Call to Action (CTA) on top. It is perfect for making a strong visual impact on the homepage or landing pages.
- **Blog Gallery:** Displays the newest three blog posts with a "load more" button if there are additional posts. It offers a dynamic way to showcase your latest content.
- **Car Carousel:** Displays cars with their images, brand names, model names, and prices. You can filter the cars by brand using checkboxes. The car data is sourced from the `car-data.json` file in the root WordPress directory.

## Technologies Used

This project utilizes the following technologies:

- **Localwp:** For setting up the local WordPress development environment.
- **Node:** For managing dependencies and running build scripts.
- **SCSS:** For styling the blocks with advanced CSS features.
- **Git:** For version control and managing the project repository.
- **Slick Slider Library:** For creating responsive carousels in the Car Carousel block.
