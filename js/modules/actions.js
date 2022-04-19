import {
  createRow,
  calculateTotalTablePrice,
  renderGoods,
  createModalDataList,
} from "./render.js";
import {
  modalForm,
  modalError,
  modalWindow,
  errorMessage,
  modalWindowDelGoods,
  modalItemimage,
} from "./listeners.js";

export const modalTitle = document.querySelector('.modal__title');

const mainURL = 'http://localhost:3000/'; // use in render category
const URL = 'http://localhost:3000/api/goods';

/* convert image to base64  */
export const toBase64 = file => new Promise((resolve, reject) => {
  const reader = new FileReader();
  // у FileReader есть события load и error

  reader.addEventListener('loadend', () => {
    resolve(reader.result);
  });
  reader.addEventListener('error', (err) => {
    reject(err);
  });

  reader.readAsDataURL(file);
});

/* get all goods from server */
export const getItems = async () => {
  try {
    const items = await fetch(URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const itemArray = await items.json();
    return itemArray;
  } catch (err) {
    console.log(`При загрузке товаров произошла ошибка: ${err}`);
  }
};

/* create elem and push in body table */
export const addItemInTable = (item) => {
  const tableElem = createRow(item);
  document.querySelector(".table__body").append(tableElem);
};

/* sending a request to remove an item from the server */
/* and redrawing the list of goods and the total cost */
export const deleteItem = async (itemId) => {
  try {
    await fetch(`${URL}/${itemId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const arr = await getItems();

    // hide deletion confirmation window
    modalWindowDelGoods.classList.remove('active');

    renderGoods();
    calculateTotalTablePrice(arr);
  } catch (err) {
    console.log(err);
  }
};

/* show modal window for change item */
export const changeItem = async (e, idItem) => {
  const itemId = e.target.closest("tr").querySelectorAll(".table__cell")[0]
    .dataset.id; // get id goods

  try {
    const getItem = await fetch(`${URL}/${itemId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const item = await getItem.json();
    // eslint-disable-next-line camelcase
    const { name, category, units, discount_count,
      description, count, price } = modalForm;

    name.value = item.title;
    category.value = item.category;
    units.value = item.units;
    // eslint-disable-next-line camelcase
    discount_count.value = item.discount;
    description.value = item.description;
    count.value = item.count;
    price.value = item.price;
    /* add id in modal form */
    idItem.textContent = item.id;

    /* check discount values and access to edit field */
    if (modalForm.discount_count.value > 0) {
      modalForm.discount_count.disabled = false;
    }

    const dataItemResponce = await fetch(`${URL}/${itemId}`);
    const dataItem = await dataItemResponce.json();
    if (dataItem.image !== '') { // if there is a picture
      modalItemimage.src = `${mainURL}${dataItem.image}`;
    }

    /* change "additem" and "changeitem" buttons */
    modalForm.querySelector('.modal__submit').style.display = 'none';
    modalForm.querySelector('.modal__change').style.display = 'block';

    document.querySelector(".overlay").classList.add("active");
    modalTitle.textContent = 'Изменить товар';

    /* checked discount checkbox */
    if (item.discount > 0) {
      modalForm.discount.checked = true;
    }
    /* add allprice */
    modalForm.total.value = `$ ${
      modalForm.price.value * modalForm.count.value
    }`;
  } catch (err) {
    console.log(err);
  }
};

/* sending a request to change an item in the server */
export const pushChangedItem = async (modalInputs, id) => {
  try {
    // eslint-disable-next-line camelcase
    const { name, category, units, discount_count,
      description, count, price, image } = modalInputs;

    const item = {
      title: name.value,
      price: +price.value,
      description: description.value,
      category: category.value,
      // eslint-disable-next-line camelcase
      discount: +discount_count.value,
      count: +count.value,
      units: units.value,
      image: `${image.files[0] ? await toBase64(image.files[0]) : null}`,
    };

    const responce = await fetch(`${URL}/${id.textContent}`, {
      method: 'PATCH',
      body: JSON.stringify(item),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    /* Forwarding the text of the server error to the cache */
    if (responce.ok === false) {
      const responceMessage = (await responce.json()).message;
      throw new Error(responceMessage);
    }

    /* if there is no error, close and clear the modal, load the changed data */
    modalWindow.classList.remove("active");
    modalForm.discount_count.disabled = true;
    modalForm.reset();
    modalItemimage.src = '';
    errorMessage.style.display = 'none';
    renderGoods();
    createModalDataList(); // update category list (if create new category)
  } catch (err) { // show error message in modal
    modalError.classList.add('active');
    if (err.message) { // returned known error text
      modalError.querySelector('.modal__error__number')
        .textContent = `Ошибка: ${err.message}`;
    } else { // returned unknown error text
      modalError.querySelector('.modal__error__number')
        .textContent = '';
    }
  }
};

/* view product image in a new window */
export const showImageItem = async (e) => {
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
    img.src = e.target.dataset.pic; // default Rick Roll gif in data attribute
    img.style.width = '100%';

    const itemId = e.target.closest('tr').querySelectorAll('td')[0].textContent;
    const dataItemResponce = await fetch(`${URL}/${itemId}`);
    const dataItem = await dataItemResponce.json();
    if (dataItem.image !== '') {
      img.src = `${mainURL}${dataItem.image}`;
    } // else show Rick Roll gif :D
    newWinImage.document.body.append(img);
  }
};

export const addItemInArray = async (id, modalForm) => {
  try {
    // eslint-disable-next-line camelcase
    const { name, category, units, discount_count,
      description, count, price, image } = modalForm;
    const item = {
      id: +id,
      title: name.value,
      price: +price.value,
      description: description.value,
      category: category.value,
      // eslint-disable-next-line camelcase
      discount: +discount_count.value,
      count: +count.value,
      units: units.value,
      image: `${image.files[0] ? await toBase64(image.files[0]) : null}`,
    };

    const responce = await fetch(URL, {
      method: 'POST',
      body: JSON.stringify(item),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    /* Forwarding the text of the server error to the cache */
    if (responce.ok === false) {
      const responceMessage = (await responce.json()).message;
      throw new Error(responceMessage);
    }

    /* if there is no error, close and clear the modal, load the changed data */
    modalWindow.classList.remove("active");
    modalForm.discount_count.disabled = true;
    modalForm.reset();
    modalForm.querySelector('.sendingImagePreview').src = '';
    errorMessage.style.display = 'none';
    renderGoods();

    createModalDataList(); // update category list (if create new category)
  } catch (err) {
    modalError.classList.add('active');
    if (err.message) { // returned known error text
      modalError.querySelector('.modal__error__number')
        .textContent = `Ошибка: ${err.message}`;
    } else { // returned unknown error text
      modalError.querySelector('.modal__error__number')
        .textContent = '';
    }
  }
};

export const getSearch = async (e) => {
  const { value } = e.target;
  if (value.length !== 0) {
    try {
      const items = await fetch(`${URL}/?search=${value}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const itemArray = await items.json();
      return itemArray;
    } catch (err) {
      console.log(`Произошла ошибка: ${err}`);
    }
  } else {
    return getItems(); // render full goods list
  }
};

/* calcutation total price in modal (price count * price value) */
export const calculateModalPrice = (input) => {
  input.addEventListener("change", () => {
    modalForm.total.value = `$ ${
      modalForm.price.value * modalForm.count.value
    }`;
  });
};
