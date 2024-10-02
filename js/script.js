const chemicalsTable = document.querySelector(".chemicalsTable");
const chemicalsTableBody = document.querySelector(".chemicalsTable tbody");
const btnSelectDown = document.querySelector(".btnSelectDown");
const btnSelectUp = document.querySelector(".btnSelectUp");
const btnDelete = document.querySelector(".btnDelete");
const btnRefresh = document.querySelector(".btnRefresh");
const btnAddItem = document.querySelector(".btnAddItem");
const btnSave = document.querySelector(".btnSave");
const tableHeaderElements = Array.from(document.querySelectorAll("th"));
const btnEdit = document.querySelector(".btnEdit");
const editElementDialog = document.querySelector(".editElementDialog");
const closeDialogBtn = document.querySelector(".closeDialogBtn");
let productsList = [];
let activeRowIndex = -1;
let selectedElements = [];

let products = [
  {
    id: 1,
    chemicalName: "Hydrochloric Acid",
    vendor: "Sigma-Aldrich",
    density: 1.18,
    viscosity: 1.23,
    packaging: "Plastic bottle",
    packSize: 500,
    unit: "mL",
    quantity: 10,
  },
  {
    id: 2,
    chemicalName: "Sodium Hydroxide",
    vendor: "Fisher Scientific",
    density: 2.13,
    viscosity: 1.56,
    packaging: "Plastic bottle",
    packSize: 1000,
    unit: "g",
    quantity: 5,
  },
  {
    id: 3,
    chemicalName: "Acetic Acid",
    vendor: "VWR",
    density: 1.05,
    viscosity: 1.2,
    packaging: "Glass bottle",
    packSize: 250,
    unit: "mL",
    quantity: 8,
  },
  {
    id: 4,
    chemicalName: "Ethanol",
    vendor: "Mallinckrodt",
    density: 0.79,
    viscosity: 1.08,
    packaging: "Plastic bottle",
    packSize: 1000,
    unit: "mL",
    quantity: 12,
  },
  {
    id: 5,
    chemicalName: "Acetone",
    vendor: "Thermo Fisher Scientific",
    density: 0.79,
    viscosity: 0.32,
    packaging: "Plastic bottle",
    packSize: 500,
    unit: "mL",
    quantity: 15,
  },
  {
    id: 6,
    chemicalName: "Methanol",
    vendor: "Alfa Aesar",
    density: 0.79,
    viscosity: 0.55,
    packaging: "Plastic bottle",
    packSize: 1000,
    unit: "mL",
    quantity: 7,
  },
  {
    id: 7,
    chemicalName: "Isopropanol",
    vendor: "Honeywell",
    density: 0.79,
    viscosity: 2.1,
    packaging: "Plastic bottle",
    packSize: 500,
    unit: "mL",
    quantity: 11,
  },
  {
    id: 8,
    chemicalName: "Toluene",
    vendor: "Avantor",
    density: 0.87,
    viscosity: 0.59,
    packaging: "Plastic bottle",
    packSize: 1000,
    unit: "mL",
    quantity: 9,
  },
  {
    id: 9,
    chemicalName: "Chloroform",
    vendor: "Spectrum Chemical",
    density: 1.49,
    viscosity: 0.56,
    packaging: "Glass bottle",
    packSize: 500,
    unit: "mL",
    quantity: 6,
  },
  {
    id: 10,
    chemicalName: "Dichloromethane",
    vendor: "Anachemia",
    density: 1.33,
    viscosity: 0.41,
    packaging: "Plastic bottle",
    packSize: 500,
    unit: "mL",
    quantity: 13,
  },
  {
    id: 11,
    chemicalName: "Hexane",
    vendor: "Baker",
    density: 0.66,
    viscosity: 0.3,
    packaging: "Plastic bottle",
    packSize: 1000,
    unit: "mL",
    quantity: 14,
  },
  {
    id: 12,
    chemicalName: "Cyclohexane",
    vendor: "JT Baker",
    density: 0.78,
    viscosity: 0.9,
    packaging: "Plastic bottle",
    packSize: 500,
    unit: "mL",
    quantity: 16,
  },
  {
    id: 13,
    chemicalName: "Ethyl Acetate",
    vendor: "Merck",
    density: 0.9,
    viscosity: 0.45,
    packaging: "Plastic bottle",
    packSize: 1000,
    unit: "mL",
    quantity: 17,
  },
  {
    id: 14,
    chemicalName: "Butyl Acetate",
    vendor: "Alfa Aesar",
    density: 0.88,
    viscosity: 0.65,
    packaging: "Plastic bottle",
    packSize: 500,
    unit: "mL",
    quantity: 18,
  },
  {
    id: 15,
    chemicalName: "Acetone",
    vendor: "Thermo Fisher Scientific",
    density: 0.79,
    viscosity: 0.32,
    packaging: "Plastic bottle",
    packSize: 500,
    unit: "mL",
    quantity: 19,
  },
];
let productsRef = JSON.stringify(products);

