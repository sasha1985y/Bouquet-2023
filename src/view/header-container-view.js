import AbstractView from '../framework/view/abstract-view.js';

const createHeaderContainerTemplate =
() => (
  `<div class="header__container">
    <div class="header-count">
      <button class="header-count__btn" type="button">
        <svg width="60" height="47" aria-hidden="true">
          <use xlink:href="#icon-heart-header"></use>
        </svg><span class="visually-hidden">закрыть</span>
      </button>
      <div class="header-count__count">
        <p class="text text--size-20 header-count__counter">4</p>
      </div>
      <div class="header-count__block">
        <p class="text text--size-20 header-count__text">сумма</p><b class="price price--size-min header-count__price">15 700<span>Р</span></b>
      </div>
    </div>
  </div>`
);
/**
 * Класс представления который создаёт элемент, который открывает попап с отложенными букетами
 */
export default class HeaderContainerView extends AbstractView {

  #handleHeaderCountBtnClick = null;

  constructor({onHeaderCountBtnClick}) {
    super();
    this.#handleHeaderCountBtnClick = onHeaderCountBtnClick;
    this.element.querySelector('.header-count__btn')
      .addEventListener('click', this.#headerCountBtnClickHandler);
  }

  get template() {
    return createHeaderContainerTemplate();
  }

  #headerCountBtnClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleHeaderCountBtnClick();
    document.querySelector('.deffered-content')
      .classList.add('is-active');
    document.body.classList.add('scroll-lock');
  };

}
