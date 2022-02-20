import { renderGoods } from "./modules/render.js";
import {
  listeners,
  calculateModalPrice,
  modalForm,
} from "./modules/listeners.js";

{
  /* Display elements from an array */
  renderGoods(dataGoods);

  listeners();

  // Функция вызывается для двух инпутов, чтобы при изменении
  // значения в любом из них пересчитывалось значение
  calculateModalPrice(modalForm.price);
  calculateModalPrice(modalForm.count);
}
