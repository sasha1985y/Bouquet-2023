import ApiService from './framework/api-service.js';

const Method = {
  GET: 'GET',
  PUT: 'PUT',
};

export default class ProductsApiService extends ApiService {
  get products() {
    return this._load({url: 'products'})
      .then(ApiService.parseResponse);
  }

  async updateTask(product) {
    const response = await this._load({
      url: `products/${product.id}`,
      method: Method.PUT,
      body: JSON.stringify(product),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  }
}
