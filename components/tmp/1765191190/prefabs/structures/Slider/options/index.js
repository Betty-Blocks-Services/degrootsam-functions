"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sliderOptions = exports.categories = void 0;
/* eslint-disable import/extensions */
/* eslint-disable import/no-extraneous-dependencies */
const component_sdk_1 = require("@betty-blocks/component-sdk");
const advanced_1 = require("../../advanced");
const thumb = [
    'thumbWidth',
    'thumbHeight',
    'thumbBorderRadius',
    'thumbColor',
    'thumbShowBorder',
    'thumbBorderColor',
    'thumbBorderPlacement',
    'thumbBorderHeight',
];
const track = [
    'trackHeight',
    'trackBorder',
    'trackBorderColor',
    'trackBackground',
    'trackBorderRadius',
];
exports.categories = [
    {
        label: 'Thumb',
        expanded: false,
        members: thumb,
    },
    {
        label: 'Track',
        expanded: false,
        members: track,
    },
    {
        label: 'Advanced Options',
        expanded: false,
        members: ['dataComponentAttribute'],
    },
];
exports.sliderOptions = {
    actionVariableId: component_sdk_1.option('ACTION_JS_VARIABLE', {
        label: 'Action input variable',
        value: '',
        configuration: {
            condition: component_sdk_1.showIf('property', 'EQ', ''),
        },
    }),
    showLabel: component_sdk_1.toggle('Show Label', { value: true }),
    label: component_sdk_1.variable('Label', {
        value: [''],
        configuration: {
            condition: component_sdk_1.showIf('showLabel', 'EQ', true),
        },
    }),
    labelSize: component_sdk_1.font('Labelsize', {
        value: 'Body1',
    }),
    showMinMaxValue: component_sdk_1.toggle('Show min/max value', { value: true }),
    defaultValue: component_sdk_1.variable('Default value', { value: ['0'] }),
    minValue: component_sdk_1.variable('Min value', { value: ['0'] }),
    maxValue: component_sdk_1.variable('Max value', { value: ['100'] }),
    // Thumb options
    thumbColor: component_sdk_1.color('Thumb Color', { value: component_sdk_1.ThemeColor.PRIMARY }),
    thumbWidth: component_sdk_1.size('Thumb Width', {
        value: '20px',
        configuration: {
            as: 'UNIT',
        },
    }),
    thumbHeight: component_sdk_1.size('Thumb Height', {
        value: '20px',
        configuration: {
            as: 'UNIT',
        },
    }),
    thumbBorderRadius: component_sdk_1.size('Thumb Border Radius', {
        value: '50%',
        configuration: {
            as: 'UNIT',
        },
    }),
    thumbShowBorder: component_sdk_1.toggle('Thumb Border', { value: true }),
    thumbBorderColor: component_sdk_1.color('Thumb Border Color', {
        value: component_sdk_1.ThemeColor.PRIMARY,
        configuration: {
            condition: component_sdk_1.showIf('thumbShowBorder', 'EQ', true),
        },
    }),
    thumbBorderHeight: component_sdk_1.size('Thumb Border Height', {
        value: '1px',
        configuration: {
            as: 'UNIT',
            condition: component_sdk_1.showIf('thumbShowBorder', 'EQ', true),
        },
    }),
    thumbBorderPlacement: component_sdk_1.option('CUSTOM', {
        label: 'Thumb Border placement',
        value: 'inside',
        configuration: {
            as: 'DROPDOWN',
            condition: component_sdk_1.showIf('thumbShowBorder', 'EQ', true),
            allowedInput: [
                { name: 'Inside', value: 'inside' },
                { name: 'outside', value: 'outside' },
            ],
        },
    }),
    // End Thumb Options
    // Start Track Options
    progressColor: component_sdk_1.color('Progress Color', { value: component_sdk_1.ThemeColor.PRIMARY }),
    trackHeight: component_sdk_1.option('CUSTOM', {
        label: 'Track Height',
        value: '3px',
        configuration: {
            as: 'UNIT',
        },
    }),
    trackWidth: component_sdk_1.option('CUSTOM', {
        label: 'Track Width',
        value: '100%',
        configuration: {
            as: 'UNIT',
        },
    }),
    trackBackground: component_sdk_1.color('Track Background', {
        value: component_sdk_1.ThemeColor.ACCENT_1,
    }),
    trackBorder: component_sdk_1.option('CUSTOM', {
        label: 'Track border',
        value: '0px',
        configuration: {
            as: 'UNIT',
        },
    }),
    trackBorderColor: component_sdk_1.color('Track Border Color', {
        value: component_sdk_1.ThemeColor.TRANSPARENT,
    }),
    trackBorderRadius: component_sdk_1.option('CUSTOM', {
        label: 'Track Border Radius',
        value: '0px',
        configuration: {
            as: 'UNIT',
        },
    }),
    // End Track Options
    ...advanced_1.advanced('Slider'),
};
