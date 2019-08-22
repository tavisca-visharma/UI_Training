// Script code for TODO Project

let todoSuggestions = [];
let Counter;
let previousText = "";

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
    let searchButton = document.querySelector("#todo-search");
    searchButton.addEventListener("click", search);
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
    if (itemName.trim().length !== 0) {
        if (isItemExists(itemName) == false) {
            addItemInSearchList(itemName);
            addItemInDisplayList(itemName);
        }
    }
}

function addItemInSearchList(itemName) {
    let datalist = document.getElementById("todo-list-suggestions");
    let option = document.createElement("option");
    option.value = itemName;
    datalist.appendChild(option);
}

function removeItemFromSearchList(itemName) {
    let datalist = document.getElementById("todo-list-suggestions");
    let optionsList = datalist.getElementsByTagName("option");
    for (let i = 0; i < optionsList.length; i++) {
        if (optionsList[i].value.toLowerCase() === itemName.toLowerCase()) {
            optionsList[i].parentNode.removeChild(optionsList[i]);
        }
    }
}


function addItemInDisplayList(itemName) {
    let displayList = document.getElementById("todo-list");
    if (displayList.getElementsByTagName("tr").length == 0) {
        displayList.appendChild(addHeadersInTableList());
    }
    let item = document.createElement("tr");
    let imagedata = createUncheckedCheckboxImage(item);
    createCheckedCheckboxImage(imagedata);
    createNameToAdd(item, itemName);
    let itemEdit = createEditButtonToAdd(item);
    createSaveButtonToAdd(itemEdit);
    createDeleteButtonToAdd(item);
    displayList.appendChild(item);

}

function addHeadersInTableList() {
    let header = document.createElement("tr");
    createHeaderForStatus(header);
    createHeaderForName(header);
    createHeaderForEditButton(header);
    createHeaderForDeleteButton(header);
    return header;
}

function createHeaderForStatus(header) {
    let itemNumberHeader = document.createElement("th");
    itemNumberHeader.innerHTML = "Status";
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

function createUncheckedCheckboxImage(item) {
    let itemdata = document.createElement("td");
    let image = document.createElement("img");
    image.src = "../images/uncheck.png";
    image.width = "20";
    image.height = "20";
    image.style.display = "";
    image.className = "images";
    image.addEventListener("click", toggleImageAndStrike);
    itemdata.appendChild(image);
    item.appendChild(itemdata);
    return itemdata;
}

function createCheckedCheckboxImage(itemdata) {
    let image = document.createElement("img");
    image.src = "../images/check.jpg";
    image.width = "20";
    image.height = "20";
    image.className = "images";
    image.style.display = "none";
    image.addEventListener("click", toggleImageAndStrike);
    itemdata.appendChild(image);
}

function createNameToAdd(item, itemName) {
    let itemNameToAdd = document.createElement("td");
    let itemDescription = document.createElement("textarea");
    itemDescription.readOnly = true;
    itemDescription.value = itemName;
    itemDescription.rows = 1;
    itemDescription.spellcheck = false;
    itemNameToAdd.appendChild(itemDescription);
    item.appendChild(itemNameToAdd);
}

function createEditButtonToAdd(item) {
    let itemEdit = document.createElement("td");
    let editButton = document.createElement("button");
    itemEdit.appendChild(editButton);
    editButton.innerHTML = "Edit";
    editButton.id = "edit-btn";
    editButton.style.display = "";
    editButton.addEventListener("click", editItem);
    item.appendChild(itemEdit);
    return itemEdit;
}

function createSaveButtonToAdd(itemEdit) {
    let saveButton = document.createElement("button");
    saveButton.innerHTML = "Save";
    saveButton.id = "save-btn";
    saveButton.style.display = "none";
    saveButton.addEventListener("click", saveItem);
    itemEdit.appendChild(saveButton);
}

function createDeleteButtonToAdd(item) {
    let itemDelete = document.createElement("td");
    let delButton = document.createElement("button");
    delButton.innerHTML = "X";
    delButton.id = "del-btn";
    delButton.addEventListener("click", deleteRowOfTable);
    item.appendChild(itemDelete);
    itemDelete.appendChild(delButton);
}

function deleteRowOfTable() {
    let deleteButton = this;
    let rowToBeDeleted = deleteButton.parentNode.parentNode;
    rowToBeDeleted.parentNode.removeChild(rowToBeDeleted);
}

function editItem() {
    let editButton = this;
    let rowToBeEdited = editButton.parentNode.parentNode;
    let buttons = rowToBeEdited.cells[2].getElementsByTagName("button");
    toggleButtonsDisplay(buttons);
    let textarea = rowToBeEdited.cells[1].getElementsByTagName("textarea")[0];
    previousText = textarea.value;
    enableTextEditOption(textarea);
}

function saveItem() {
    let saveButton = this;
    let rowToBeEdited = saveButton.parentNode.parentNode;
    let textarea = rowToBeEdited.cells[1].getElementsByTagName("textarea")[0];
    disableTextEditOption(textarea);
    let buttons = rowToBeEdited.cells[2].getElementsByTagName("button");
    toggleButtonsDisplay(buttons);
    let newText = textarea.value;
    if (isItemExists(newText) == false) {
        removeItemFromSearchList(previousText);
        addItemInSearchList(newText);
    }
}

function toggleButtonsDisplay(buttons) {
    if (buttons[0].style.display === "") {
        buttons[0].style.display = "none";
        buttons[1].style.display = "";
    } else {
        buttons[0].style.display = "";
        buttons[1].style.display = "none";
    }
}

function enableTextEditOption(textarea) {
    textarea.readOnly = false;
    textarea.style.background = "white";
    textarea.style.border = "1px solid blue";
}

function disableTextEditOption(textarea) {
    textarea.readOnly = true;
    textarea.style.background = "transparent";
    textarea.style.border = "0";
}

function toggleImageAndStrike() {
    let checkbox = this;
    let rowChecksToBeToggled = checkbox.parentNode.parentNode;
    let images = rowChecksToBeToggled.cells[0].getElementsByTagName("img");
    if (images[0].style.display === "") {
        images[0].style.display = "none";
        images[1].style.display = "";
        let textarea = rowChecksToBeToggled.cells[1].getElementsByTagName("textarea")[0];
        textarea.style.textDecoration = "line-through red";

    } else {
        images[0].style.display = "";
        images[1].style.display = "none";
        let textarea = rowChecksToBeToggled.cells[1].getElementsByTagName("textarea")[0];
        textarea.style.textDecoration = "none";
    }
}

function search() {
    let inputToBeFiltered = document.getElementById("todo-input")
    let listToBeFiltered = document.getElementById("todo-list");
    let str = inputToBeFiltered.value;
    let list = listToBeFiltered.getElementsByTagName("textarea");
    for (let i = 0; i < list.length; i++) {
        let dataString = list[i].value.toLowerCase();
        if (dataString.search(str) > -1 && dataString.search(str) < dataString.length) {
            list[i].parentNode.parentNode.style.display = "";
        } else {
            list[i].parentNode.parentNode.style.display = "none";
        }
    }
}