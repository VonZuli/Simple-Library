"use strict";
//#region MODEL SECTION
const savedBooks = JSON.parse(localStorage.getItem("books"));
let myLibrary = savedBooks || [
];

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

// function to create html elements with textcontent and classes
function createBookElement(el, content, className) {
  const element = document.createElement(el);
  element.textContent = content;
  element.className = className;
  return element;
}

// function to create input to mark read status
function createReadElement(bookItem, book) {
  const read = document.createElement("div");
  read.className = "book-read";
  const readLabel = createBookElement("h4", "Read:", `book-read-label`);
  read.appendChild(readLabel);
  // readLabel.classList.add("switch");
  // readLabel.setAttribute("id", "toggleRead");
  // readLabel.setAttribute("for", "toggleRead");
  const readToggleSwitch = document.createElement("input");
  readToggleSwitch.type = "checkbox";
  // readToggleSwitch.setAttribute("name", "toggleRead")
  // const readToggleSlider = document.createElement("span");
  // readToggleSlider.setAttribute("class", "slider round");
  readToggleSwitch.addEventListener("click", (e) => {
    if (e.target.checked) {
      bookItem.setAttribute("class", "bookDetailsCard read-checked");
      book.read = true;
      saveLibrary();
    } else {
      bookItem.setAttribute("class", "bookDetailsCard read-unchecked");
      book.read = false;
      saveLibrary();
    }
  });
  if (book.read) {
    readToggleSwitch.checked = true;
    bookItem.className = "bookDetailsCard read-checked";
  }
  read.appendChild(readLabel);
  readLabel.appendChild(readToggleSwitch);
  // readLabel.appendChild(readToggleSlider)
  return read;
}

// create edit icon w/ event listener
function createEditBtn(book) {
  const editIcon = createBookElement("button", "✏ Edit", "edit-icon");
  editIcon.addEventListener("click", (e) => console.log(book));
  return editIcon;
}

function createTooltips(content) {
  const tooltip = createBookElement("div", "", "tooltip");
  const tooltiptext = createBookElement("span", content, "tooltiptext");
  tooltip.appendChild(tooltiptext);
  return tooltip;
}

// create dummy icons, they do nothing for now
function createIcons() {
  const div = createBookElement("div", "", "icons");

  const icon1 = document.createElement("img");
  icon1.className = "bookmark-icon";
  icon1.src = "src/images/bookmark-icon.svg";
  div.appendChild(createTooltips("Track your progress")).appendChild(icon1);

  const icon2 = document.createElement("img");
  icon2.className = "audiobook-icon";
  icon2.src = "src/images/audiobook-icon.svg";
  div.appendChild(createTooltips("Get Audiobook")).appendChild(icon2);;

  const icon3 = document.createElement("img");
  icon3.className = "userCart-icon";
  icon3.src = "src/images/cart-icon.svg";
  div.appendChild(createTooltips("Buy hardcopy")).appendChild(icon3);

  return div;
}

function deleteBook(index) {
  myLibrary.splice(index, 1);
  saveLibrary();
}

// create all of the book content on the bookDetailsCard in the DOM
function createBook(book, index) {
  const bookCardContainer = document.getElementById("bookCardContainer");
  const bookItem = document.createElement("div");
  bookItem.id = index;
  bookItem.setAttribute("key", index);
  bookItem.className = "bookDetailsCard";
  bookItem.appendChild(createIcons());
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
  bookItem.appendChild(createEditBtn(book));

  bookItem.querySelector(".deleteFromLibrary").addEventListener("click", () => {
    deleteBook(index);
  });

  bookCardContainer.insertAdjacentElement("afterbegin", bookItem);
  // saveLibrary();
}

function saveLibrary() {
  localStorage.setItem("books", JSON.stringify(myLibrary));
  renderBooks();
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
  const hasRead = document.querySelector("#hasRead").checked;
  const id = Date.now();

  // simple form validation, should be refactored with regex to provide more security to the form data being submitted
  if (
    title.value == "" ||
    author.value == "" ||
    genre.value == "" ||
    yearPublished.value == "" ||
    pages.value == ""
  ) {
    return;
  }
  let readStatus = false;
  hasRead.checked ? (readStatus = true) : (readStatus = false);
  const newBook = new Book(title, author, genre, yearPublished, pages, hasRead, id);
  myLibrary.push(newBook);
  createBook(newBook);
  saveLibrary();

  const modal = document.getElementById("add-new-book_modal");
  modal.style.display = "none";
  (() => {
    const form = document.querySelector("form");
    form.reset();
  })();
});

//#endregion CONTROLLER SECTION

//#region VIEW SECTION

// function to render all the books and clear the container DOM
function renderBooks() {
  document.querySelector("#bookCardContainer").innerHTML = "";
  myLibrary.map((book, index) => {
    createBook(book, index);
  });
}

// render on page load
saveLibrary();
//#endregion VIEW SSECTION
