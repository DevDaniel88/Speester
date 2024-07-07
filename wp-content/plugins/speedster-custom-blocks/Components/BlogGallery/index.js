(function (blocks, element, blockEditor) {
  var el = element.createElement;
  var useBlockProps = blockEditor.useBlockProps;

  blocks.updateCategory("speedster", {
    title: "Speedster",
    icon: "dashicons-car",
  });

  blocks.registerBlockType("speedster-custom-blocks/bloggallery", {
    title: "Blog Gallery",
    icon: "grid-view",
    category: "speedster",
    render_callback: "speedster_custom_blocks_render_bloggallery",
    edit: function () {
      return el(
        "div",
        useBlockProps({ className: "bloggallery-block-editor" }),
        "Blog Gallery Block - Preview in frontend"
      );
    },
    save: function () {
      return null; // Server-side rendering
    },
  });
})(window.wp.blocks, window.wp.element, window.wp.blockEditor);

document.addEventListener("DOMContentLoaded", function () {
  var loadMoreButton = document.querySelector(".bloggallery-loadmore");
  if (loadMoreButton) {
    loadMoreButton.addEventListener("click", function () {
      var currentPage = this.dataset.page ? parseInt(this.dataset.page) : 1;
      var newPage = currentPage + 1;
      this.dataset.page = newPage;

      // Check if newPage has posts
      wp.apiFetch({ path: "/wp/v2/posts?per_page=4&page=" + newPage }).then(
        (posts) => {
          if (posts.length) {
            var container = document.querySelector(".bloggallery");
            posts.forEach((post) => {
              var item = document.createElement("div");
              item.className = "bloggallery-item";

              // Fetch the featured image URL if the post has a featured image
              if (post.featured_media) {
                wp.apiFetch({
                  path: "/wp/v2/media/" + post.featured_media,
                }).then((media) => {
                  var thumbnail = document.createElement("div");
                  thumbnail.className = "bloggallery-thumbnail";
                  var img = document.createElement("img");
                  img.src = media.source_url;
                  thumbnail.appendChild(img);
                  item.appendChild(thumbnail);
                  appendPostContent();
                });
              } else {
                appendPostContent();
              }

              function appendPostContent() {
                var content = document.createElement("div");
                content.className = "bloggallery-content";
                var title = document.createElement("h2");
                title.className = "bloggallery-title";
                title.innerHTML = post.title.rendered;
                content.appendChild(title);
                var excerpt = document.createElement("p");
                excerpt.className = "bloggallery-excerpt";
                excerpt.innerHTML = post.excerpt.rendered.replace(
                  /<\/?[^>]+(>|$)/g,
                  ""
                );
                content.appendChild(excerpt);
                var readMore = document.createElement("a");
                readMore.className = "bloggallery-readmore";
                readMore.href = post.link;
                readMore.textContent = "Read More";
                content.appendChild(readMore);
                item.appendChild(content);
                container.appendChild(item);
              }
            });

            // Check if the next page exists
            wp.apiFetch({
              path: "/wp/v2/posts?per_page=4&page=" + (newPage + 1),
            })
              .then((nextPagePosts) => {
                if (!nextPagePosts.length) {
                  loadMoreButton.style.display = "none"; // Hide button if no more posts
                }
              })
              .catch((error) => {
                loadMoreButton.style.display = "none"; // Hide button if no more posts
              });
          } else {
            loadMoreButton.style.display = "none"; // Hide button if no more posts
          }
        }
      );
    });
  }
});
