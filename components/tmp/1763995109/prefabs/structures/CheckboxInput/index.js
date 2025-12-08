"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckboxInput = void 0;
const component_sdk_1 = require("@betty-blocks/component-sdk");
const index_1 = require("./options/index");
const addChild_1 = require("../../helpers/addChild");
exports.CheckboxInput = (config, descendants = []) => {
    const options = { ...(config.options || index_1.checkboxInputOptions) };
    const style = { ...config.style };
    const ref = config.ref ? { ...config.ref } : undefined;
    const label = config.label ? config.label : undefined;
    const categories = [
        {
            label: 'Validation Options',
            expanded: false,
            members: ['required', 'validationValueMissing'],
        },
        {
            label: 'Styling',
            expanded: false,
            members: [
                'checkboxColor',
                'checkboxColorChecked',
                'textColor',
                'helperColor',
                'errorColor',
            ],
        },
        {
            label: 'Advanced Options',
            expanded: false,
            members: ['dataComponentAttribute'],
        },
    ];
    return component_sdk_1.component('CheckboxInput', {
        options,
        ref,
        style,
        label,
        optionCategories: categories,
        optionTemplates: {
            addChild: {
                options: addChild_1.addChildOptions('checkbox'),
                optionEvents: addChild_1.optionEvents,
            },
        },
    }, descendants);
};
