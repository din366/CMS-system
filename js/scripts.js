"use strict";

(() => {
  const modalTitle = document.querySelector(".modal__title");
  const modalForm = document.querySelector(".modal__form");
  const modalCheckbox = document.querySelector(".modal__checkbox");
  const modalCheckboxField = document.querySelector(".modal__input_discount");
  const modalWindow = document.querySelector(".overlay");
  const itemTable = document.querySelector(".goods__table");

  modalWindow.classList.remove("active");

  const createRow = (item) => {
    const { id, title, category, units, count, price } = item;
    const tableElem = document.createElement("tr");
    tableElem.innerHTML = `
    <td class="table__cell" data-id="${id}">${id}</td>
    <td class="table__cell table__cell_left table__cell_name">${title}</td>
    <td class="table__cell table__cell_left">${category}</td>
    <td class="table__cell">${units}</td>
    <td class="table__cell">${count}</td>
    <td class="table__cell">$${price}</td>
    <td class="table__cell">$${price * count}</td>
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

  const deleteItem = (e) => {
    const itemId = e.target.closest("tr").querySelectorAll(".table__cell")[0]
      .dataset.id;

    dataGoods = dataGoods.filter((item) => {
      if (+item.id !== +itemId) {
        return item;
      }
    });
    console.log(dataGoods);
    e.target.closest("tr").remove();
  };

  renderGoods(dataGoods);

  const addProductButton = document.querySelector(".panel__add-goods");
  addProductButton.addEventListener("click", () => {
    modalWindow.classList.add("active");
  });

  modalWindow.addEventListener("click", (e) => {
    const target = e.target;
    if (
      target === document.querySelector(".overlay") ||
      target.closest(".modal__close")
    ) {
      modalWindow.classList.remove("active");
    }
  });

  itemTable.addEventListener("click", (e) => {
    if (e.target.closest(".table__btn_del")) {
      deleteItem(e);
    }
  });
})();
