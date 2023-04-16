import {render, remove} from '../framework/render.js';
import ProductView from '../view/product-view.js';
import ProductPopupView from '../view/product-popup-view.js';

export default class ProductPresenter {
  #product = null;

  #catalogueListComponent = null;
  #appContentContainer = null;
  #appPopupContainer = null;

  #productComponent = null;
  #productPopupComponent = null;

  #checkedPresenter = new Map();


  constructor({
    catalogueListComponent,
    appContentContainer,
    appPopupContainer
  }) {
    this.#catalogueListComponent = catalogueListComponent;
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
      onCheckButtonClick: this.#handleCheckButtonClick,
      onUnCheckButtonClick: this.#handleUnCheckButtonClick,

    });
    render(this.#productComponent, this.#catalogueListComponent.element);
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

  #handleCheckButtonClick = () => {
    this.#checkedPresenter.set(this.#product.id, this.#product);
    //console.log(this.#checkedPresenter);
  };

  #handleUnCheckButtonClick = () => {
    this.#checkedPresenter.delete(this.#product.id);
    //console.log(this.#checkedPresenter);
  };
}
