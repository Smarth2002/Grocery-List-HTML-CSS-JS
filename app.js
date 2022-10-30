// ****** SELECT ITEMS **********
const alert = document.querySelector(".alert");
const form = document.querySelector(".grocery-form");
const grocery = document.getElementById("grocery");
const submitBtn = document.querySelector(".submit-btn");
const container = document.querySelector(".grocery-container");
const list = document.querySelector(".grocery-list");
const clearBtn = document.querySelector(".clear-btn");

// edit option
let editElement;
let editFlag = false;
let editId = "";

// ****** EVENT LISTENERS **********

// submit form
form.addEventListener("submit", addItem); //on submitting form call addItem() function

// clear items
clearBtn.addEventListener("click", clearItems); //on pressing clear items button

// ****** FUNCTIONS **********

//now when we press submit button cases possible are 
//we have value= item that we want to add to list
//value =item we need to update existing item with entered value
//no value entered (empty text)

//so to know if the value entered is for editing or not we create edit flag and set it whenever user press
//edit button next to each item
function addItem(e) {

    e.preventDefault(); //prevent submiting to server
    const value = grocery.value;
    const id = new Date().getTime().toString(); //generating unique ID for each item


    if (value && !editFlag) { //need to add current value to list
        //so we have to create new dynamic html for current item (value) to add and append it to html of grocery list(list)
        //create new article element, add class and id to it and add item to list
        const element = document.createElement("article");

        //adding class
        element.classList.add("grocery-item");

        //adding id as dataset attribute (data-id)
        const attr = document.createAttribute("data-id");
        attr.value = id;
        element.setAttributeNode(attr); // element.setAttribute("data-id", id);

        element.innerHTML = `<p class="item">${value}</p>
        <div class="btn-container">
            <button type="button" class="edit-btn">
                <i class="fas fa-edit"></i>
            </button>
            <button type="button" class="delete-btn">
                <i class="fas fa-trash"></i>
            </button>
        </div>`;

        //now we also need to add event listener to edit and delete button next to each item
        //but we cant do so bcz these edit and delete buttons not exist initially and are added dynamically
        //so we can select them after they are created dynamically

        // targeting edit and delete buttons bcz now we have access to them
        const deleteBtn = element.querySelector(".delete-btn");
        const editBtn = element.querySelector(".edit-btn");

        deleteBtn.addEventListener("click", deleteItem);
        editBtn.addEventListener("click", editItem);

        // append child
        list.appendChild(element);

        // display alert
        displayAlert("item added to list", "success");

        // show container to show grocery-list and clear items button
        container.classList.add("show-container");

        // add to local storage
        addToLocalStorage(id, value);

        // set back to default
        setBackToDefault();
    }
    else if (value && editFlag) { //at this editItem() will be called and editFlag, editElement all are set
        // so we replace element to edit (whose edit button pressed) with value entered
        // edit item
        editElement.textContent = value;
        displayAlert("value edited", "success");

        // edit local storage
        editLocalStorage(editId, value);

        setBackToDefault();

    }
    else { //empty value submitted so do nothing
        // empty value
        displayAlert("Please enter value", "danger");
    }
}

// display alert
function displayAlert(text, action) { //add the text parameter to <p> and add class (action) to it (action=success/danger)

    alert.textContent = text;
    alert.classList.add(`alert-${action}`);

    // remove alert after a second
    setTimeout(function () {
        alert.textContent = "";
        alert.classList.remove(`alert-${action}`);
    }, 1000);
}

// clear all items in grocery list and remove (".show-container") class to hide clear items button as no item is present now
function clearItems() {

    const items = document.querySelectorAll(".grocery-item");

    //if items.length > 0
    items.forEach(function (item) { // list.innerHTML="";
        list.removeChild(item);
    });

    container.classList.remove("show-container");

    displayAlert("emptied the list", "danger");

    //if we pressed edit button so edit flag set to true but 
    //on clicking clear button we clear whole list so we cant edit so 
    //called setBackToDefault() bcz it resets edit flag bcz we dont want editing
    setBackToDefault();

    // remove from local storage
}

// delete function
//delete item whose delete button pressed. We can access that item as it is grandparent of delete button
function deleteItem(e) {

    const item = this.parentNode.parentNode; //e.currentTarget.parentElement.parentElement
    const id = item.dataset.id;

    list.removeChild(item);

    // if only 1 item was left then list become empty and we remove (".show-container") class
    if (list.children.length === 0) {
        container.classList.remove("show-container");
    }

    displayAlert("item removed", "danger");

    setBackToDefault();

    // remove from local storage

}

// edit function sets editFlag to 1, editElement is also selected as <p> needs to be changed and its sibling of btn-container
function editItem() {

    const item = this.parentNode.parentNode;

    editElement = this.parentNode.previousElementSibling;
    grocery.value = editElement.textContent;
    editFlag = true;
    editId = item.dataset.id;

    submitBtn.textContent = "edit";
}

// set back to default ...it resets the value in input box to empty string and reset the editFlag and editElement
//bcz if we have edited a value we now need to reset the flag to prevent editing every time we submit
function setBackToDefault() {
    grocery.value = "";
    editFlag = false;
    editId = "";
}

// ****** LOCAL STORAGE **********

function addToLocalStorage(id, value) {
}

function removeFromLocalStorage(id) {

}

function editLocalStorage(id, value) {

}

// ****** SETUP ITEMS **********
