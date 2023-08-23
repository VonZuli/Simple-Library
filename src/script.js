"use strict";

const myLibrary = [];

function Book(title, author, genre, pages, read) {
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

function addBookToLibrary() {}

function displayBook() {}

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
