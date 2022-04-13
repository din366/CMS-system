import { deleteItem,
  addItemInArray,
  showImageItem,
} from "./actions.js";

import { calculateTotalTablePrice } from "./render.js";

export const modalForm = document.querySelector(".modal__form");

export const listeners = () => {
  const modalWindow = document.querySelector(".overlay");
  const itemTable = document.querySelector(".goods__table");
  const addProductButton = document.querySelector(".panel__add-goods");

  const file = document.querySelector('.modal__file');
  const image = document.querySelector('.sendingImagePreview');
  const errorMessage = document.querySelector('.error_message');

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

    // eslint-disable-next-line no-undef
    addItemInArray(dataGoods, id, modalForm);
    // eslint-disable-next-line no-undef
    console.log(dataGoods);

    modalWindow.classList.remove("active");
    modalForm.discount_count.disabled = true;
    modalForm.reset();
    errorMessage.style.display = 'none';
    // eslint-disable-next-line no-undef
    calculateTotalTablePrice(dataGoods);
  });

  addProductButton.addEventListener("click", () => {
    modalWindow.classList.add("active");
    modalWindow.querySelector(".vendor-code__id").textContent = Math.floor(
      Math.random() * 1e9);
  });

  itemTable.addEventListener("click", (e) => {
    if (e.target.closest(".table__btn_del")) {
      // eslint-disable-next-line no-undef
      dataGoods = deleteItem(e, dataGoods);
    }

    if (e.target.classList.contains('table__btn_pic')) {
      showImageItem(e);
    }
  });

  file.addEventListener('change', async () => {
    if (file.files.length > 0) { // Проверка на наличие файла
      // Получение локального адреса файла в системе
      if (file.files[0].size < 1000000) {
        errorMessage.style.display = 'none';
        const src = URL.createObjectURL(file.files[0]);
        image.src = src;
      } else {
        image.src = '';
        file.value = '';
        errorMessage.style.display = 'block';
      }
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
