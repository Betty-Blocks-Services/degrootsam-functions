"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.styles = void 0;
const component_sdk_1 = require("@betty-blocks/component-sdk");
exports.styles = {
    labelPosition: component_sdk_1.buttongroup('LabelPosition', [
        ['Start', 'start'],
        ['End', 'end'],
        ['Top', 'top'],
        ['Bottom', 'bottom'],
    ], { value: 'end' }),
    row: component_sdk_1.toggle('Row', { value: true }),
    fullWidth: component_sdk_1.toggle('Full width', { value: true }),
    size: component_sdk_1.buttongroup('Size', [
        ['Medium', 'medium'],
        ['Small', 'small'],
    ], { value: 'medium' }),
    margin: component_sdk_1.buttongroup('Margin', [
        ['None', 'none'],
        ['Dense', 'dense'],
        ['Normal', 'normal'],
    ], { value: 'normal' }),
    radioColor: component_sdk_1.color('Radio color', {
        value: component_sdk_1.ThemeColor.ACCENT_3,
    }),
    radioColorChecked: component_sdk_1.color('Radio color checked', {
        value: component_sdk_1.ThemeColor.PRIMARY,
    }),
    hideLabel: component_sdk_1.toggle('Hide label'),
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
};
