"use strict";

const myLibrary = [];

function Book() {}

function addBookToLibrary() {}

function displayBook() {}

function info() {
  const collapseBtn = document.querySelector(".collapseInfo-btn");
  collapseBtn.toggleAttribute("hidden");
}

const titleInfo = document.querySelectorAll(".collapseInfo");

titleInfo.forEach((section) => {
  section.addEventListener("toggle", info);
});
