export const canvasDrawerBody = {
  userFields: [
    {
      title: 'Title',
      id: 'title',
      type: 'text',
      name: 'title',
      defaultValue: '',
      errorMessage: 'Please enter the title',
      placeholder: 'Enter your title hear',
    },
    {
      title: 'Name',
      id: 'name',
      type: 'text',
      name: 'name',
      defaultValue: '',
      errorMessage: 'Please enter the name',
      placeholder: 'Enter your last name hear',
    },
    {
      title: 'X coordinate',
      id: 'x',
      type: 'number',
      name: 'x',
      defaultValue: '',
      errorMessage: 'Please X coordinate',
      placeholder: 'Enter your X coordinate',
    },
    {
      title: 'Y coordinate',
      id: 'y',
      type: 'number',
      name: 'y',
      defaultValue: '',
      errorMessage: 'Please Y coordinate',
      placeholder: 'Enter your Y coordinate',
    },
  ],
};

export const DummyCoordinates = [
  {
    x: 17,
    y: 173,
    name: 'shipping',
    title: 'Shipping',
  },
  {
    x: 17,
    y: 229,
    name: 'tag',
    title: 'Tags',
  },
];

export const Locations: any = {
  customer: {
    label: 'Customer',
    x: 16,
    y: 57,
  },
  customerEmail: {
    label: 'dummy@gmail.com',
    x: 156,
    y: 57,
  },
  billingAddress: {
    label: 'Billing address',
    x: 20,
    y: 118,
  },
};
