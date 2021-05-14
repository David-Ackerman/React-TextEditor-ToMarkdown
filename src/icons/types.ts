export type IconsProps = {
  width: string | number;
  height?: string | number | undefined;
  color?: string;
};
export type D1IconsProps = {
  width: string | number;
  height?: string | number | undefined;
  color?: string;
};

export const defaultArgTypes = {
  color: {
    name: 'Color',
    type: { name: 'string', required: false },
    description: 'This prop values defines the color of Icon',
    control: 'color',
  },
  width: {
    name: 'Width',
    description: 'This prop values defines the width of the Icon',
    type: { name: ['string', 'number'], required: true },
    control: { type: 'range', min: 10, max: 800, step: 1 },
  },
  height: {
    name: 'Height',
    type: { name: ['string', 'number'], required: false },
    description:
      'Prop to control the height of the Icon, if not set manually, it will be an automatically generated value to match the width value',
    control: { type: 'range', min: 10, max: 800, step: 1 },
  },
};
