"use strict";
//#region MODEL SECTION
const savedBooks = JSON.parse(localStorage.getItem("books"));
let myLibrary = savedBooks || [
  { title: "Book1", author: "Mike", genre: "fuck", yearPublished: 1989, pages: 69, read: true },
  { title: "Book2", author: "You", genre: "nofuck", yearPublished: 2023, pages: 96, read: false },
];
// render();

//book constructor
class Book {
  constructor(title, author, genre, yearPublished, pages, read, id) {
    this.title = title;
    this.author = author;
    this.genre = genre;
    this.yearPublished = yearPublished;
    this.pages = pages;
    this.read = read;
    this.id = id;
  }
}

function createBookElement(el, content, className) {
  const element = document.createElement(el);
  element.textContent = content;
  element.className = className;
  return element;
}

function createReadElement(bookItem, book) {
  const read = document.createElement("div");
  read.className = "book-read";
  read.appendChild(createBookElement("h4", "Read:", `book-read-title`));
  const input = document.createElement("input");
  input.type = "checkbox";
  input.addEventListener("click", (e) => {
    if (e.target.checked) {
      bookItem.className = "read-checked";
      book.read = true;
      renderBooks();
    } else {
      bookItem.className = "read-unchecked";
      book.read = false;
      renderBooks();
    }
  });
  if (book.read) {
    input.checked = true;
    bookItem.className = "bookDetailsCard"; //read-checked
  }
  read.appendChild(input);
  return read;
}

function createBook(book, index) {
  const bookCardContainer = document.getElementById("bookCardContainer");
  const bookItem = document.createElement("div");
  bookItem.id = index;
  bookItem.setAttribute("key", index);
  bookItem.className = "bookDetailsCard";
  bookItem.appendChild(createBookElement("h2", `${book.title}`, "book-title"));
  bookItem.appendChild(createBookElement("h4", `Author:`, "book-author"));
  bookItem.appendChild(createBookElement("p", `${book.author}`, "book-author"));
  bookItem.appendChild(createBookElement("h4", `Genre:`, "book-genre"));
  bookItem.appendChild(createBookElement("p", `${book.genre}`, "book-genre"));
  bookItem.appendChild(createBookElement("h4", `Year:`, "book-year"));
  bookItem.appendChild(createBookElement("p", `${book.yearPublished}`, "book-year"));
  bookItem.appendChild(createBookElement("h4", `Pages:`, "book-pages"));
  bookItem.appendChild(createBookElement("p", `${book.pages}`, "book-pages"));
  bookItem.appendChild(createReadElement(bookItem, book));
  bookItem.appendChild(createBookElement("button", "✖ Delete", "deleteFromLibrary"));
  bookCardContainer.insertAdjacentElement("afterbegin", bookItem);
  // saveLibrary();
}

function deleteBook(e) {
  const bookToDelete = e.target.id;
  console.log(+bookToDelete);

  // for (let i = 0; i < myLibrary.length; i++) {
  //   if (myLibrary[i] == bookToDelete.target.id) {
  //     myLibrary.splice(i, 1);
  //   }
  // }
  // myLibrary.forEach((index)=>{
  //   console.log(index[i]);
  //   console.log(index.id);
  //   console.log(bookToDelete.target.id);
  //  if (index.id == bookToDelete.target.id) {
  //   myLibrary.splice(index, 1)
  //  }
  // })
  // console.log("hello", idToDelete);
  myLibrary = myLibrary.filter((book) => {
    if (myLibrary[book.id] === +bookToDelete) {
      saveLibrary();
    }
    render();
  });
  // saveLibrary();
}

function toggleRead(bookID, checked) {
  myLibrary.forEach((book) => {
    // review this
    book.id === bookID ? (book.hasRead = checked) : !checked;
  });
  saveLibrary();
}

function saveLibrary() {
  localStorage.setItem("books", JSON.stringify(myLibrary));
}
//#endregion MODEL SECTION

//#region CONTROLLER SECTION
const openModal = document.querySelector("#open-modal-form");
openModal.addEventListener("click", (e) => {
  e.preventDefault();
  const modal = document.getElementById("add-new-book_modal");
  const closeModal = document.querySelector(".close");
  modal.style.display = "block";

  closeModal.addEventListener("click", () => {
    modal.style.display = "none";
  });
  window.onclick = (e) => {
    return e.target === modal ? (modal.style.display = "none") : null;
  };
});

