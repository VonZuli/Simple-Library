"use strict";

const myLibrary = [];

function Book() {}

function addBookToLibrary() {}

function displayBook() {}

let covers = document.querySelectorAll(".cover");
covers.forEach((cover) => {
  cover.addEventListener("click", collapseDetails);
});

function collapseDetails() {
  this.classList.toggle("expand");
  let content = this.nextElementSibling;
  if (content.style.display==="grid") {
    content.style.display = "none";
  } else {
    content.style.display = "grid"
  }
}
