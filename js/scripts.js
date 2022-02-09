"use strict";

(() => {
  const modalTitle = document.querySelector(".modal__title");
  const modalForm = document.querySelector(".modal__form");
  const modalCheckbox = document.querySelector(".modal__checkbox");
  const modalCheckboxField = document.querySelector(".modal__input_discount");

  document.querySelector(".overlay").classList.remove("active");

  const createRow = (id, title, category, units, count, price) => {
    const tableElem = document.createElement("tr");
    tableElem.innerHTML = `
    <td class="table__cell">${id}</td>
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
      const tableElem = createRow(
        item.id,
        item.title,
        item.category,
        item.units,
        item.count,
        item.price
      );
      document.querySelector(".table__body").append(tableElem);
    }
  };

  renderGoods(dataGoods);
})();