const addBookSubmit = document.querySelector("#addBookSubmit");
addBookSubmit.addEventListener("click", (e) => {
  e.preventDefault();
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const genre = document.querySelector("#genre").value;
  const yearPublished = document.querySelector("#yearPublished").value;
  const pages = document.querySelector("#pages").value;
  const hasRead = document.querySelector("#hasRead");
  const id = Date.now();
  // if (
  //   title.value == "" ||
  //   author.value == "" ||
  //   genre.value == "" ||
  //   yearPublished.value == "" ||
  //   pages.value == ""
  // ) {
  //   return;
  // }
  let readStatus = false;
  hasRead.checked ? (readStatus = true) : (readStatus = false);
  const newBook = new Book(title, author, genre, yearPublished, pages, hasRead, id);
  myLibrary.push(newBook);
  createBook(newBook);
  render();

  const modal = document.getElementById("add-new-book_modal");
  modal.style.display = "none";
  (() => {
    const form = document.querySelector("form");
    form.reset();
  })();
});

//#endregion CONTROLLER SECTION

// Book.prototype.toggleRead = function () {
//   this.read = !this.read;
// };
//#region VIEW SECTION
function renderBooks() {
  myLibrary.map((book, index) => {
    createBook(book, index);
  });
}
renderBooks();
// function render() {
//   const bookCardContainer = document.getElementById("bookCardContainer");
//   bookCardContainer.innerHTML = "";

//   myLibrary.forEach((book) => {
//     // for (let key in myLibrary) {
//     //   console.log(`${key}: ${myLibrary[key]}`);
//     // }
//     const bookDetailsCard = document.createElement("div");
//     bookDetailsCard.classList.add("bookDetailsCard");
//     bookDetailsCard.setAttribute("data-arrayid", `${book.id}`);
//     // myLibrary.indexOf(myBook)); this may replace book ID on line 165
//     const bookTitle = document.createElement("h2");
//     bookTitle.textContent = `${book.title}`;
//     bookDetailsCard.appendChild(bookTitle);

//     const bookAuthorLabel = document.createElement("h4");
//     bookAuthorLabel.textContent = "Author:";
//     bookDetailsCard.appendChild(bookAuthorLabel);

//     const bookAuthorContent = document.createElement("p");
//     bookAuthorContent.textContent = `${book.author}`;
//     bookDetailsCard.appendChild(bookAuthorContent);

//     const bookGenreLabel = document.createElement("h4");
//     bookGenreLabel.textContent = "Genre:";
//     bookDetailsCard.appendChild(bookGenreLabel);

//     const bookGenreContent = document.createElement("p");
//     bookGenreContent.textContent = `${book.genre}`;
//     bookDetailsCard.appendChild(bookGenreContent);

//     const bookYearLabel = document.createElement("h4");
//     bookYearLabel.textContent = "Year:";
//     bookDetailsCard.appendChild(bookYearLabel);

//     const bookYearContent = document.createElement("p");
//     bookYearContent.textContent = `${book.yearPublished}`;
//     bookDetailsCard.appendChild(bookYearContent);

//     const bookPagesLabel = document.createElement("h4");
//     bookPagesLabel.textContent = "Pages:";
//     bookDetailsCard.appendChild(bookPagesLabel);

//     const bookPagesContent = document.createElement("p");
//     bookPagesContent.textContent = `${book.pages}`;
//     bookDetailsCard.appendChild(bookPagesContent);

//     const readLabel = document.createElement("h4");
//     readLabel.textContent = "Read:";
//     bookDetailsCard.appendChild(readLabel);
//     const readToggleLabel = document.createElement("label");
//     // readToggleLabel.setAttribute("for", "toggleRead");
//     readToggleLabel.classList.add("switch");
//     readToggleLabel.setAttribute("id", "toggleRead");
//     const readToggleSwitch = document.createElement("input");
//     readToggleSwitch.setAttribute("type", "checkbox");
//     // readToggleSwitch.setAttribute("name", "toggleRead");
//     const readToggleSlider = document.createElement("span");
//     readToggleSlider.setAttribute("class", "slider round");
//     bookDetailsCard.appendChild(readToggleLabel);
//     readToggleLabel.appendChild(readToggleSwitch);
//     readToggleLabel.appendChild(readToggleSlider);

