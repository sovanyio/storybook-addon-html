import React, { useEffect, useState } from "react";
import { useAddonState, useChannel, useParameter } from "@storybook/manager-api";
import { AddonPanel } from "@storybook/components";
import { ADDON_ID, EVENTS, PARAM_KEY } from "./constants";
import { PanelContent } from "./components/PanelContent";
import { format as prettierFormat } from "prettier/standalone";
import HTMLPlugin from "prettier/plugins/html";

export const Panel = (props) => {
  // https://storybook.js.org/docs/react/addons/addons-api#useaddonstate
  const [{ code }, setState] = useAddonState(ADDON_ID, {
    code: null,
    options: {},
  }); // https://storybook.js.org/docs/react/addons/addons-api#usechannel
  const [formattedCode, setFormattedCode] = useState();

  useChannel({
    [EVENTS.CODE_UPDATE]: ({ code }) =>
      setState((state) => ({ ...state, code })),
  });

  const parameters = useParameter(PARAM_KEY, {});
  const {
    highlighter: { showLineNumbers = false, wrapLines = true } = {},
    prettier = {},
  } = parameters;

  const prettierConfig = {
    htmlWhitespaceSensitivity: "ignore",
    ...prettier,
    // Ensure we always pick the html parser
    parser: "html",
    plugins: [HTMLPlugin],
  };

  useEffect(() => {
    async function formatCode() {
      if (code) {
        setFormattedCode(await prettierFormat(code, prettierConfig));
      } else {
        setFormattedCode('');
      }
    }

    formatCode();
  }, [code]);

  return (
    <AddonPanel {...props}>
      <PanelContent
        code={formattedCode}
        showLineNumbers={showLineNumbers}
        wrapLines={wrapLines}
      />
    </AddonPanel>
  );
};
