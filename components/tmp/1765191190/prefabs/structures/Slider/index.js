"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Slider = void 0;
const component_sdk_1 = require("@betty-blocks/component-sdk");
const options_1 = require("./options");
exports.Slider = (config, descendants = []) => {
    const options = { ...(config.options || options_1.sliderOptions) };
    const style = { ...config.style };
    const ref = config.ref ? { ...config.ref } : undefined;
    const label = config.label ? config.label : undefined;
    const optionCategories = config.optionCategories
        ? { ...config.optionCategories }
        : options_1.categories;
    return component_sdk_1.component('Slider', { options, ref, style, label, optionCategories }, descendants);
};