function appendProducts() {
  chemicalsTableBody.innerHTML = "";
  products.forEach((product, i) => {
    chemicalsTableBody.innerHTML += `
          <tr id="${product.id}">
          <td class="check"><img src="./assets/icons/checkMark.svg" width="17" height="17" /></td>
          <td>${i + 1} ${product.chemicalName}</td>
          <td>${product.vendor}</td>
          <td>${product.density}</td>
          <td>${product.viscosity}</td>
          <td>${product.packaging}</td>
          <td>${product.packSize}</td>
          <td>${product.unit}</td>
          <td>${product.quantity}</td>
          </tr>
          `;
  });

  productsList = Array.from(
    document.querySelectorAll(".chemicalsTable tbody tr")
  );

  let selectBoxes = Array.from(chemicalsTableBody.querySelectorAll(".check"));

  // select row
  selectBoxes.forEach((product, i) => {
    product.addEventListener("click", () => {
      if (activeRowIndex > 0) {
        productsList[activeRowIndex].classList.remove("activeRow");
        activeRowIndex = -1;
      }
      if (selectedElements.includes(i)) {
        productsList[i].classList.remove("activeRow");
        let index = selectedElements.indexOf(i);
        selectedElements.splice(index, 1);

        return;
      }

      selectedElements.push(i);
      productsList[i].classList.add("activeRow");
    });
  });
}

appendProducts();

// row down functionality
btnSelectDown.addEventListener("click", () => {
  btnSelectUp.classList.remove("activeBtn");
  btnSelectDown.classList.add("activeBtn");

  if (productsList.length === 0) {
    return;
  }

  activeRowIndex = Math.min(activeRowIndex + 1, productsList.length - 1);

  if (activeRowIndex > productsList.length - 1) {
    activeRowIndex = productsList.length - 1;
    return;
  }

  if (activeRowIndex >= 1) {
    productsList[activeRowIndex - 1].classList.remove("activeRow");
  }

  productsList[activeRowIndex].classList.add("activeRow");
});

// row up
btnSelectUp.addEventListener("click", () => {
  btnSelectDown.classList.remove("activeBtn");
  btnSelectUp.classList.add("activeBtn");

  if (productsList.length === 0) {
    return;
  }

  activeRowIndex = Math.max(activeRowIndex - 1, 0);

  if (activeRowIndex >= 0) {
    productsList[activeRowIndex + 1].classList.remove("activeRow");
  }

  productsList[activeRowIndex].classList.add("activeRow");
});

// delete row
btnDelete.addEventListener("click", () => {
  let filteredProducts = [];

  if (selectedElements.length > 0) {
    filteredProducts = products.filter((elem, i) => {
      return !selectedElements.includes(i);
    });
    selectedElements = [];
  } else if (activeRowIndex > 0 && selectedElements.length === 0) {
    filteredProducts = products.filter((elem, i) => {
      return i != activeRowIndex;
    });
  } else {
    return;
  }

  products = filteredProducts;
  appendProducts();
  activeRowIndex = -1;
});

//refresh
btnRefresh.addEventListener("click", () => {
  products = JSON.parse(productsRef);
  appendProducts();
});

