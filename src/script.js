"use strict";

const myLibrary = [
  // {
  //   cover: "src/images/the_Hobbit.jpg",
  //   title: "The Hobbit",
  //   author: "J.R.R. Toliken",
  //   genre: "Fiction/Fantasy",
  //   year: 1937,
  //   pages: 310,
  //   read: true,
  // },
  // {
  //   cover: "src/images/leviathan_wakes.jpg",
  //   title: "Leviathan Wakes",
  //   author: "James S. A. Corey",
  //   genre: "Fiction/Sci-Fi",
  //   year: 2011,
  //   pages: 561,
  //   read: false,
  // },
];

//book constructor
function Book(cover, title, author, genre, yearPublished, pages, read) {
  this.cover = cover;
  this.title = title;
  this.author = author;
  this.genre = genre;
  this.yearPublished = yearPublished;
  this.pages = pages;
  this.read = read;
  this.info = () => {
    return `${title} by ${author}, ${genre}, ${pages} pages, ${
      read === true ? "read" : "have not read yet"
    }`;
  };
}

// gets the image preview for uploaded images and displays it for the user
const uploadImg = document.getElementById("cover-img");
uploadImg.addEventListener("change", function loadPreview() {
  const previewImg = document.getElementById("preview-img");
  previewImg.src = window.URL.createObjectURL(this.files[0]);
  previewImg.onload(() => {
    URL.revokeObjectURL(previewImg.src);
  });
});

const addNewBook = document.querySelector(".add-new-book > div");
addNewBook.addEventListener("click", () => {
  //bring up modal form
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

function addBookToLibrary() {
  //fill form in
  //add the submitted info to the array as an object
  let cover = document.querySelector("#preview-img").src;
  let title = document.querySelector("#title").value;
  let author = document.querySelector("#author").value;
  let genre = document.querySelector("#genre").value;
  let yearPublished = document.querySelector("#yearPublished").value;
  let pages = document.querySelector("#pages").value;
  let hasRead = document.querySelector("#hasRead").checked;

  let newBook = new Book(cover, title, author, genre, yearPublished, pages, hasRead);
  myLibrary.push(newBook);
  renderBookDisplay();
}

const addBook = document.querySelector("#addBook");
addBook.addEventListener("click", (e) => {
  e.preventDefault();
  addBookToLibrary();
});

function renderBookDisplay() {
  let libraryDisplay = document.querySelector(".libraryDisplay");
  libraryDisplay.innerHTML = "";
  for (let i = 0; i < myLibrary.length; i++) {
    let book = myLibrary[i];
    let bookDisplay = document.createElement("div");
    bookDisplay.setAttribute("class", "bookDisplay");
    let bookDisplayCover = `<img class="cover" src=${book.cover} alt="" />`;
    bookDisplay.innerHTML = bookDisplayCover;
    libraryDisplay.appendChild(bookDisplay);
    let bookDetailsContainer = document.createElement("div");
    bookDetailsContainer.setAttribute("class", "details-container");
    libraryDisplay.appendChild(bookDetailsContainer);

    let bookDetails = `
      <div class="book-details title">
        <h2>${book.title}</h2>
      </div>
      <div class="book-details author">
        <h4>Author:</h4>
        <p>${book.author}</p>
      </div>
      <div class="book-details genre">
        <h4>Genre:</h4>
        <p>${book.genre}</p>
      </div>
      <div class="book-details yearPublished">
        <h4>Year:</h4>
        <p>${book.yearPublished}</p>
      </div>
      <div class="book-details pages">
        <h4>Pages:</h4>
        <p>${book.pages}</p>
      </div>
      <div class="book-details hasRead">
        <h4>Read:</h4>
        <p>${hasRead === true ? "Has read" : "Have not read yet"}</p>
      </div>
        <button id="deleteFromLibrary">Remove from Library</button>`;

    bookDetailsContainer.innerHTML = bookDetails;
    libraryDisplay.appendChild(bookDetailsContainer);
    let addNewBookBtn = `
      <div>
        <object data="src/images/add-icon.svg" type="image/svg+xml"></object>
      </div>
      <h4>Add book to library</h4>`;
    let addNewBookBtnContainer = document.createElement("div");
    addNewBookBtnContainer.setAttribute("class", "add-new-book");
    addNewBookBtnContainer.innerHTML = addNewBookBtn;
    libraryDisplay.appendChild(addNewBookBtnContainer);
  }
  //displays the information about the book in a collapsible section
  const covers = document.querySelectorAll(".bookDisplay");
  covers.forEach((cover) => {
    cover.addEventListener("click", collapseDetails);
  });

  const addNewBook = document.querySelector(".add-new-book > div");
  addNewBook.addEventListener("click", () => {
    //bring up modal form
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
}

function collapseDetails() {
  this.style.opacity = 0.7;
  this.style.border = "5px solid var(--heading-text-color)";

  let bookDetailsContainer = document.querySelector(".details-container");

  if (bookDetailsContainer.style.display === "grid") {
    bookDetailsContainer.style.display = "none";
    this.style.opacity = 1;
    this.style.border = "none";
  } else {
    bookDetailsContainer.style.display = "grid";
  }
}
