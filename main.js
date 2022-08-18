var accordion = document.getElementById("accordion"); // new book button
var panel = document.getElementById("panel"); // input fields for new book
panel.style.display = "none"; // input fields for new book are hidden by default

accordion.addEventListener("click", function() { // clicking new book button opens input fields
    this.classList.toggle("active"); // adds class "active" -> changes button text to "close"
    if (panel.style.display === "block") { // input fields visible/hidden
        panel.style.display ="none";
    }
    else {
        panel.style.display = "block";
    }
})

var addBtn = document.getElementById("add-btn"); // add button to add new book
addBtn.addEventListener("click", function() { // when add button is clicked
    var author = document.getElementById("author").value; // content in input fields are put into variables
    var title = document.getElementById("title").value;
    var pages = document.getElementById("pages").value;
    var read = document.getElementById("read").checked;
    var obj = new Book(author, title, pages, read); // call object constructor
    myLibrary.push(obj); // push new object into array myLibrary
    createTable() // recreate table to include new object
    clearFields(); // clear input fields
})

function clearFields() { // clear input fields
    document.getElementById("author").value = "";
    document.getElementById("title").value = "";
    document.getElementById("pages").value = "";
    document.getElementById("read").checked = false;
}

let myLibrary = [] // array for book objects, empty by default

function Book(author, title, pages, read) { // construct new object
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.read = read;
}

Book.prototype.toggleRead = function() {
    if (this.read) {
        this.read = false;
    }
    else {
        this.read = true;
    }
}

function createTable() { // create HTML table from myLibrary array
    const table = document.getElementById('table'); // new variable for table
    clearTable(table); // clear table before adding myLibrary into it (prevent duplicate books)
    let rowId = 0; // variable that gives a unique id for each row (used in delete.png icon)
    for(const obj of myLibrary){ // loop over array myLibrary and create table
        const row = document.createElement('tr'); // create row variable
        for(const val of Object.values(obj)){ // loop through values of each object
            const col = document.createElement('td'); // create cell variable
            if (val === true) {
                var newCheckBox = document.createElement('input');
                newCheckBox.type = 'checkbox';
                col.appendChild(newCheckBox);
                newCheckBox.id = rowId;
                newCheckBox.checked = true;
                newCheckBox.classList.add("checkbox");
            }
            else if (val === false) {
                var newCheckBox = document.createElement('input');
                newCheckBox.type = 'checkbox';
                col.appendChild(newCheckBox);
                newCheckBox.id = rowId;
                newCheckBox.classList.add("checkbox");

            }
            else {
                col.textContent = val; // add value into cell
            }
            
            row.appendChild(col); // add cell into row
        }
        const deleteCell = document.createElement('td'); // last cell for each row (container for deleteImg)
        row.appendChild(deleteCell); // add cell into row
        
        const deleteImg = document.createElement("img"); // create img element (img is used as delete row button)
        deleteImg.classList.add("delete-img"); // add class "delete-img" into img element
        deleteImg.src = "images/delete.png"; // add src into img element
        deleteImg.id = rowId // give unique id for each img element based on row id
        deleteCell.appendChild(deleteImg); // add img into cell

        rowId++ // change row id +1 before looping into next row
        table.appendChild(row); // add row into table
    }
}

function clearTable(table) { // clear HTML table
    var i = table.rows.length;
    while (--i) {
        table.deleteRow(i);
    }
}

document.body.addEventListener("click", function (event) { // when clicking body..
    if (event.target.classList.contains("delete-img")) { // .. function checks if element with class "delete-img" is clicked (delete icon on each row)
        var id = event.target.getAttribute("id"); // store unique delete img id into id variable
    const objectToBeRemoved = myLibrary[id]; // use unique delete img id to determine which object in array is to be removed 
    myLibrary.splice(myLibrary.findIndex(a => a === objectToBeRemoved) , 1) // remove object from array
    createTable() // update HTML table after array has been modified
    }
    else if (event.target.classList.contains("checkbox")) {
        var id = event.target.getAttribute("id");
        myLibrary[id].toggleRead();
        createTable() // update HTML table after array has been modified

    }
});