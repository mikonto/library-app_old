let myLibrary = [ // store book objects into array
    {
      "author": "J.R.R. Tolkien",
      "Title": "Lord of the Rings",
      "Number of pages": "1178",
      "Read": true,
    },
    {
        "author": "Douglas Adams",
        "Title": "The Hitchhiker's Guide to the Galaxy",
        "Number of pages": "208",
        "Read": true,
    },
    {
        "author": "Kalle Päätalo",
        "Title": "Ihmisiä Telineillä",
        "Number of pages": "488",
        "Read": false,
    },
]

function Book(author, title, pageAmount, read) { // construct new object
    this.author = author;
    this.title = title;
    this.pageAmount = pageAmount;
    this.read = read;
}

function addBookToLibrary(author, title, pageAmount, read) { // add new book into library
  const obj = new Book(author, title, pageAmount, read); // call object constructor
  myLibrary.push(obj); // push new object into array myLibrary
  createTable() // recreate table to include new object

}

function createTable() { // create HTML table from myLibrary array
    const table = document.getElementById('table'); // new variable table = table in HTML
    clearTable(table); // clear table before adding myLibrary into it (so the same books dont appear in the table multiple times)

    for(const obj of myLibrary){ // loop over array myLibrary and create table
        const row = document.createElement('tr');
        for(const val of Object.values(obj)){
            const col = document.createElement('td');
            col.textContent = val;
            row.appendChild(col);
        }
        table.appendChild(row);
    }
}

function clearTable(table) { // clear HTML table
    var i = table.rows.length;
    while (--i) {
        table.deleteRow(i);
    }
  }

createTable(); // create HTML table when page loads






// function Book(title, author, pageNum, read) {
//     this.title = title
//     this.author = author
//     this.pageNum = pageNum
//     this.read = read
//     this.info = function() {
//     return `${title} by ${author}, ${pageNum} pages, ${read} yet`;
//         }
//     }

//     const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 295, 'not read')
//     console.log(theHobbit.info());