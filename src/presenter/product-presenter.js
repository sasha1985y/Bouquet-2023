import {render, remove, replace} from '../framework/render.js';
import ProductView from '../view/product-view.js';
import ProductPopupView from '../view/product-popup-view.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

/**
 * Класс для рендеринга карточек и расширенных карточек
 */
export default class ProductPresenter {

  #catalogueListComponent = null;
  #appPopupContainer = null;

  #productComponent = null;
  #productPopupComponent = null;
  #handleModeChange = null;
  #handleDataChange = null;

  #product = null;
  #mode = Mode.DEFAULT;

  constructor({
    catalogueListComponent,
    appPopupContainer,
    onModeChange,
    onDataChange
  }) {
    this.#catalogueListComponent = catalogueListComponent;
    this.#appPopupContainer = appPopupContainer;
    this.#handleModeChange = onModeChange;
    this.#handleDataChange = onDataChange;
  }

  init(product) {
    this.#product = product;

    const prevProductComponent = this.#productComponent;
    const prevProductPopupComponent = this.#productPopupComponent;

    this.#productComponent = new ProductView({
      product: this.#product,
      onEditClick: this.#handleEditClick
    });

    this.#productPopupComponent = new ProductPopupView({
      product: this.#product,
      onCheckButtonClick: this.#handleCheckButtonClick,

    });
    render(this.#productComponent, this.#catalogueListComponent.element);

    if (prevProductComponent === null || prevProductPopupComponent === null) {
      render(this.#productComponent, this.#catalogueListComponent.element);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#productComponent, prevProductComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#productPopupComponent, prevProductPopupComponent);
    }

    remove(prevProductComponent);
    remove(prevProductPopupComponent);
  }

  destroy() {
    remove(this.#productComponent);
    remove(this.#productPopupComponent);
  }

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#removePopupFromWindow();
    }
  }

  #appendPopupByWindow() {
    this.#appPopupContainer.appendChild(this.#productPopupComponent.element);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  }

  #removeEscPopupFromWindow() {
    this.#appPopupContainer.removeChild(this.#productPopupComponent.element);
    remove(this.#productPopupComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#removeEscPopupFromWindow();
    }
  };

  #removePopupFromWindow(){
    remove(this.#productPopupComponent, this.#appPopupContainer.element);
    remove(this.#productPopupComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  }

  #handleEditClick = () => {
    this.#appendPopupByWindow();
  };

  #handleCheckButtonClick = () => {
    this.#handleDataChange({...this.#product, price: !this.#product.price});
  };
}
