# Javascript assignment

Create a table with sort,add,delete,edit functionality

### Live Preview : https://js-assignment-table.netlify.app/

## Documenatation

### Folder structure

```
/---
   index.html
   servic_worker.js
   manifest.json
   css/
     |-> style.css
   js/
    |-> script.js
   assets/
        |-> fonts/
        |-> icons/
        |-> pwa-icons/

```

### Webpage structure

Webpage consist of three sections `table header`,`main table data` and `a dialog which opens when we click on edit button`.

-> Vanilla CSS ( CSS3 ) is used for styling

### Javascript(script.js)

1. Global variables

```
// nodelist of table rows
let productsList = [];

// index of selected row in case of row up and row down button
let activeRowIndex = -1;

// array of selected rows if multiple rows are selected using selectbox
let selectedElements = [];

// hard-coded chemicals data arrays
let products =

// copy of products array , used to reset products array when we click on refresh button to revert all changes
// JSON.stringify() is used here to avoid pass products as references
let productsRef = JSON.stringify(products);

-> In addition to these variables there are references to buttons to add event listeners
```

2. function appendProducts()

```
-> This function will build up table ui by traversing through product array and add elements to table body

 -> Also update *productsList* according to updated table rows

-> in this function we also add eventListener to selectbox to select rows
```

3. eventListener to button btnSelectDown(moving downwards in table)

```
-> In this function we increase *activeRowIndex* by one and add activeRow class corresponding element in *productsList*

-> Also remove activeRow class from previous row

```

4. eventListener to button btnSelectUp(moving upWards in table)

```
-> In this function we decrease *activeRowIndex* by one and add activeRow class corresponding element in *productsList*

-> Also remove activeRow class from previous row

```

5. eventListener to btnDelete

```
-> this function is used to delete rows

-> we are checking following cases
    |-> if *selectedElements.length > 0 * then remove selected elements and update *products*
    |-> if selectedElements.length === 0 and activeRowIndex >= 0 then remove elements corresponding to *activeRowIndex* from products

```

this uses : `appendProducts()` to update ui

6. eventListener to btnRefresh

```
set *products* to initial state i.e productsRef

```

this uses : `appendProducts()` to update ui

7. eventListener to btnAddItem

```
Thsi eventListener will insert a row with form fields in table body to add new data
```

8. eventListener to btnSave

```
-> on clicking this button will traverse through all rows inserted via *btnAddItem* and get form filed values corresponding to each rows

-> a new object is created with new data and append to products
```

this uses : `appendProducts()` to update ui

9. eventListener to btnEdit

```
-> onclicking this button will open a dialog to edit selected elements (either from *activeRowIndex* or if **selectedElements.length===1** then *selectedElements[0]*)

-> user can update value in prefill form and on submit form a new object is constructed from form fields and *products* is updated using *editForm* function

```

this uses : `appendProducts()` to update ui

10. Sorting functionality

```
-> On clicking table column header we extract *columnName* and *sortType* via data- attributes
| -> if sortType is asc => then sort *products* on basis of      *columnName* and update sortType in ascending order and set sortType to *desc*

| ->if sortType is desc or random(initially) => do opposite of asc case

```

this uses : `appendProducts()` to update ui

11. service workers

```
For making *PWA* we are using service workers
-> first register *servic_worker.js* which contains our all logic related servic workers

-> servic_worker works in three steps
  -> in installation phase in am caching index.html,style.css,script.js,icons/,fonts/ so they available offline

  -> then activate servic_worker

  -> in last step using fecth event if cache found then cached items will returns otherwise request is sent to sever to load website
```
