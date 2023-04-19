import AbstractView from '../framework/view/abstract-view.js';

const createCatalogueBtnWrapTemplate =
() => (
  `<div class="catalogue__btn-wrap">
        <button class="btn-round btn-round--to-top btn-round--size-small catalogue__to-top-btn" type="button" aria-label="наверх">
          <svg width="80" height="85" aria-hidden="true" focusable="false">
            <use xlink:href="#icon-round-button"></use>
          </svg>
        </button>
    </div>`
);
/**
 * Класс представления который создаёт компонент представления кнопки возврата в начало каталога
 */
export default class CatalogueBtnWrapView extends AbstractView {

  get template() {
    return createCatalogueBtnWrapTemplate();
  }
}
