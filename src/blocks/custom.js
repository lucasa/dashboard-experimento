//import { blocks, editor } from "@frontkom/gutenberg-js";
import { registerBlockType } from "@wordpress/blocks";
import { AlignmentToolbar, BlockControls, RichText } from "@wordpress/editor";
import { Toolbar } from "@wordpress/components";

//const { AlignmentToolbar, BlockControls, RichText } = editor;

registerBlockType("custom/my-block", {
  title: "My first block",
  icon: "universal-access-alt",
  category: "common",
  attributes: {
    content: {
      type: "array",
      source: "children",
      selector: "p"
    },
    alignment: {
      type: "string"
    }
  },
  edit({ attributes, className, setAttributes }) {
    const { content, alignment } = attributes;

    function onChangeContent(newContent) {
      setAttributes({ content: newContent });
    }

    function onChangeAlignment(newAlignment) {
      setAttributes({ alignment: newAlignment });
    }

    return [
      <BlockControls>
        <AlignmentToolbar value={alignment} onChange={onChangeAlignment} />
      </BlockControls>,
      <RichText
        tagName="p"
        className={className}
        style={{ textAlign: alignment }}
        onChange={onChangeContent}
        value={content}
      />
    ];
  },
  save({ attributes, className }) {
    const { content, alignment } = attributes;

    return (
      <RichText.Content
        className={className}
        style={{ textAlign: alignment }}
        value={content}
      />
    );
  }
});
