"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.styles = void 0;
const component_sdk_1 = require("@betty-blocks/component-sdk");
exports.styles = {
    checkboxColor: component_sdk_1.color('Checkbox color', {
        value: component_sdk_1.ThemeColor.ACCENT_3,
    }),
    checkboxColorChecked: component_sdk_1.color('Checkbox color checked', {
        value: component_sdk_1.ThemeColor.PRIMARY,
    }),
    hideLabel: component_sdk_1.toggle('Hide label', {
        value: false,
    }),
    labelColor: component_sdk_1.color('Label color', {
        value: component_sdk_1.ThemeColor.BLACK,
    }),
    textColor: component_sdk_1.color('Text color', {
        value: component_sdk_1.ThemeColor.BLACK,
    }),
    helperColor: component_sdk_1.color('Helper color', {
        value: component_sdk_1.ThemeColor.ACCENT_2,
    }),
    errorColor: component_sdk_1.color('Error color', {
        value: component_sdk_1.ThemeColor.DANGER,
    }),
    margin: component_sdk_1.buttongroup('Margin', [
        ['None', 'none'],
        ['Dense', 'dense'],
        ['Normal', 'normal'],
    ], { value: 'normal' }),
    size: component_sdk_1.buttongroup('Size', [
        ['Medium', 'medium'],
        ['Small', 'small'],
    ], { value: 'medium' }),
};
