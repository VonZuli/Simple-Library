"use strict";
// {
//   title: "The Hobbit",
//   author: "J.R.R. Toliken",
//   genre: "Fiction/Fantasy",
//   year: 1937,
//   pages: 310,
//   read: true,
//   id: Date.now(),
// },
// {
//   title: "Leviathan Wakes",
//   author: "James S. A. Corey",
//   genre: "Fiction/Sci-Fi",
//   year: 2011,
//   pages: 561,
//   read: false,
//   id: Date.now(),
// },

// const title = document.querySelector("#title").value;
// const author = document.querySelector("#author").value;
// const genre = document.querySelector("#genre").value;
// const yearPublished = document.querySelector("#yearPublished").value;
// const pages = document.querySelector("#pages").value;
// const hasRead = document.querySelector("#hasRead").checked;

//#region MODEL SECTION
let myLibrary;
const savedBooks = JSON.parse(localStorage.getItem("books"));
if (Array.isArray(savedBooks)) {
  myLibrary = savedBooks;
} else {
  myLibrary = [];
}

//book constructor
function Book(title, author, genre, yearPublished, pages, read, id) {
  this.title = title;
  this.author = author;
  this.genre = genre;
  this.yearPublished = yearPublished;
  this.pages = pages;
  this.read = read;
  this.id = id;
}

function createBook(title, author, genre, yearPublished, pages, hasRead) {
  const id = Date.now();
  let newBook = new Book(
    title.value,
    author.value,
    genre.value,
    yearPublished.value,
    pages.value,
    hasRead.checked,
    id
  );

  myLibrary.push(newBook);
  saveLibrary();
}

function deleteBook(idToDelete) {
  console.log("hello", idToDelete);
  myLibrary = myLibrary.filter((book) => {
    book.id === +idToDelete ? false : true;
  });
  saveLibrary();
}

function toggleRead(bookID, checked) {
  myLibrary.forEach((book) => {
    // review this
    book.id === bookID ? (book.hasRead = checked) : !checked;
  });
  saveLibrary();
}

function saveLibrary() {
  localStorage.setItem("book", JSON.stringify(myLibrary));
}
//#endregion MODEL SECTION

//#region CONTROLLER SECTION
const addNewBook = document.querySelector("#addBook");
addNewBook.addEventListener("click", (e) => {
  e.preventDefault();
  const modal = document.getElementById("add-new-book_modal");
  const closeModal = document.querySelector(".close");
  modal.style.display = "block";

  closeModal.addEventListener("click", () => {
    modal.style.display = "none";
  });
  window.onclick = (e) => {
    return e.target == modal ? (modal.style.display = "none") : null;
  };
});

const addBookSubmit = document.querySelector("#addBookSubmit");
addBookSubmit.addEventListener("click", (e) => {
  e.preventDefault();
  createBook(title, author, genre, yearPublished, pages, hasRead);
  render();

  const modal = document.getElementById("add-new-book_modal");
  modal.style.display = "none";
  (() => {
    const form = document.querySelector("form");
    form.reset();
  })();
});

const onDelete = (bookToDelete) => {
  return () => {
    deleteBook(bookToDelete.id);
    render();
  };
};
//#endregion CONTROLLER SECTION

// Book.prototype.toggleRead = function () {
//   this.read = !this.read;
// };
//#region VIEW SECTION

function render() {
  // const libraryDisplay = document.querySelector(".libraryDisplay");
  const bookCardContainer = document.getElementById("bookCardContainer");
  bookCardContainer.innerHTML = "";

  // bookDetails.innerHTML = "";
  myLibrary.forEach((book) => {
    let bookDetails = document.createElement("div");
    bookDetails.setAttribute("class", "bookDetails");
    bookDetails.setAttribute("id", `${book.id}`);

    const bookTitle = document.createElement("h2");
    bookTitle.textContent = `${book.title}`;
    bookDetails.appendChild(bookTitle);

    const bookAuthorLabel = document.createElement("h4");
    bookAuthorLabel.textContent = "Author:";
    bookDetails.appendChild(bookAuthorLabel);

    const bookAuthorContent = document.createElement("p");
    bookAuthorContent.textContent = `${book.author}`;
    bookDetails.appendChild(bookAuthorContent);

    const bookGenreLabel = document.createElement("h4");
    bookGenreLabel.textContent = "Genre:";
    bookDetails.appendChild(bookGenreLabel);

    const bookGenreContent = document.createElement("p");
    bookGenreContent.textContent = `${book.genre}`;
    bookDetails.appendChild(bookGenreContent);

    const bookYearLabel = document.createElement("h4");
    bookYearLabel.textContent = "Year:";
    bookDetails.appendChild(bookYearLabel);

    const bookYearContent = document.createElement("p");
    bookYearContent.textContent = `${book.yearPublished}`;
    bookDetails.appendChild(bookYearContent);

    const bookPagesLabel = document.createElement("h4");
    bookPagesLabel.textContent = "Pages:";
    bookDetails.appendChild(bookPagesLabel);
    const bookPagesContent = document.createElement("p");
    bookPagesContent.textContent = `${book.pages}`;
    bookDetails.appendChild(bookPagesContent);

    const readLabel = document.createElement('h4')
    readLabel.textContent = "Read:"
    bookDetails.appendChild(readLabel);
    const readToggleLabel = document.createElement("label");
    // readToggleLabel.setAttribute("for", "toggleRead");
    readToggleLabel.setAttribute("class", "switch");
    readToggleLabel.setAttribute("id", "toggleRead");
    const readToggleSwitch = document.createElement("input");
    readToggleSwitch.setAttribute("type", "checkbox");
    // readToggleSwitch.setAttribute("name", "toggleRead");
    const readToggleSlider = document.createElement("span");
    readToggleSlider.setAttribute("class", "slider round");
    bookDetails.appendChild(readToggleLabel);
    readToggleLabel.appendChild(readToggleSwitch);
    readToggleLabel.appendChild(readToggleSlider);

    const deleteBtn = document.createElement("button");
    deleteBtn.setAttribute("class", "deleteFromLibrary");
    deleteBtn.id = book.id;
    deleteBtn.innerText = "Remove from Libary";
    deleteBtn.addEventListener("click", onDelete(book));
    bookDetails.appendChild(deleteBtn);

    bookCardContainer.appendChild(bookDetails);
  });

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
}

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
