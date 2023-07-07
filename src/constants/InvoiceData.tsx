export const InvoiceDummyData: any = {
  customer: {
    value: 'Satva solution',
    x: 26,
    y: 64,
  },
  customerEmail: {
    value: 'Customer@gmail.com',
    x: 230,
    y: 64,
  },
  billingAddress: {
    value: 'Some Dummy address',
    x: 26,
    y: 139,
  },
  terms: {
    value: 'Term one',
    x: 207,
    y: 139,
  },
  invoiceDate: {
    value: '13/12/2001',
    x: 344,
    y: 139,
  },
  dueDate: {
    value: '14/12/2001',
    x: 484,
    y: 139,
  },
  shipVia: {
    value: 'Surat',
    x: 207,
    y: 189,
  },
  shippingDate: {
    value: '15/12/2001',
    x: 343,
    y: 189,
  },
  trackingNo: {
    value: '123456',
    x: 483,
    y: 189,
  },
  shippingTo: {
    value: 'Customer',
    x: 26,
    y: 213,
  },
  tags: {
    value: 'tag1 , tag2',
    x: 26,
    y: 298,
  },
  table: [],
  messageOnInvoice: {
    value: 'Invoice Message',
    x: 40,
    y: 508,
  },
  messageOnStatement: {
    value: 'Invoice Statement',
    x: 40,
    y: 586,
  },
  priceWithFraction: {
    value: '100',
    x: 1203,
    y: 504,
  },
  priceWithoutFraction: {
    value: '01',
    x: 1325,
    y: 504,
  },
  shipping: {
    value: 'Surat',
    x: 1223,
    y: 551,
  },
  subBoxOne: {
    value: '100',
    x: 1404,
    y: 551,
  },
  subBoxTwo: {
    value: '10',
    x: 1404,
    y: 568,
  },
};

for (let i = 0; i < 4; i++) {
  InvoiceDummyData.table.push({
    service: {
      value: 'First service',
      x: 121,
      y: 361 + 27 * i,
    },
    description: {
      value: 'This is first service description',
      x: 406,
      y: 361 + 27 * i,
    },
    qty: {
      value: '10',
      x: 802,
      y: 361 + 27 * i,
    },
    rate: {
      value: '123.43',
      x: 916,
      y: 361 + 27 * i,
    },
    amount: {
      value: '10.20',
      x: 1084,
      y: 361 + 27 * i,
    },
    tax: {
      value: '10.20',
      x: 1152,
      y: 361 + 27 * i,
    },
    class: {
      value: 'Product from first class',
      x: 1190,
      y: 361 + 27 * i,
    },
  });
}
