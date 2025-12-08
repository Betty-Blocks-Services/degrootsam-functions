import { prefab, Icon } from '@betty-blocks/component-sdk';

import { Slider } from './structures/Slider';

const attributes = {
  category: 'CONTENT',
  icon: Icon.TitleIcon,
  keywords: [''],
};

export default prefab('Slider', attributes, undefined, [Slider({})]);
