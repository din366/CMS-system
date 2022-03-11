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

export const showImageItem = (e) => {
  console.log(e);
  if (e.target.classList.contains('table__btn_pic')) {
    const widthWindow = 800;
    const heightWindow = 600;
    const newWinImage = open('about:blank', '',
      `width=${widthWindow},
      height=${heightWindow},
      left=${(screen.width / 2 - widthWindow / 2)},
      top=${(window.screen.height / 2 - heightWindow / 2)}`);
    newWinImage.document.body.
      style = `display: flex; justify-content: center; align-items: center;`;
    const img = newWinImage.document.createElement('img');
    img.src = e.target.dataset.pic;
    newWinImage.document.body.append(img);
  }
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

