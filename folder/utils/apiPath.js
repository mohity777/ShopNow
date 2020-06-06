const baseUrl = 'http://6a494d7700c6.ngrok.io/api/';

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
