(()=>{var e,t,a,l,n;e=window.wp.blocks,t=window.wp.element,a=window.wp.blockEditor,l=t.createElement,n=a.useBlockProps,e.updateCategory("speedster",{title:"Speedster",icon:"dashicons-car"}),e.registerBlockType("speedster-custom-blocks/bloggallery",{title:"Blog Gallery",icon:"grid-view",category:"speedster",render_callback:"speedster_custom_blocks_render_bloggallery",edit:function(){return l("div",n({className:"bloggallery-block-editor"}),"Blog Gallery Block - Preview in frontend")},save:function(){return null}}),document.addEventListener("DOMContentLoaded",(function(){var e=document.querySelector(".bloggallery-loadmore");e&&e.addEventListener("click",(function(){var t=(this.dataset.page?parseInt(this.dataset.page):1)+1;this.dataset.page=t,wp.apiFetch({path:"/wp/v2/posts?per_page=2&page="+t}).then((function(a){if(a.length){var l=document.querySelector(".bloggallery");a.forEach((function(e){var t=document.createElement("div");function a(){var a=document.createElement("div");a.className="bloggallery-content";var n=document.createElement("h2");n.className="bloggallery-title",n.innerHTML=e.title.rendered,a.appendChild(n);var r=document.createElement("div");r.className="bloggallery-excerpt",r.innerHTML=e.excerpt.rendered,a.appendChild(r);var o=document.createElement("a");o.className="bloggallery-readmore",o.href=e.link,o.textContent="Read More",a.appendChild(o),t.appendChild(a),l.appendChild(t)}t.className="bloggallery-item",e.featured_media?wp.apiFetch({path:"/wp/v2/media/"+e.featured_media}).then((function(e){var l=document.createElement("div");l.className="bloggallery-thumbnail";var n=document.createElement("img");n.src=e.source_url,l.appendChild(n),t.appendChild(l),a()})):a()})),wp.apiFetch({path:"/wp/v2/posts?per_page=2&page="+(t+1)}).then((function(t){t.length||(e.style.display="none")})).catch((function(t){e.style.display="none"}))}else e.style.display="none"}))}))}))})();