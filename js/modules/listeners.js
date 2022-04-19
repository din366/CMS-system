import { deleteItem,
  addItemInArray,
  showImageItem,
  changeItem,
  pushChangedItem,
  modalTitle,
} from "./actions.js";
import { debounce } from "./debounce.js";
import { searchRenderGoods } from "./render.js";

export const modalForm = document.querySelector(".modal__form");
export const modalChangeButtton = modalForm.querySelector('.modal__change');
export const modalWindow = document.querySelector("#overlay_goods");
export const modalError = modalWindow.querySelector('#overlay_errors');
export const errorMessage = document.querySelector('.error_message');

export const modalWindowDelGoods = document
  .querySelector('#overlay_delete_goods');
const modalWindowDelGoodsItemName = modalWindowDelGoods
  .querySelector('.modal__deletegoods__item');

export const modalItemimage = document.querySelector('.sendingImagePreview');

export const listeners = () => {
  let modalWindowDelGoodsItemId = null; // to pass id to modal delete item

  const itemTable = document.querySelector(".goods__table");
  const addProductButton = document.querySelector(".panel__add-goods");
  const modalIdItem = document.querySelector('.vendor-code__id');

  const file = document.querySelector('.modal__file');

  const searchInput = document.querySelector('[type="search"]');

  /* debounce func: https://doka.guide/js/debounce/ */
  const debouncedHandle = debounce((searchRenderGoods), 300);

  /* close listener for main modal (add item and change) */
  modalWindow.addEventListener("click", (e) => {
    const target = e.target;

    /* close "additem" modal */
    if (
      target === modalWindow ||
      target.closest(".modal__close")
    ) {
      modalWindow.classList.remove("active");
      modalForm.discount_count.disabled = true;
      modalForm.reset();
      errorMessage.style.display = 'none';
      modalItemimage.src = '';
    }

    /* close modal send fetch error */
    if (
      target === modalError ||
      target.closest(".modal__close__error")
    ) {
      modalError.classList.remove('active');
    }
  });

  /* listener for modal window deleting a product */
  modalWindowDelGoods.addEventListener("click", (e) => {
    const target = e.target;
    if (
      target === document.querySelector("#overlay_delete_goods") ||
      target.closest(".modal__close")
    ) {
      modalWindowDelGoods.classList.remove("active");
      modalWindowDelGoodsItemName.textContent = '';
    }

    if (target === document.querySelector('.modal__delete__goods')) {
      deleteItem(modalWindowDelGoodsItemId);
    }
  });

  /* discount checkbox */
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

  /* add item in array (modal submit) */
  modalForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const id = modalWindow.querySelector(".vendor-code__id").textContent;
    addItemInArray(id, modalForm); // function of sending data to the server
  });

  /* listener for "change" button in main modal */
  modalChangeButtton.addEventListener('click', (e) => {
    e.preventDefault();
    // function of sending data to the server
    pushChangedItem(modalForm, modalIdItem);
  });

  /* button 'add product' in table */
  addProductButton.addEventListener("click", () => {
    modalWindow.classList.add("active");

    /* id auto generate in server */
    modalWindow.querySelector(".vendor-code__id").textContent = 'gen.automatic';

    /* change "additem" and "changeitem" buttons */
    modalForm.querySelector('.modal__change').style.display = 'none';
    modalForm.querySelector('.modal__submit').style.display = 'block';

    modalTitle.textContent = 'Добавить товар';
  });

  /* listener for product line (edit and delete button, show image button ) */
  itemTable.addEventListener("click", (e) => {
    e.preventDefault();
    if (e.target.closest(".table__btn_del")) {
      modalWindowDelGoods.classList.add('active');

      const deleteItem = e.target.closest('tr')
        .querySelectorAll('td')[1].textContent;
      modalWindowDelGoodsItemName.textContent = `${deleteItem}`;
      modalWindowDelGoodsItemId = e.target.closest('tr')
        .querySelectorAll('td')[0].textContent;
    }

    if (e.target.classList.contains('table__btn_pic')) {
      showImageItem(e);
    }

    if (e.target.classList.contains('table__btn_edit')) {
      changeItem(e, modalIdItem);
    }
  });

  /* upload image preparation or show error message when size > 1mb */
  file.addEventListener('change', async () => {
    if (file.files.length > 0) { // Проверка на наличие файла
      // Получение локального адреса файла в системе
      if (file.files[0].size < 1000000) {
        errorMessage.style.display = 'none';
        const src = URL.createObjectURL(file.files[0]);
        modalItemimage.src = src;
      } else {
        modalItemimage.src = '';
        file.value = '';
        errorMessage.style.display = 'block';
      }
    }
  });

  /* search listeners */
  searchInput.addEventListener('input', debouncedHandle);
};


