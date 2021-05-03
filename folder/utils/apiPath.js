const baseUrl = 'http://8f820b1ed9c0.ngrok.io/api/';

const PATH = {
  // product api
  createProduct: 'products',
  getAllProducts: 'products',
  deleteProduct: 'products/',
  editProduct: 'products/',
  getUserProducts: 'products/myProducts/',

  // cart api
  addToCart: 'cart/',
  getCart: 'cart',
  editCart: 'cart/',
  deleteCartItem: 'cart/',

  // orders api
  getOrders: 'orders',
  postOrder: 'orders',

  // login api
  login: 'users/login',
};

export {baseUrl, PATH};
