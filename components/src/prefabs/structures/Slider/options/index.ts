/* eslint-disable import/extensions */
/* eslint-disable import/no-extraneous-dependencies */
import {
  variable,
  color,
  option,
  ThemeColor,
  toggle,
  showIf,
  size,
  font,
} from '@betty-blocks/component-sdk';
import { advanced } from '../../advanced';

const thumb: Array<keyof typeof sliderOptions> = [
  'thumbWidth',
  'thumbHeight',
  'thumbBorderRadius',
  'thumbColor',
  'thumbBorder',
  'thumbBorderColor',
  'thumbBorderPlacement',
  'thumbBorderHeight',
];

const track: Array<keyof typeof sliderOptions> = [
  'trackWidth',
  'trackHeight',
  'trackBorder',
  'trackBorderColor',
  'trackBackground',
  'trackBorderRadius',
];

export const categories = [
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

export const sliderOptions = {
  actionVariableId: option('ACTION_JS_VARIABLE', {
    label: 'Action input variable',
    value: '',
    configuration: {
      condition: showIf('property', 'EQ', ''),
    },
  }),
  showLabel: toggle('Show label', { value: true }),
  label: variable('Label', {
    value: [''],
    configuration: {
      condition: showIf('showLabel', 'EQ', true),
    },
  }),
  labelSize: font('Labelsize', {
    value: 'Body1',
  }),
  showInputField: toggle('Show input field', { value: true }),
  showMinMaxValue: toggle('Show min/max value', { value: true }),
  defaultValue: variable('Default value', { value: ['0'] }),
  minValue: variable('Min value', { value: ['0'] }),
  maxValue: variable('Max value', { value: ['100'] }),
  stepSize: variable('Step size', { value: ['1'] }),

  // Thumb options
  thumbColor: color('Thumb Color', { value: ThemeColor.PRIMARY }),

  thumbWidth: size('Thumb Width', {
    value: '20px',
    configuration: {
      as: 'UNIT',
    },
  }),

  thumbHeight: size('Thumb Height', {
    value: '20px',
    configuration: {
      as: 'UNIT',
    },
  }),

  thumbBorderRadius: size('Thumb Border Radius', {
    value: '50%',
    configuration: {
      as: 'UNIT',
    },
  }),

  thumbBorder: toggle('Show thumb border', { value: true }),

  thumbBorderColor: color('Thumb Border Color', {
    value: ThemeColor.PRIMARY,
    configuration: {
      condition: showIf('thumbShowBorder', 'EQ', true),
    },
  }),

  thumbBorderHeight: size('Thumb Border Height', {
    value: '1px',
    configuration: {
      as: 'UNIT',
      condition: showIf('thumbShowBorder', 'EQ', true),
    },
  }),

  thumbBorderPlacement: option('CUSTOM', {
    label: 'Thumb Border placement',
    value: 'inside',
    configuration: {
      as: 'DROPDOWN',
      condition: showIf('thumbShowBorder', 'EQ', true),
      allowedInput: [
        { name: 'Inside', value: 'inside' },
        { name: 'outside', value: 'outside' },
      ],
    },
  }),

  // End Thumb Options

  // Start Track Options
  progressColor: color('Progress Color', { value: ThemeColor.PRIMARY }),

  trackWidth: size('Track width', {
    value: '100%',
    configuration: {
      as: 'UNIT',
    },
  }),
  trackHeight: size('Track height', {
    value: '3px',
    configuration: {
      as: 'UNIT',
    },
  }),
  trackBackground: color('Track Background', {
    value: ThemeColor.ACCENT_1,
  }),
  trackBorder: size('Track border', {
    value: '0px',
    configuration: {
      as: 'UNIT',
    },
  }),
  trackBorderColor: color('Track Border Color', {
    value: ThemeColor.TRANSPARENT,
  }),
  trackBorderRadius: size('Track border radius', {
    value: '0px',
    configuration: {
      as: 'UNIT',
    },
  }),

  // End Track Options
  ...advanced('Slider'),
};
