import {render, replace, remove} from '../framework/render.js';
import ProductView from '../view/product-view.js';
import ProductPopupView from '../view/product-popup-view.js';

export default class ProductPresenter {
  #product = null;
  #appPopupContainer = null;
  #productComponent = null;
  #ProductPopupComponent = null;
  #catalogueListView = null;


  constructor({
    catalogueListView,
    appPopupContainer
  }) {
    this.#catalogueListView = catalogueListView;
    this.#appPopupContainer = appPopupContainer;
  }

  init(product) {
    this.#product = product;
    this.#productComponent = new ProductView();
    this.#ProductPopupComponent = new ProductPopupView();
    render(this.#productComponent, this.#catalogueListView.element);
  }


}
