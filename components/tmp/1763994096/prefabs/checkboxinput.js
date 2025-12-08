"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const component_sdk_1 = require("@betty-blocks/component-sdk");
const CheckboxInput_1 = require("./structures/CheckboxInput");
const attributes = {
    category: 'FORM',
    icon: component_sdk_1.Icon.CheckboxIcon,
};
exports.default = component_sdk_1.prefab('Checkbox', attributes, undefined, [
    CheckboxInput_1.CheckboxInput({ label: 'Checkbox input' }),
]);
