import { deleteItem, addItemInArray } from "./actions.js";
import { calculateTotalTablePrice } from "./render.js";

export const modalForm = document.querySelector(".modal__form");

export const listeners = () => {
  // const modalTitle = document.querySelector(".modal__title");
  // const modalCheckbox = document.querySelector(".modal__checkbox");
  // eslint-disable-next-line max-len
  // const modalCheckboxField = document.querySelector(".modal__input_discount");
  const modalWindow = document.querySelector(".overlay");
  const itemTable = document.querySelector(".goods__table");
  const addProductButton = document.querySelector(".panel__add-goods");

  modalWindow.addEventListener("click", (e) => {
    const target = e.target;
    if (
      target === document.querySelector(".overlay") ||
      target.closest(".modal__close")
    ) {
      modalWindow.classList.remove("active");
      modalForm.discount_count.disabled = true;
      modalForm.reset();
    }
  });

  modalForm.addEventListener("click", (e) => {
    if (e.target === modalForm.discount) {
      if (modalForm.discount.checked === true) {
        modalForm.discount_count.disabled = false;
      } else {
        modalForm.discount_count.value = "";
        modalForm.discount_count.disabled = true;
      }
    }
  });

  modalForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const id = modalWindow.querySelector(".vendor-code__id").textContent;

    addItemInArray(dataGoods, id, modalForm);
    console.log(dataGoods);

    modalWindow.classList.remove("active");
    modalForm.discount_count.disabled = true;
    modalForm.reset();

    calculateTotalTablePrice(dataGoods);
  });

  addProductButton.addEventListener("click", () => {
    modalWindow.classList.add("active");
    modalWindow.querySelector(".vendor-code__id").textContent = Math.floor(
      Math.random() * 1e9);
  });

  itemTable.addEventListener("click", (e) => {
    if (e.target.closest(".table__btn_del")) {
      dataGoods = deleteItem(e, dataGoods);
    }
  });
};

export const calculateModalPrice = (input) => {
  input.addEventListener("change", () => {
    modalForm.total.value = `$ ${
      modalForm.price.value * modalForm.count.value
    }`;
  });
};
