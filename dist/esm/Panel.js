function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0) { ; } } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
import React, { useMemo } from "react";
import { useAddonState, useChannel, useParameter } from "@storybook/api";
import { AddonPanel } from "@storybook/components";
import { ADDON_ID, EVENTS, PARAM_KEY } from "./constants";
import { PanelContent } from "./components/PanelContent";
import { format as prettierFormat } from "prettier/standalone";
import prettierHtml from "prettier/parser-html";
export var Panel = function Panel(props) {
  // https://storybook.js.org/docs/react/addons/addons-api#useaddonstate
  var _useAddonState = useAddonState(ADDON_ID, {
      code: null,
      options: {}
    }),
    _useAddonState2 = _slicedToArray(_useAddonState, 2),
    code = _useAddonState2[0].code,
    setState = _useAddonState2[1]; // https://storybook.js.org/docs/react/addons/addons-api#usechannel

  useChannel(_defineProperty({}, EVENTS.CODE_UPDATE, function (_ref) {
    var code = _ref.code;
    return setState(function (state) {
      return _objectSpread(_objectSpread({}, state), {}, {
        code: code
      });
    });
  }));
  var parameters = useParameter(PARAM_KEY, {});
  var _parameters$highlight = parameters.highlighter;
  _parameters$highlight = _parameters$highlight === void 0 ? {} : _parameters$highlight;
  var _parameters$highlight2 = _parameters$highlight.showLineNumbers,
    showLineNumbers = _parameters$highlight2 === void 0 ? false : _parameters$highlight2,
    _parameters$highlight3 = _parameters$highlight.wrapLines,
    wrapLines = _parameters$highlight3 === void 0 ? true : _parameters$highlight3,
    _parameters$prettier = parameters.prettier,
    prettier = _parameters$prettier === void 0 ? {} : _parameters$prettier;
  var prettierConfig = _objectSpread(_objectSpread({
    htmlWhitespaceSensitivity: "ignore"
  }, prettier), {}, {
    // Ensure we always pick the html parser
    parser: "html",
    plugins: [prettierHtml]
  });
  var formattedCode = useMemo(function () {
    return code && prettierFormat(code, prettierConfig);
  }, [code, prettierConfig]);
  return /*#__PURE__*/React.createElement(AddonPanel, props, /*#__PURE__*/React.createElement(PanelContent, {
    code: formattedCode,
    showLineNumbers: showLineNumbers,
    wrapLines: wrapLines
  }));
};