import { addItemInTable, getItems, getSearch } from "./actions.js";

const URLcategory = 'http://localhost:3000/api/category';

/* create "item no found" message in table for search func */
/* use in searchRenderGoods -> debounce */
const errSearchMess = () => {
  const tr = document.createElement('tr');
  const td = document.createElement('td');

  td.classList.add('error_search_message');
  td.textContent = 'Товаров не найдено';
  td.colSpan = 7;
  td.style.padding = '20px';
  tr.append(td);
  document.querySelector('.table__body').append(tr);
};

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
    <button class="table__btn table__btn_pic" data-pic="https://is.gd/XP4wYl"></button>
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

// standart render goods (first render html and etc.)
export const renderGoods = async () => {
  document.querySelector('.table__body').textContent = ''; // clear table body
  const arr = await getItems();
  for (const item of arr) {
    addItemInTable(item);
  }

  calculateTotalTablePrice(arr);
};

export const searchRenderGoods = async (e) => {
  document.querySelector('.table__body').textContent = ''; // clear table body
  const arr = await getSearch(e);
  if (arr.length === 0) { // if arr length in responce = 0
    errSearchMess(); // show error block when search result is null
  } else {
    for (const item of arr) {
      addItemInTable(item);
    }
    calculateTotalTablePrice(arr);
  }
};

/* render category items for modal */
/* refresh every time the modal opens */
export const createModalDataList = async () => {
  try {
    const responce = await fetch(`${URLcategory}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const categoryList = document.querySelector('#category-list');
    categoryList.textContent = '';
    const items = await responce.json();
    items.map((item) => {
      const option = document.createElement('option');
      option.value = item;
      categoryList.append(option);
    });
  } catch (err) {
    console.log(`При формировании категорий произошла ошибка: ${err.message}`);
  }
};