// add elemnt form
btnAddItem.addEventListener("click", () => {
  let rowInsertionHTML = `
    <tr class="activeRow rowInsertionHTML">
    <td class="check"><img src="./assets/icons/checkMark.svg" width="17" height="17" /></td>
    <td><input type="text" name="chemicalName" autocomplete="off"/></td>
    <td><input type="text" name="vendor" autocomplete="off"/></td>
    <td><input type="text" name="density" autocomplete="off"/></td>
    <td><input type="text" name="viscosity" autocomplete="off"/></td>
    <td><input type="text" name="packaging" autocomplete="off"/></td>
    <td><input type="text" name="packSize" autocomplete="off"/></td>
    <td><input type="text" name="unit" autocomplete="off"/></td>
    <td><input type="text" name="quantity" autocomplete="off"/></td>
    </tr>
    `;

  chemicalsTableBody.insertAdjacentHTML("afterbegin", rowInsertionHTML);
});

// save btn
btnSave.addEventListener("click", () => {
  let rowInsertionForm = Array.from(
    document.querySelectorAll(".rowInsertionHTML")
  );

  if (rowInsertionForm.length === 0) {
    return;
  }

  rowInsertionForm.forEach((target) => {
    const targetFormFields = Array.from(target.querySelectorAll("input"));

    let formData = {
      id: Math.floor(Math.random() * Date.now()),
    };

    targetFormFields.forEach((field) => {
      formData[field.name] = field.value;
    });

    let newProductsList = [formData, ...products];
    products = newProductsList;
    appendProducts();
  });
});

// sorting fuctionality
tableHeaderElements.forEach((elem, i) => {
  // skip selectbox column
  if (i >= 1) {
    elem.addEventListener("click", () => {
      const sortType = elem.getAttribute("data-order");
      const column = elem.getAttribute("data-column");
      let sortIcon = elem.querySelector(".sortIcon");

      // first time data is random  sort it in asc order || curr is desc => sort in asc
      if (sortType === "random" || sortType === "desc") {
        elem.setAttribute("data-order", "asc");
        products = products.sort((a, b) => {
          return a[column] > b[column] ? 1 : -1;
        });

        sortIcon.innerHTML = "&#9660";
      }

      // if order currently is asc => sort in desc
      else if (sortType === "asc") {
        elem.setAttribute("data-order", "desc");
        products = products.sort((a, b) => {
          return a[column] > b[column] ? -1 : 1;
        });
        sortIcon.innerHTML = "&#9650";
      }

      appendProducts();
    });
  }
});

// edit functionality
btnEdit.addEventListener("click", () => {
  let targetIndex;

  if (selectedElements.length > 1) {
    alert("select only one product to edit");
    return;
  } else if (selectedElements.length === 1) {
    targetIndex = selectedElements[0];
  } else if (activeRowIndex >= 0) {
    targetIndex = activeRowIndex;
  } else {
    return;
  }

  let product = productsList[targetIndex];
  let productId = product.getAttribute("id");

  let targetElem = products.filter((elem, i) => {
    return elem.id.toString() == productId;
  });

  // prefill form
  editElementDialog.showModal();

  const editFormFields = Array.from(
    document.querySelectorAll(".editElementDialog .form-group input")
  );

  editFormFields.forEach((field) => {
    field.value = targetElem[0][field.name];
  });

  //submit form
  const editFormSubmitBtn = document.querySelector(".editFormSubmitBtn");
  editFormSubmitBtn.addEventListener("click", () => {
    editForm(targetIndex);
  });
});

function editForm(targetIndex) {
  const editFormFields = Array.from(
    document.querySelectorAll(".editElementDialog .form-group input")
  );

  const formData = {};
  editFormFields.forEach((field) => {
    formData[field.name] = field.value;
  });

  products[targetIndex] = formData;
  editElementDialog.close();
  appendProducts();
  activeRowIndex = -1;
}

// close dialog
closeDialogBtn.addEventListener("click", () => {
  editElementDialog.close();
});

// for pwa
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service_worker.js")
      .then((reg) => console.log("service Worker: registered"))
      .catch((err) => console.log(`service worker; Error:${err}`));
  });
}