//     const deleteBtn = document.createElement("button");
//     deleteBtn.classList.add("deleteFromLibrary");
//     deleteBtn.id = book.id;
//     deleteBtn.textContent = "Remove from Libary";

//     // const onDelete = (bookToDelete) => {
//     //   return () => {
//     //     deleteBook(bookToDelete.id);
//     //     render();
//     //   };
//     // };

//     deleteBtn.addEventListener("click", deleteBook);
//     bookDetailsCard.appendChild(deleteBtn);

//     bookCardContainer.appendChild(bookDetailsCard);
//   });
// }
//#endregion VIEW SECTION

// for (let i = 0; i < myLibrary.length; i++) {
//   let book = myLibrary[i];
//   console.log(myLibrary[i]);
//   bookDetails.setAttribute("id", book.id);
//   bookDetails.innerHTML = `
//           <h2>${book.title}</h2>
//           <h4>Author:</h4>
//           <p>${book.author}</p>
//           <h4>Genre:</h4>
//           <p>${book.genre}</p>
//           <h4>Year:</h4>
//           <p>${book.yearPublished}</p>
//           <h4>Pages:</h4>
//           <p>${book.pages}</p>
//           <h4>Read:</h4>
//           <label for="toggleRead" class="switch" id="toggleRead">
//             <input type="checkbox" name="toggleRead">
//             <span class="slider round"></span>
//           </label>
//           <button class="deleteFromLibrary" id="${book.id}">Remove from Library</button>`;

//   bookCardContainer.appendChild(bookDetails);

//   let deleteFromLibrary = document.querySelector(".deleteFromLibrary");
// }
// }

// const updateBooksGrid = () => {
//   resetBooksGrid()
//   for (let book of myLibrary.books) {
//     createBookCard(book)
//   }
// }
// const resetBooksGrid = () => {
//   bookCardContainer.innerHTML = "";
// };
//#region Legacy Code
// function addBookToLibrary() {
//   //fill form in
//   //add the submitted info to the array as an object
//   let cover = document.querySelector("#preview-img").src;
//   let title = document.querySelector("#title").value;
//   let author = document.querySelector("#author").value;
//   let genre = document.querySelector("#genre").value;
//   let yearPublished = document.querySelector("#yearPublished").value;
//   let pages = document.querySelector("#pages").value;
//   let hasRead = document.querySelector("#hasRead").checked;

//   let newBook = new Book(cover, title, author, genre, yearPublished, pages, hasRead);
//   myLibrary.push(newBook);
//   renderBookDisplay();
//   let modalClose = document.querySelector("#add-new-book_modal");
//   modalClose.style.display = "none";
// }

// const addNewBook = document.querySelector("#addBook");
// addNewBook.addEventListener("click", (e) => {
//   e.preventDefault();
//   //bring up modal form
//   const modal = document.getElementById("add-new-book_modal");
//   const closeModal = document.querySelector(".close");
//   modal.style.display = "block";

//   closeModal.addEventListener("click", () => {
//     modal.style.display = "none";
//   });
//   window.onclick = (e) => {
//     return e.target == modal ? (modal.style.display = "none") : null;
//   };
// });

// //

// // const addBook = document.querySelector("#addBook");
// // addBook.addEventListener("click", (e) => {
// //   e.preventDefault();
// //   addBookToLibrary();

// // });

// function renderBookDisplay() {
//   let libraryDisplay = document.querySelector(".libraryDisplay");
//   libraryDisplay.innerHTML = "";
//   // for each index of myLibrary
//   for (let i = 0; i < myLibrary.length; i++) {
//     let book = myLibrary[i];

//     // create div with class of bookDisplay
//     let bookDisplay = document.createElement("div");
//     bookDisplay.setAttribute("class", "bookDisplay");
//     libraryDisplay.appendChild(bookDisplay);

//     let bookDetailsContainer = document.createElement("div");
//     bookDetailsContainer.setAttribute("class", "details-container");
//     bookDisplay.appendChild(bookDetailsContainer);

