import AbstractView from '../framework/view/abstract-view.js';

const createProductPopupTemplate = (product) => {
  const {authorPhoto, description, previewImage, price, title} = product;
  return(
    `<div class="popup-content">
      <div class="image-slider swiper modal-product__slider swiper-initialized swiper-horizontal swiper-pointer-events">
        <div class="image-slides-list swiper-wrapper" id="swiper-wrapper-d28fad57e87b2a24" aria-live="polite" style="transform: translate3d(-2748px, 0px, 0px); transition-duration: 0ms;">
          <div class="image-slides-list__item swiper-slide" role="group" aria-label="1 / 3" style="width: 1274px; margin-right: 100px;">
            <div class="image-slide">
              <picture>
                <source type="image/webp" srcset="${previewImage}, ${previewImage}"><img src="${previewImage}" srcset="${previewImage}" width="1274" height="1789" alt="">
              </picture><span class="image-author image-slide__author">Автор  фотографии:  «${authorPhoto}»</span>
            </div>
          </div>
          <div class="image-slides-list__item swiper-slide swiper-slide-prev" role="group" aria-label="2 / 3" style="width: 1274px; margin-right: 100px;">
            <div class="image-slide">
              <picture>
                <source type="image/webp" srcset="${previewImage}, ${previewImage}"><img src="${previewImage}" srcset="${previewImage}" width="1274" height="1789" alt="">
              </picture>
            </div>
          </div>
          <div class="image-slides-list__item swiper-slide swiper-slide-active" role="group" aria-label="3 / 3" style="width: 1274px; margin-right: 100px;">
            <div class="image-slide">
              <picture>
                <source type="image/webp" srcset="${previewImage}, ${previewImage}"><img src="${previewImage}" srcset="${previewImage}" width="1274" height="1789" alt="">
              </picture>
            </div>
          </div>
        </div>
        <button class="btn-round btn-round--to-left image-slider__button image-slider__button--prev" type="button" tabindex="0" aria-label="Предыдущий слайд" aria-controls="swiper-wrapper-d28fad57e87b2a24" aria-disabled="false">
          <svg width="80" height="85" aria-hidden="true" focusable="false">
            <use xlink:href="#icon-round-button"></use>
          </svg>
        </button>
        <button class="btn-round btn-round--to-right image-slider__button image-slider__button--next swiper-button-disabled" type="button" tabindex="-1" aria-label="Следующий слайд" aria-controls="swiper-wrapper-d28fad57e87b2a24" aria-disabled="true" disabled="">
          <svg width="80" height="85" aria-hidden="true" focusable="false">
            <use xlink:href="#icon-round-button"></use>
          </svg>
        </button>
        <span class="swiper-notification" aria-live="assertive" aria-atomic="true"></span>
      </div>
      <div class="product-description">
        <div class="product-description__header">
          <h3 class="title title--h2">${title}</h3><b class="price price--size-big">${price}<span>Р</span></b>
        </div>
        <p class="text text--size-40">${description}</p>
        <button class="btn btn--outlined btn--full-width product-description__button" type="button" data-focus="">отложить
        </button>
      </div>
    </div>`
  );
};

export default class ProductPopupView extends AbstractView {
  #product = null;

  constructor({product}) {
    super();
    this.#product = product;
  }


  get template() {
    return createProductPopupTemplate(this.#product);
  }
}
