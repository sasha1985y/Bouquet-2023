import AbstractView from '../framework/view/abstract-view.js';

const createCatalogueShowMoreBtnTemplate =
() => (
  '<button class="btn btn--outlined catalogue__show-more-btn" type="button">больше букетов</button>'
);

export default class CatalogueShowMoreBtnView extends AbstractView {

  #handleCatalogueShowMoreButtonClick = null;

  constructor({onClick}) {
    super();
    this.#handleCatalogueShowMoreButtonClick = onClick;
    this.element.addEventListener('click', this.#catalogueShowMoreButtonClickHandler);
  }

  get template() {
    return createCatalogueShowMoreBtnTemplate();
  }

  #catalogueShowMoreButtonClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleCatalogueShowMoreButtonClick();
  };
}
