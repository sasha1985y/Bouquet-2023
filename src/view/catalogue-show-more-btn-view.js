import AbstractView from '../framework/view/abstract-view.js';

const createCatalogueShowMoreBtnTemplate =
() => (
  '<button class="btn btn--outlined catalogue__show-more-btn" type="button">больше букетов</button>'
);

export default class CatalogueShowMoreBtnView extends AbstractView {

  get template() {
    return createCatalogueShowMoreBtnTemplate();
  }
}
