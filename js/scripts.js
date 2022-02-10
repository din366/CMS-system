"use strict";

(() => {
  const modalTitle = document.querySelector(".modal__title");
  const modalForm = document.querySelector(".modal__form");
  const modalCheckbox = document.querySelector(".modal__checkbox");
  const modalCheckboxField = document.querySelector(".modal__input_discount");
  const modalWindow = document.querySelector(".overlay");

  modalWindow.classList.remove("active");

  const createRow = (item) => {
    const tableElem = document.createElement("tr");
    tableElem.innerHTML = `
    <td class="table__cell">${item.id}</td>
    <td class="table__cell table__cell_left table__cell_name">${item.title}</td>
    <td class="table__cell table__cell_left">${item.category}</td>
    <td class="table__cell">${item.units}</td>
    <td class="table__cell">${item.count}</td>
    <td class="table__cell">$${item.price}</td>
    <td class="table__cell">$${item.price * item.count}</td>
    <td class="table__cell table__cell_btn-wrapper">
      <button class="table__btn table__btn_pic"></button>
      <button class="table__btn table__btn_edit"></button>
      <button class="table__btn table__btn_del"></button>
    </td>
    `;
    return tableElem;
  };

  const renderGoods = (arr) => {
    for (const item of arr) {
      const tableElem = createRow(item);
      document.querySelector(".table__body").append(tableElem);
    }
  };

  renderGoods(dataGoods);

  const addProductButton = document.querySelector(".panel__add-goods");
  addProductButton.addEventListener("click", () => {
    modalWindow.classList.add("active");
  });

  document.querySelector(".modal__close").addEventListener("click", () => {
    modalWindow.classList.remove("active");
  });

  document.querySelector(".overlay__modal").addEventListener("click", (e) => {
    e.stopPropagation();
  });

  modalWindow.addEventListener("click", (e) => {
    modalWindow.classList.remove("active");
  });
})();
