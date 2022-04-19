import { renderGoods, createModalDataList } from "./modules/render.js";
import {
  listeners,
  modalForm,
} from "./modules/listeners.js";
import { calculateModalPrice } from "./modules/actions.js";

{
  /* Display elements from an array */
  renderGoods();

  listeners();
  createModalDataList();

  // Функция вызывается для двух инпутов, чтобы при изменении
  // значения в любом из них пересчитывалось значение
  calculateModalPrice(modalForm.price);
  calculateModalPrice(modalForm.count);
}