//     let bookDetails = `
//            <div class="book-details title">
//              <h2>${book.title}</h2>
//            </div>
//            <div class="book-details author">
//              <h4>Author:</h4>
//              <p>${book.author}</p>
//            </div>
//            <div class="book-details genre">
//              <h4>Genre:</h4>
//              <p>${book.genre}</p>
//            </div>
//            <div class="book-details yearPublished">
//              <h4>Year:</h4>
//              <p>${book.year}</p>
//            </div>
//            <div class="book-details pages">
//              <h4>Pages:</h4>
//              <p>${book.pages}</p>
//            </div>
//            <div class="book-details hasRead">
//              <h4>Read:</h4>
//              <p>${book.hasRead === true ? "Has read" : "Have not read yet"}</p>
//           </div>
//             <button id="deleteFromLibrary">Remove from Library</button>`;

//     bookDetailsContainer.innerHTML = bookDetails;
//     libraryDisplay.appendChild(bookDetailsContainer);
//   }
//     let book = myLibrary[i];
//     let bookDisplay = document.createElement("div");

//     bookDisplay.setAttribute("class", "bookDisplay");

//     let bookDisplayCover = `<img class="cover" src=${book.cover} alt="" />`;
//     bookDisplay.innerHTML = bookDisplayCover;
//     libraryDisplay.appendChild(bookDisplay);

//     let bookDetailsContainer = document.createElement("div");
//     bookDetailsContainer.setAttribute("class", "details-container");
//     bookDisplay.appendChild(bookDetailsContainer);

//     let bookDetails = `
//       <div class="book-details title">
//         <h2>${book.title}</h2>
//       </div>
//       <div class="book-details author">
//         <h4>Author:</h4>
//         <p>${book.author}</p>
//       </div>
//       <div class="book-details genre">
//         <h4>Genre:</h4>
//         <p>${book.genre}</p>
//       </div>
//       <div class="book-details yearPublished">
//         <h4>Year:</h4>
//         <p>${book.year}</p>
//       </div>
//       <div class="book-details pages">
//         <h4>Pages:</h4>
//         <p>${book.pages}</p>
//       </div>
//       <div class="book-details hasRead">
//         <h4>Read:</h4>
//         <p>${book.hasRead === true ? "Has read" : "Have not read yet"}</p>
//       </div>
//         <button id="deleteFromLibrary">Remove from Library</button>`;

//     bookDetailsContainer.innerHTML = bookDetails;
//     libraryDisplay.appendChild(bookDetailsContainer);
// }

//   // let addNewBookBtn = `
//   //     <div>
//   //       <object data="src/images/add-icon.svg" type="image/svg+xml"></object>
//   //     </div>
//   //     <h4>Add book to library</h4>`;
//   // let addNewBookBtnContainer = document.createElement("div");
//   // addNewBookBtnContainer.setAttribute("class", "add-new-book");
//   // addNewBookBtnContainer.innerHTML = addNewBookBtn;
//   // libraryDisplay.appendChild(addNewBookBtnContainer);

//   //displays the information about the book in a collapsible section
//   // const covers = document.querySelectorAll(".bookDisplay");
//   // covers.forEach((cover) => {
//   //   cover.addEventListener("click", collapseDetails);
//   // });

//   const addNewBook = document.querySelector(".add-new-book > div");
//   addNewBook.addEventListener("click", () => {
//     //bring up modal form
//     const modal = document.getElementById("add-new-book_modal");
//     const closeModal = document.querySelector(".close");
//     modal.style.display = "block";

//     closeModal.addEventListener("click", () => {
//       modal.style.display = "none";
//     });
//     window.onclick = (e) => {
//       return e.target == modal ? (modal.style.display = "none") : null;
//     };
//   });
// }

// // function collapseDetails() {
// //   this.style.opacity = 0.7;
// //   this.style.border = "5px solid var(--heading-text-color)";

// //   let bookDetailsContainer = document.querySelector(".details-container");

// //   if (bookDetailsContainer.style.display === "grid") {
// //     bookDetailsContainer.style.display = "none";
// //     this.style.opacity = 1;
// //     this.style.border = "none";
// //   } else {
// //     bookDetailsContainer.style.display = "grid";
// //   }
// // }

// // gets the image preview for uploaded images and displays it for the user
// const uploadImg = document.getElementById("cover-img");
// uploadImg.addEventListener("change", function loadPreview() {
//   const previewImg = document.getElementById("preview-img");
//   previewImg.src = window.URL.createObjectURL(this.files[0]);
//   previewImg.onload(() => {
//     URL.revokeObjectURL(previewImg.src);
//   });
// });
//#endregion Legacy Code
