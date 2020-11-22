export const ProductModel = {
  name: 'Products',
  props: {
    date: '?datetime',
    name: 'string',
    model: '?string',
    color: '?[]string',
    cost_price: 'int',
    expenses: 'int',
    profit_percent: 'int',
    sale_price: 'int',
    description: '?string',

    // is_completed: 'boolean',
  },
  // assignTo: "#Users"
};
