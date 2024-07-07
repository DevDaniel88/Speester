const { registerBlockType } = wp.blocks;
const { MediaUpload, InspectorControls, RichText, ColorPalette } =
  wp.blockEditor;
const { Button, PanelBody, TextControl } = wp.components;
const { Fragment } = wp.element;
const { withSelect } = wp.data;

wp.blocks.updateCategory("speedster", {
  title: "Speedster",
  icon: "dashicons-car",
});

registerBlockType("speedster/hero-stage", {
  title: "Hero Stage",
  icon: "format-image",
  category: "speedster",
  attributes: {
    UHDimageUrl: {
      type: "string",
      default: "",
    },
    HDimageUrl: {
      type: "string",
      default: "",
    },
    TabletimageUrl: {
      type: "string",
      default: "",
    },
    MobileimageUrl: {
      type: "string",
      default: "",
    },
    text: {
      type: "string",
      default: "",
    },
    buttonText: {
      type: "string",
      default: "Read More",
    },
    buttonColor: {
      type: "string",
      default: "#000000",
    },
  },
  edit: withSelect((select) => {
    const posts = select("core").getEntityRecords("postType", "post", {
      per_page: 1,
    });
    return {
      latestPost: posts && posts.length > 0 ? posts[0] : null,
    };
  })(({ attributes, setAttributes, latestPost }) => {
    const {
      UHDimageUrl,
      HDimageUrl,
      TabletimageUrl,
      MobileimageUrl,
      text,
      buttonText,
      buttonColor,
    } = attributes;

    return (
      <Fragment>
        <InspectorControls>
          <PanelBody title="Image Settings">
            <MediaUpload
              onSelect={(media) => setAttributes({ UHDimageUrl: media.url })}
              type="image"
              render={({ open }) => (
                <Button onClick={open} icon="upload" isPrimary>
                  Choose UHD Image
                </Button>
              )}
            />
            <MediaUpload
              onSelect={(media) => setAttributes({ HDimageUrl: media.url })}
              type="image"
              render={({ open }) => (
                <Button onClick={open} icon="upload" isPrimary>
                  Choose HD Image
                </Button>
              )}
            />
            <MediaUpload
              onSelect={(media) => setAttributes({ TabletimageUrl: media.url })}
              type="image"
              render={({ open }) => (
                <Button onClick={open} icon="upload" isPrimary>
                  Choose Tablet Image
                </Button>
              )}
            />
            <MediaUpload
              onSelect={(media) => setAttributes({ MobileimageUrl: media.url })}
              type="image"
              render={({ open }) => (
                <Button onClick={open} icon="upload" isPrimary>
                  Choose Mobile / Fallback Image
                </Button>
              )}
            />
            <TextControl
              label="Text"
              value={text}
              onChange={(value) => setAttributes({ text: value })}
            />
            <TextControl
              label="Button Text"
              value={buttonText}
              onChange={(value) => setAttributes({ buttonText: value })}
            />
            <label>Button Color</label>
            <ColorPalette
              value={buttonColor}
              onChange={(color) => setAttributes({ buttonColor: color })}
            />
          </PanelBody>
        </InspectorControls>
        <div className="image-text-block">
          <picture>
            <source srcset={UHDimageUrl} media="(min-width: 2560px)" />
            <source srcset={HDimageUrl} media="(min-width: 1280px)" />
            <source srcset={TabletimageUrl} media="(min-width: 768px)" />
            <source srcset={MobileimageUrl} media="(max-width: 767px)" />
            <img
              src={MobileimageUrl}
              alt="Hero Stage: Read our newest blog entry"
            />
          </picture>
          <div className="content-block">
            <RichText
              tagName="h1"
              value={text}
              onChange={(value) => setAttributes({ text: value })}
              placeholder="Enter your text..."
            />
            {latestPost && (
              <a
                href={latestPost.link}
                className="hero-button"
                style={{ backgroundColor: buttonColor }}
              >
                {buttonText}
              </a>
            )}
          </div>
        </div>
      </Fragment>
    );
  }),
  save: ({ attributes }) => {
    const {
      UHDimageUrl,
      HDimageUrl,
      TabletimageUrl,
      MobileimageUrl,
      text,
      buttonText,
      buttonColor,
    } = attributes;

    return (
      <div className="image-text-block">
        <picture>
          <source srcset={UHDimageUrl} media="(min-width: 2560px)" />
          <source srcset={HDimageUrl} media="(min-width: 1280px)" />
          <source srcset={TabletimageUrl} media="(min-width: 768px)" />
          <source srcset={MobileimageUrl} media="(max-width: 767px)" />
          <img
            src={MobileimageUrl}
            alt="Hero Stage: Read our newest blog entry"
          />
        </picture>
        <div className="content-block">
          <RichText.Content tagName="h1" value={text} />
          <a
            href="[latest_post]"
            className="hero-button"
            style={{ backgroundColor: buttonColor }}
          >
            {buttonText}
          </a>
        </div>
      </div>
    );
  },
});
