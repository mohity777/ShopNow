const baseUrl = 'http://ccf79ad6bb23.ngrok.io/api/';

const PATH = {
  // product api
  createProduct: 'products',
  getAllProducts: 'products',
  deleteProduct: 'products/',
  editProduct: 'products/',
  getUserProducts: 'products/UserProducts',

  // cart api
  addToCart: 'cart',
  getCart: 'cart',
  editCart: 'cart/',
  deleteCartItem: 'cart/',

  // orders api
  getOrders: 'orders',
  postOrder: 'orders',
};

export {baseUrl, PATH};
