import { prefab, Icon } from '@betty-blocks/component-sdk';

import { RadioInput } from './structures/RadioInput';

const attributes = {
  category: 'CONTENT',
  icon: Icon.TitleIcon,
  keywords: [''],
};

export default prefab('RadioInput', attributes, undefined, [RadioInput({})]);
