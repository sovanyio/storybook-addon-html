"use strict";

var _managerApi = require("@storybook/manager-api");
var _constants = require("../constants");
var _Panel = require("../Panel");
_managerApi.addons.register(_constants.ADDON_ID, function () {
  _managerApi.addons.add(_constants.PANEL_ID, {
    type: _managerApi.types.PANEL,
    title: "HTML",
    match: function match(_ref) {
      var viewMode = _ref.viewMode;
      return viewMode === "story";
    },
    render: _Panel.Panel
  });
});