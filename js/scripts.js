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

  const calculateTotalTablePrice = (data) => {
    const resultValue = data.reduce((result, item) => {
      return (result += item.price * item.count);
    }, 0);

    document.querySelector(
      ".crm__total-price"
    ).textContent = `$ ${resultValue}`;
  };

  const addItemInTable = (item) => {
    const tableElem = createRow(item);
    document.querySelector(".table__body").append(tableElem);
  };

  const renderGoods = (arr) => {
    for (const item of arr) {
      addItemInTable(item);
    }
    calculateTotalTablePrice(dataGoods);
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
    calculateTotalTablePrice(dataGoods);
  };

  renderGoods(dataGoods);

  const addProductButton = document.querySelector(".panel__add-goods");
  addProductButton.addEventListener("click", () => {
    modalWindow.classList.add("active");
    modalWindow.querySelector(".vendor-code__id").textContent = Math.floor(
      Math.random() * 1e9
    );
  });

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

  itemTable.addEventListener("click", (e) => {
    if (e.target.closest(".table__btn_del")) {
      deleteItem(e);
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

  const calculateModalPrice = (input) => {
    input.addEventListener("change", () => {
      modalForm.total.value = `$ ${
        modalForm.price.value * modalForm.count.value
      }`;
    });
  };

  // Функция вызывается для двух инпутов, чтобы при изменении значения в любом из них пересчитывалось значение
  calculateModalPrice(modalForm.price);
  calculateModalPrice(modalForm.count);

  modalForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const { name, category, units, discount_count, description, count, price } =
      modalForm;
    const id = modalWindow.querySelector(".vendor-code__id").textContent;

    const item = {
      id: id,
      title: name.value,
      price: +price.value,
      description: description.value,
      category: category.value,
      discont: !!discount_count.value, // ? true/false. true сейчас при любом значении в инпуте
      count: +count.value,
      units: units.value,
      images: {
        // ? Пока не трогал
        small: "img/smrtxiaomi11t-m.jpg",
        big: "img/smrtxiaomi11t-b.jpg",
      },
    };

    dataGoods.push(item);
    console.log(dataGoods);
    addItemInTable(item);
    modalWindow.classList.remove("active");
    modalForm.discount_count.disabled = true;
    modalForm.reset();

    calculateTotalTablePrice(dataGoods);
  });
})();
