import AbstractView from '../framework/view/abstract-view.js';

const createFilterReasonTemplate =
() => (
  `<section class="filter-reason">
        <div class="container">
        <h2 class="title title--h3 filter-reason__title">Выберите повод для букета</h2>
        <form class="filter-reason__form" action="#" method="post">
            <div class="filter-reason__form-fields">
            <div class="filter-field-text filter-reason__form-field--for-all filter-reason__form-field">
                <input class="filter-field-text__input filter-reason__form-field--for-all filter-reason__form-field" type="radio" id="filter-reason-field-id-0" name="reason" value="all" checked="">
                <label class="filter-field-text__label" for="filter-reason-field-id-0"><span class="filter-field-text__text">Для всех</span></label>
            </div>
            <div class="filter-field-text filter-reason__form-field--for-birthday filter-reason__form-field">
                <input class="filter-field-text__input filter-reason__form-field--for-birthday filter-reason__form-field" type="radio" id="filter-reason-field-id-1" name="reason" value="birthdayboy">
                <label class="filter-field-text__label" for="filter-reason-field-id-1"><span class="filter-field-text__text">Имениннику</span></label>
            </div>
            <div class="filter-field-text filter-reason__form-field--for-bride filter-reason__form-field">
                <input class="filter-field-text__input filter-reason__form-field--for-bride filter-reason__form-field" type="radio" id="filter-reason-field-id-2" name="reason" value="bridge">
                <label class="filter-field-text__label" for="filter-reason-field-id-2"><span class="filter-field-text__text">Невесте</span></label>
            </div>
            <div class="filter-field-text filter-reason__form-field--for-mother filter-reason__form-field">
                <input class="filter-field-text__input filter-reason__form-field--for-mother filter-reason__form-field" type="radio" id="filter-reason-field-id-3" name="reason" value="motherday">
                <label class="filter-field-text__label" for="filter-reason-field-id-3"><span class="filter-field-text__text">Маме</span></label>
            </div>
            <div class="filter-field-text filter-reason__form-field--for-colleague filter-reason__form-field">
                <input class="filter-field-text__input filter-reason__form-field--for-colleague filter-reason__form-field" type="radio" id="filter-reason-field-id-4" name="reason" value="colleagues">
                <label class="filter-field-text__label" for="filter-reason-field-id-4"><span class="filter-field-text__text">Коллеге</span></label>
            </div>
            <div class="filter-field-text filter-reason__form-field--for-darling filter-reason__form-field">
                <input class="filter-field-text__input filter-reason__form-field--for-darling filter-reason__form-field" type="radio" id="filter-reason-field-id-5" name="reason" value="forlove">
                <label class="filter-field-text__label" for="filter-reason-field-id-5"><span class="filter-field-text__text">Любимой</span></label>
            </div>
            </div>
            <button class="filter-reason__btn visually-hidden" type="submit" tabindex="-1">применить фильтр</button>
        </form>
        </div>
  </section>`
);
/**
 * Класс представления который создаёт компонент представления фильтра по причине подарка
 */
export default class FilterReasonView extends AbstractView {

  #handleFilterChange = null;

  constructor({onFilterChange}) {
    super();
    this.#handleFilterChange = onFilterChange;

    this.element.querySelectorAll('input')[0]
      .addEventListener('change', this.#filterChangeHandler);
    this.element.querySelectorAll('input')[1]
      .addEventListener('change', this.#filterChangeHandler);
    this.element.querySelectorAll('input')[2]
      .addEventListener('change', this.#filterChangeHandler);
    this.element.querySelectorAll('input')[3]
      .addEventListener('change', this.#filterChangeHandler);
    this.element.querySelectorAll('input')[4]
      .addEventListener('change', this.#filterChangeHandler);
    this.element.querySelectorAll('input')[5]
      .addEventListener('change', this.#filterChangeHandler);

  }

  get template() {
    return createFilterReasonTemplate();
  }

  #filterChangeHandler = (evt) => {

    this.element.querySelectorAll('input')
      .forEach((element) => {
        if (element.checked) {
          element.checked = !element.checked;
        }
        evt.target.checked = !evt.target.checked;
      });
    if (evt.target.tagName === 'INPUT') {
      evt.preventDefault();
      this.#handleFilterChange(evt.target.value);
    }

  };
}
