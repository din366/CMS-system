import { addItemInTable } from "./actions.js";

export const createRow = (item) => {
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

export const calculateTotalTablePrice = (data) => {
  const resultValue = data.reduce(
    (result, item) => (result += item.price * item.count),
    0);

  document.querySelector(".crm__total-price").textContent = `$ ${resultValue}`;
};

export const renderGoods = (arr) => {
  for (const item of arr) {
    addItemInTable(item);
  }
  calculateTotalTablePrice(dataGoods);
};

