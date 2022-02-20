import { createRow, calculateTotalTablePrice } from "./render.js";

export const addItemInTable = (item) => {
  const tableElem = createRow(item);
  document.querySelector(".table__body").append(tableElem);
};

export const deleteItem = (e, data) => {
  const itemId = e.target.closest("tr").querySelectorAll(".table__cell")[0]
    .dataset.id;

  data = data.filter((item) => {
    if (+item.id !== +itemId) {
      return item;
    }
  });
  console.log(data);
  e.target.closest("tr").remove();
  calculateTotalTablePrice(data);
  return data;
};

export const addItemInArray = (array, id, modalForm) => {
  // eslint-disable-next-line camelcase
  const { name, category, units, discount_count, description, count, price } =
    modalForm;
  const item = {
    id: +id,
    title: name.value,
    price: +price.value,
    description: description.value,
    category: category.value,
    // eslint-disable-next-line camelcase
    discont: !!discount_count.value,
    // ? true/false. true сейчас при любом значении в инпуте
    count: +count.value,
    units: units.value,
    images: {
      // ? Пока не трогал
      small: "img/smrtxiaomi11t-m.jpg",
      big: "img/smrtxiaomi11t-b.jpg",
    },
  };

  array.push(item);
  addItemInTable(item);
};
