import AbstractView from '../framework/view/abstract-view.js';

const createProductPopupTemplate =
() => (
  `<div class="image-slider swiper modal-product__slider swiper-initialized swiper-horizontal swiper-pointer-events">
    <div class="image-slides-list swiper-wrapper" id="swiper-wrapper-561f800b2cfa16210" aria-live="polite" style="transform: translate3d(0px, 0px, 0px);">
      <div class="image-slides-list__item swiper-slide swiper-slide-active" role="group" aria-label="1 / 3" style="width: 1274px; margin-right: 100px;">
        <div class="image-slide">
          <picture>
            <source type="image/webp" srcset="img/slides/slide-01.webp, img/slides/slide-01@2x.webp 2x"><img src="img/slides/slide-01.jpg" srcset="img/slides/slide-01@2x.jpg 2x" width="1274" height="1789" alt="">
          </picture><span class="image-author image-slide__author">Автор  фотографии:  «Christie Kim»</span>
        </div>
      </div>
      <div class="image-slides-list__item swiper-slide swiper-slide-next" role="group" aria-label="2 / 3" style="width: 1274px; margin-right: 100px;">
        <div class="image-slide">
          <picture>
            <source type="image/webp" srcset="img/slides/slide-02.webp, img/slides/slide-02@2x.webp 2x"><img src="img/slides/slide-02.jpg" srcset="img/slides/slide-02@2x.jpg 2x" width="1274" height="1789" alt="">
          </picture>
        </div>
      </div>
      <div class="image-slides-list__item swiper-slide" role="group" aria-label="3 / 3" style="width: 1274px; margin-right: 100px;">
        <div class="image-slide">
          <picture>
            <source type="image/webp" srcset="img/slides/slide-03.webp, img/slides/slide-03@2x.webp 2x"><img src="img/slides/slide-03.jpg" srcset="img/slides/slide-03@2x.jpg 2x" width="1274" height="1789" alt="">
          </picture>
        </div>
      </div>
    </div>
    <button class="btn-round btn-round--to-left image-slider__button image-slider__button--prev swiper-button-disabled" type="button" disabled="" tabindex="-1" aria-label="Предыдущий слайд" aria-controls="swiper-wrapper-561f800b2cfa16210" aria-disabled="true">
      <svg width="80" height="85" aria-hidden="true" focusable="false">
        <use xlink:href="#icon-round-button"></use>
      </svg>
    </button>
    <button class="btn-round btn-round--to-right image-slider__button image-slider__button--next" type="button" tabindex="0" aria-label="Следующий слайд" aria-controls="swiper-wrapper-561f800b2cfa16210" aria-disabled="false">
      <svg width="80" height="85" aria-hidden="true" focusable="false">
        <use xlink:href="#icon-round-button"></use>
      </svg>
    </button>
  <span class="swiper-notification" aria-live="assertive" aria-atomic="true"></span></div>

  <div class="product-description">
    <div class="product-description__header">
      <h3 class="title title--h2">Летнее настроение</h3><b class="price price--size-big">5&nbsp;800<span>Р</span></b>
    </div>
    <p class="text text--size-40">сочетание полевых и&nbsp;садовых цветов: розы, львиный зев, чертополох, тюльпаны и&nbsp;эустома</p>
    <button class="btn btn--outlined btn--full-width product-description__button" type="button" data-focus="">отложить</button>
  </div>`
);

export default class ProductPopupView extends AbstractView {

  get template() {
    return createProductPopupTemplate();
  }
}
