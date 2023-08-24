"use strict";

const myLibrary = [
  {
    cover: "src/images/the_Hobbit.jpg",
    title: "The Hobbit",
    author: "J.R.R. Toliken",
    genre: "Fiction/Fantasy",
    year: 1937,
    pages: 310,
    read: true,
  },
  {
    cover: "src/images/leviathan_wakes.jpg",
    title: "Leviathan Wakes",
    author: "James S. A. Corey",
    genre: "Fiction/Sci-Fi",
    year: 2011,
    pages: 561,
    read: false,
  },
];

//book constructor
function Book(cover, title, author, genre, pages, read) {
  this.cover = cover;
  this.title = title;
  this.author = author;
  this.genre = genre;
  this.pages = pages;
  this.read = read;
  this.info = () => {
    return `${title} by ${author}, ${genre}, ${pages} pages, ${
      read === true ? "read" : "have not read yet"
    }`;
  };
}

//gets the image preview for uploaded images and displays it for the user
const uploadImg = document.getElementById("cover-img");
uploadImg.addEventListener("change", function loadPreview() {
  const previewImg = document.getElementById("preview-img");
  previewImg.src = window.URL.createObjectURL(this.files[0]);
  previewImg.onload(() => {
    URL.revokeObjectURL(previewImg.src);
  });
});

const addNewBook = document.querySelector(".add-new-book > div");
addNewBook.addEventListener("click", addBookToLibrary);
function addBookToLibrary() {
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
  //fill form in
  //add the submitted info to the array as an object
}

function displayBook() {}

//displays the information about the book in a collapsible section
const covers = document.querySelectorAll(".bookDisplay");
covers.forEach((cover) => {
  cover.addEventListener("click", collapseDetails);
});
function collapseDetails() {
  this.style.opacity = 0.7;
  this.style.border = "5px solid var(--heading-text-color)";
  let content = this.nextElementSibling;
  if (content.style.display === "grid") {
    content.style.display = "none";
    this.style.opacity = 1;
    this.style.border = "none";
  } else {
    content.style.display = "grid";
  }
}
