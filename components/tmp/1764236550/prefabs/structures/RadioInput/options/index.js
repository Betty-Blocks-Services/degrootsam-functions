"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.options = void 0;
const component_sdk_1 = require("@betty-blocks/component-sdk");
const advanced_1 = require("./advanced");
const validation_1 = require("./validation");
const styles_1 = require("./styles");
const getAllowedKindsByType_1 = require("../../../helpers/getAllowedKindsByType");
const { allowedKinds, allowedInputKinds } = getAllowedKindsByType_1.getAllowedKindsByType('radio');
exports.options = {
    actionVariableId: component_sdk_1.option('ACTION_JS_VARIABLE', {
        label: 'Action input variable',
        value: '',
        configuration: {
            condition: component_sdk_1.showIf('property', 'EQ', ''),
            allowedTypes: ['TEXT'],
            allowedKinds: ['TEXT'],
        },
    }),
    property: component_sdk_1.property('Property', {
        value: '',
        showInReconfigure: true,
        configuration: {
            allowedKinds,
            disabled: true,
            condition: component_sdk_1.hideIf('property', 'EQ', ''),
        },
    }),
    label: component_sdk_1.variable('Label', {
        value: ['Radio'],
        configuration: { allowFormatting: false, allowPropertyName: true },
    }),
    value: component_sdk_1.variable('Value', {
        value: [''],
        configuration: { allowFormatting: false },
    }),
    optionType: component_sdk_1.buttongroup('Option type', [
        ['Model', 'model'],
        ['Manual', 'manual'],
    ], {
        value: 'model',
    }),
    manualValues: component_sdk_1.variable('Options', {
        configuration: {
            as: 'MULTILINE',
            condition: component_sdk_1.showIf('optionType', 'EQ', 'manual'),
        },
    }),
    model: component_sdk_1.modelAndRelation('Model', {
        value: '',
        configuration: {
            condition: component_sdk_1.hideIf('optionType', 'EQ', 'manual'),
        },
    }),
    filter: component_sdk_1.filter('Filter', {
        value: {},
        configuration: {
            dependsOn: 'model',
            condition: component_sdk_1.hideIf('optionType', 'EQ', 'manual'),
        },
    }),
    orderBy: component_sdk_1.property('Order by', {
        value: '',
        configuration: {
            dependsOn: 'model',
            condition: component_sdk_1.hideIf('optionType', 'EQ', 'manual'),
        },
    }),
    labelProperty: component_sdk_1.property('Label for options', {
        value: '',
        configuration: { condition: component_sdk_1.hideIf('optionType', 'EQ', 'manual') },
    }),
    order: component_sdk_1.buttongroup('Sort order', [
        ['Ascending', 'asc'],
        ['Descending', 'desc'],
    ], { value: 'asc', configuration: { condition: component_sdk_1.hideIf('orderBy', 'EQ', '') } }),
    showError: component_sdk_1.buttongroup('Error message', [
        ['Built in', 'built-in'],
        ['Interaction', 'interaction'],
    ], {
        value: 'built-in',
        configuration: { condition: component_sdk_1.showIf('optionType', 'EQ', 'model') },
    }),
    ...validation_1.validation,
    ...styles_1.styles,
    ...advanced_1.advanced,
};
