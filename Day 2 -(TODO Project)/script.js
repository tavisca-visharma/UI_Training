//access input value
//store in a variable

//create a li
//add that value variable in li
//add
//

let todoSuggestions = [];
let Counter;

function makeCounter() {
    let count = 0;
    return function() {
        return ++count;
    }
}

(function onLoad() {
    window.addEventListener("load", makeTodoListSuggetions);
    let addButton = document.querySelector("#todo-add");
    addButton.addEventListener("click", addItem);
    Counter = makeCounter();
})();

function hideAllViews() {
    let elements = document.getElementsByClassName("nav-tabs");
    for (let elem of elements) {
        elem.style.display = "none";
    }
}

function setView(elementToBeViewed) {
    hideAllViews();
    let elementView = document.getElementById(elementToBeViewed.innerHTML.toLowerCase());
    elementView.style.display = "block";
}

function makeTodoListSuggetions() {
    let datalist = document.getElementById("todo-list-suggestions");
    for (let i = 0; i < todoSuggestions.length; i++) {
        addItem(todoSuggestions[i]);
    }
}

function isItemExists(itemName) {
    let todoList = document.getElementById("todo-list-suggestions");
    let todoSuggestions = todoList.getElementsByTagName("option");
    for (let i = 0; i < todoSuggestions.length; i++) {
        if (itemName.toLowerCase() === todoSuggestions[i].value.toLowerCase()) {
            return true;
        }
    }
    return false;
}

function addItem() {
    let itemName = document.getElementById("todo-input").value;
    addItemInSearchList(itemName);
    addItemInDisplayList(itemName);
}

function addItemInSearchList(itemName) {
    if (isItemExists(itemName) == false) {
        let datalist = document.getElementById("todo-list-suggestions");
        let option = document.createElement("option");
        option.value = itemName;
        datalist.appendChild(option);
    }
}

function addItemInDisplayList(itemName) {
    let displayList = document.getElementById("todo-list");
    if (displayList.getElementsByTagName("tr").length == 0) {
        displayList.appendChild(addHeadersInTableList());
    }
    let item = document.createElement("tr");
    createNumberData(item);
    createNameToAdd(item, itemName);
    createEditButtonToAdd(item);
    createDeleteButtonToAdd(item);
    displayList.appendChild(item);

}

function addHeadersInTableList() {
    let header = document.createElement("tr");
    createHeaderForNumber(header);
    createHeaderForName(header);
    createHeaderForEditButton(header);
    createHeaderForDeleteButton(header);
    return header;
}

function createHeaderForNumber(header) {
    let itemNumberHeader = document.createElement("th");
    itemNumberHeader.innerHTML = "Sl. No.";
    header.appendChild(itemNumberHeader);
}

function createHeaderForName(header) {
    let itemNameHeader = document.createElement("th");
    itemNameHeader.innerHTML = "Item";
    header.appendChild(itemNameHeader);
}

function createHeaderForEditButton(header) {
    let itemEditButton = document.createElement("th");
    itemEditButton.innerHTML = "Edit";
    header.appendChild(itemEditButton);
}

function createHeaderForDeleteButton(header) {
    let itemDeleteButton = document.createElement("th");
    itemDeleteButton.innerHTML = "Delete";
    header.appendChild(itemDeleteButton);
}


function createNumberData(item) {
    let itemNumber = document.createElement("td");
    itemNumber.innerHTML = Counter();
    item.appendChild(itemNumber);
}

function createNameToAdd(item, itemName) {
    let itemNameToAdd = document.createElement("td");
    itemNameToAdd.innerHTML = itemName;
    item.appendChild(itemNameToAdd);
}

function createEditButtonToAdd(item) {
    let itemEdit = document.createElement("td");
    let editButton = document.createElement("button");
    itemEdit.appendChild(editButton);
    editButton.innerHTML = "Edit";
    item.appendChild(itemEdit);
}

function createDeleteButtonToAdd(item) {
    let itemDelete = document.createElement("td");
    let delButton = document.createElement("button");
    delButton.innerHTML = "Delete";
    item.appendChild(itemDelete);
    itemDelete.appendChild(delButton);
}