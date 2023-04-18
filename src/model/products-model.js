import Observable from '../framework/observable.js';
import { UpdateType } from '../const.js';

export default class ProductsModel extends Observable {
  #productsApiService = null;

  #products = [];

  constructor({productsApiService}) {
    super();
    this.#productsApiService = productsApiService;
  }

  async init() {
    try {
      this.#products = await this.#productsApiService.products;
    } catch(err) {
      this.#products = [];
    }
    this._notify(UpdateType.INIT);
  }

  get products() {
    return this.#products;
  }
}
