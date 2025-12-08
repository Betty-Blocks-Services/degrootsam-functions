import {
  buttongroup,
  filter,
  hideIf,
  modelAndRelation,
  option,
  property,
  showIf,
  toggle,
  variable,
  text,
} from '@betty-blocks/component-sdk';
import { advanced } from './advanced';
import { validation } from './validation';
import { styles } from './styles';

export const options = {
  actionVariableId: option('ACTION_JS_VARIABLE', {
    label: 'Action input variable',
    value: '',
    configuration: {
      condition: showIf('property', 'EQ', ''),
    },
  }),

  property: property('Property', {
    value: '',
    showInReconfigure: true,
    configuration: {
      allowedKinds: ['LIST', 'BELONGS_TO'],
      disabled: true,
      condition: hideIf('property', 'EQ', ''),
      showOnDrop: true,
    },
  }),

  label: variable('Label', {
    value: ['Select'],
    configuration: { allowFormatting: false, allowPropertyName: true },
  }),
  value: variable('Value', {
    value: [''],
    configuration: {
      condition: hideIf('useCurrentYearValue', 'EQ', true),
    },
  }),
  valueType: buttongroup(
    'Value Type',
    [
      ['Model', 'model'],
      ['Manual', 'manual'],
    ],
    {
      value: 'model',
    },
  ),
  manualValue: text('Manual values', {
    value: 'EN\r\nNL',

    configuration: {
      condition: showIf('valueType', 'EQ', 'manual'),
      as: 'MULTILINE',
    },
  }),

  optionType: buttongroup(
    'Option type',
    [
      ['Model', 'model'],
      ['Property', 'property'],
      ['Variable', 'variable'],
    ],
    {
      value: 'variable',
      configuration: {
        condition: showIf('optionType', 'EQ', 'never'),
      },
    },
  ),
  model: modelAndRelation('Model', {
    value: '',
    configuration: {
      condition: showIf('valueType', 'EQ', 'model'),
    },
  }),
  filter: filter('Filter', {
    value: {},
    configuration: {
      dependsOn: 'model',
      condition: showIf('valueType', 'EQ', 'model'),
    },
  }),

  orderBy: property('Order by', {
    value: '',
    configuration: {
      dependsOn: 'model',
      condition: showIf('valueType', 'EQ', 'model'),
    },
  }),

  labelProperty: property('Label for options', {
    value: '',
    configuration: {
      condition: showIf('valueType', 'EQ', 'model'),
    },
  }),

  valueProperty: property('Value to use', {
    value: '',
    configuration: {
      condition: showIf('valueType', 'EQ', 'model'),
    },
  }),

  useDefaultValue: toggle('Use first value as default value', {
    value: false,
  }),

  useCurrentYearValue: toggle('Set default value to current year', {
    value: false,
  }),

  order: buttongroup(
    'Sort order',
    [
      ['Ascending', 'asc'],
      ['Descending', 'desc'],
    ],
    { value: 'asc', configuration: { condition: hideIf('orderBy', 'EQ', '') } },
  ),

  placeholderLabel: variable('Placeholder', { value: [''] }),

  allowClear: toggle('Allow user to empty selection'),
  clearLabel: variable('Empty selection label', {
    value: ['Clear selection'],
    configuration: { condition: showIf('allowClear', 'EQ', true) },
  }),

  ...validation,
  ...styles,
  ...advanced,
};
