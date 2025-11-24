"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.optionEvents = exports.addChildOptions = void 0;
const component_sdk_1 = require("@betty-blocks/component-sdk");
const getAllowedKindsByTypes_1 = require("./getAllowedKindsByTypes");
exports.addChildOptions = (type) => {
    const { actionInputVariableKind, allowedKinds, allowedInputKinds } = getAllowedKindsByTypes_1.getAllowedKindsByType(type);
    return component_sdk_1.optionTemplateOptions({
        propertyBased: component_sdk_1.buttongroup('Type', [
            ['Property-based', 'true'],
            ['Non-property-based', 'false'],
        ], { value: 'true' }),
        property: component_sdk_1.property('Property', {
            value: '',
            configuration: {
                allowedKinds,
                allowFormatting: false,
                disabledNames: ['updated_at', 'created_at'],
                condition: component_sdk_1.showIf('propertyBased', 'EQ', 'true'),
                createActionInputVariable: {
                    type: actionInputVariableKind,
                },
            },
        }),
        actionVariableId: component_sdk_1.option('ACTION_JS_VARIABLE', {
            label: 'Action input variable',
            value: '',
            configuration: {
                ...(allowedInputKinds
                    ? { allowedKinds: allowedInputKinds }
                    : undefined),
                condition: component_sdk_1.showIf('propertyBased', 'EQ', 'false'),
                createActionInputVariable: {
                    type: actionInputVariableKind,
                },
            },
        }),
    });
};
exports.optionEvents = {
    onChange: {
        propertyBased: [
            component_sdk_1.setOptionToDefaultValue({ target: 'property' }),
            component_sdk_1.setOptionToDefaultValue({ target: 'actionVariableId' }),
            component_sdk_1.setOptionToDefaultValue({ target: 'value' }),
            component_sdk_1.setOptionToDefaultValue({ target: 'label' }),
        ],
        property: [
            component_sdk_1.setVariableOption({ target: 'value', format: 'propertyValue' }),
            component_sdk_1.setVariableOption({ target: 'label', format: 'propertyLabel' }),
            component_sdk_1.setActionJSInputVariableOption({ target: 'actionVariableId' }),
        ],
        actionVariableId: [
            component_sdk_1.setVariableOption({ target: 'label', format: 'static' }),
        ],
    },
};
