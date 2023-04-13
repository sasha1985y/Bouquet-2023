// Импорт вендоров и утилит, не удаляйте его
import './vendor';
import { ImageSlider } from './utils/image-slider';
import { iosVhFix } from './utils/ios-vh-fix';
import { modals, initModals } from './modals/init-modals';

// Ваши импорты...
import ProductsApiService from './products-api-service.js';
import ProductsModel from './model/products-model.js';
import ContentPresenter from './presenter/content-presenter.js';

// Код для работы попапов, не удаляйте его
window.addEventListener('DOMContentLoaded', () => {
  iosVhFix();

  window.addEventListener('load', () => {
    // Инициализация слайдера
    const imageSlider = new ImageSlider('.image-slider');
    imageSlider.init();

    // Инициализация попапов
    initModals();
  });

  // Пример кода для открытия попапа
  document
    .querySelector('.element-which-is-open-popup')
    .addEventListener('click', () => modals.open('popup-data-attr'));

  // Код отработает, если разметка попапа уже отрисована в index.html

  // Если вы хотите рисовать разметку попапа под каждое "открытие",
  // то не забудьте перенесети в код addEventListener инициализацию слайдера

  // ------------

  // Ваш код...


  const AUTHORIZATION = 'Basic sasha2023boquet';
  const END_POINT = 'https://grading.objects.pages.academy/flowers-shop';

  const productsModel = new ProductsModel({
    productsApiService: new ProductsApiService(END_POINT, AUTHORIZATION)
  });

  const mainContainer = document.querySelector('main');
  const popupContainer = document.querySelector('.modal-product');

  const contentPresenter = new ContentPresenter({
    productsModel: productsModel,
    appMainContainer: mainContainer,
    appPopupContainer: popupContainer
  });

  productsModel.init();
  contentPresenter.init();
});
