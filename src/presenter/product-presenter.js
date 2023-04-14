import {render, remove} from '../framework/render.js';
import ProductView from '../view/product-view.js';
import ProductPopupView from '../view/product-popup-view.js';

export default class ProductPresenter {
  #product = null;

  #catalogueListView = null;
  #appContentContainer = null;
  #appPopupContainer = null;

  #productComponent = null;
  #productPopupComponent = null;


  constructor({
    catalogueListView,
    appContentContainer,
    appPopupContainer
  }) {
    this.#catalogueListView = catalogueListView;
    this.#appContentContainer = appContentContainer;
    this.#appPopupContainer = appPopupContainer;
  }

  init(product) {
    this.#product = product;
    this.#productComponent = new ProductView({
      product: this.#product,
      onEditClick: this.#handleEditClick
    });

    this.#productPopupComponent = new ProductPopupView({
      product: this.#product,
      onPopupClose: this.#handlePopupClose,
      onWindowClickPopupClose: this.#handleWindowClickPopupClose
    });
    render(this.#productComponent, this.#catalogueListView.element);
  }

  #appendPopupByWindow() {
    this.#appPopupContainer.appendChild(this.#productPopupComponent.element);
    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  #removePopupFromWindow() {
    this.#appPopupContainer.removeChild(this.#productPopupComponent.element);
    remove(this.#productPopupComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#removePopupFromWindow();
    }
  };

  #handleEditClick = () => {
    this.#appendPopupByWindow();
  };

  #handlePopupClose = (evt) => {
    if (evt.key === 'onmousedown') {
      evt.preventDefault();
      this.#removePopupFromWindow();
    }
  };

  #handleWindowClickPopupClose = () => {
    this.#removePopupFromWindow();
  };
}
