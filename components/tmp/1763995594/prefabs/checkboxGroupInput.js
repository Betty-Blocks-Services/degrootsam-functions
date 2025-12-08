"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const component_sdk_1 = require("@betty-blocks/component-sdk");
const CheckboxGroup_1 = require("./structures/CheckboxGroup");
const attributes = {
    category: 'FORM',
    icon: component_sdk_1.Icon.CheckboxGroupIcon,
    keywords: ['Form', 'input'],
};
exports.default = component_sdk_1.prefab('Checkbox Group', attributes, undefined, [
    CheckboxGroup_1.CheckboxGroup({ label: 'Checkbox Group' }),
]);
