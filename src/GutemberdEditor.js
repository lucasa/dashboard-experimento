/** @jsx createElement */

/**
 * WordPress dependencies
 */
import {
  render,
  useState,
  createElement,
  Fragment,
  useEffect
} from "@wordpress/element";
import {
  BlockEditorProvider,
  BlockInspector,
  BlockList,
  WritingFlow,
  ObserveTyping,
  BlockEditorKeyboardShortcuts
} from "@wordpress/block-editor";
import {
  Popover,
  SlotFillProvider,
  DropZoneProvider
} from "@wordpress/components";
import { registerCoreBlocks } from "@wordpress/block-library";
import "@wordpress/format-library";

// editor styles
import "@wordpress/components/build-style/style.css";
import "@wordpress/block-editor/build-style/style.css";
import "@wordpress/block-library/build-style/style.css";
import "@wordpress/block-library/build-style/editor.css";
import "@wordpress/block-library/build-style/theme.css";
import "@wordpress/format-library/build-style/style.css";

/**
 * Other deps
 */
//import { Dialog } from "@reach/dialog";
//import "@reach/dialog/styles.css";

/**
 * Internal dependencies
 */
import "./gutemberg.scss";

/**
 * Custom Blocks
 */
import customRecipeBlock from "./blocks/recipie";

const GutembergEditor = function App() {
  const [blocks, updateBlocks] = useState([]);
  const [showJson, setShowJson] = useState(false);
  const [showProperties, setProperties] = useState(false);
  const toggleJson = evt => {
    setShowJson(!showJson);
  };
  const toggleProperties = evt => {
    setProperties(!showProperties);
  };

  useEffect(() => {
    registerCoreBlocks();
    customRecipeBlock();
  }, []);

  return (
    <Fragment>
      <div className="editor_toolbar widget-move">
        <button className="playground__json" onClick={toggleJson}>
          json {showJson + ""}
        </button>
        <button className="playground__json" onClick={toggleProperties}>
          properties {showProperties + ""}
        </button>
      </div>
      <div className="playground__body">
        <SlotFillProvider>
          <DropZoneProvider>
            <div hidden={showJson}>
              <BlockEditorProvider
                value={blocks}
                onInput={state => {
                  updateBlocks(state);
                }}
                onChange={state => {
                  updateBlocks(state);
                }}
              >
                <div className="editor-styles-wrapper playground__editor">
                  <Popover.Slot name="block-toolbar" />
                  <BlockEditorKeyboardShortcuts />
                  <WritingFlow>
                    <ObserveTyping>
                      <BlockList />
                    </ObserveTyping>
                  </WritingFlow>
                </div>
                <Popover.Slot />
                {showProperties && (
                  <div className="playground__sidebar">
                    <BlockInspector />
                  </div>
                )}
              </BlockEditorProvider>
            </div>
          </DropZoneProvider>
        </SlotFillProvider>

        <div className="playground__source" hidden={!showJson}>
          <pre>
            <code className="playground__code">
              {JSON.stringify(
                blocks.map(block => ({
                  name: block.name,
                  props: block.attributes,
                  children: block.innerBlocks
                })),
                null,
                "  "
              )}
            </code>
          </pre>
        </div>
      </div>
    </Fragment>
  );
};

export default GutembergEditor;
