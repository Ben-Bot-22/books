let myLibrary = [];
let modalActive = false;

const bookElement = document.querySelector(".book-content");
const addButton = document.querySelector(".add-btn");
const bookSection = document.querySelector(".book-content");
const modalForm = document.querySelector(".modal-content");
const formBtn = document.getElementById("submit");

addButton.addEventListener("click", toggleModal);
modalForm.addEventListener("submit", handleSubmit);
modalForm.addEventListener("formdata", addBookToLibrary);

//Get form data
const title = document.getElementById("title");

//Event delegation for remove button
document.addEventListener("click", removeBook);

//Event delegation for read button
document.addEventListener("click", function (e) {
  if (e.target.id === "read-btn") {
    // toggle read
    const index =
      e.target.parentElement.parentElement.getAttribute("data-index");
    // update library data
    const book = myLibrary[Number(index)];
    book.toggleRead();
    // update button
    setReadButton(book, e.target);
  }
});

function toggleModal(e) {
  if (modalActive) {
    // turn modal off
    addButton.innerHTML = "+ add book";
    bookSection.classList.remove("blur");
    modalForm.style.animationName = "pop-out";
    setTimeout(function() {
      modalForm.style.display = "none";
    }, 150);
  } else {
    // turn modal on
    addButton.innerHTML = "close";
    bookSection.classList.add("blur");
    modalForm.style.display = "flex";
    modalForm.style.animationName = "pop-in";
  }
  modalActive = !modalActive;
}

window.addEventListener('click', event => {
  if (event.target != addButton && modalActive && !event.target.closest(".modal-content"))
  {
    toggleModal();
  }
});

// esc key shortcut
window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    if (modalActive) toggleModal();
  }
});

function Book(title, pages, read) {
  this.title = title;
  this.pages = pages;
  this.read = read;
}

Book.prototype.toggleRead = function () {
  this.read = !this.read;
};

function removeBook(e) {
  if (e.target.id === "remove-btn") {
    // get element number
    const index =
      e.target.parentElement.parentElement.getAttribute("data-index");
    // remove from myLibrary
    myLibrary.splice(Number(index), 1);
    // remove from DOM
    while (bookSection.firstChild) {
      bookSection.removeChild(bookSection.firstChild);
    }
    displayBooks();
    // printLibrary();
  }
}

function printLibrary() {
  myLibrary.forEach(function (book) {
    console.log(book.title + " " + myLibrary.indexOf(book));
  });
}

function addBookToLibrary(e) {
  const data = e.formData;
  // get the data
  let hasRead = false;
  if (data.get("has-read") === "on") {
    hasRead = true;
  }
  let newBook = new Book(data.get("title"), data.get("pages"), hasRead);
  myLibrary.push(newBook);
  renderBook(newBook);
  toggleModal();
  modalForm.reset();
}

function handleSubmit(e) {
  e.preventDefault();
  new FormData(modalForm);
}

function renderBook(book) {
  const card = createBookCard(book);
  bookElement.append(card);
}

function displayBooks() {
  myLibrary.forEach((book) => {
    renderBook(book);
  });
}

Book.prototype.info = function () {
  return this.title + this.pages.toString() + " pages";
};

function setReadButton(book, readBtn) {
  if (book.read) {
    readBtn.textContent = "read";
  } else {
    readBtn.textContent = "not read";
  }
}

const createBookCard = (book) => {
  const index = myLibrary.indexOf(book);
  // Create elements
  const bookCard = document.createElement("div");
  bookCard.setAttribute("data-index", index.toString()); //access index
  const content = document.createElement("div");
  const title = document.createElement("div");
  const pages = document.createElement("div");
  const readBtn = document.createElement("button");
  const removeBtn = document.createElement("button");
  // Add classes
  bookCard.classList.add("book-card");
  content.classList.add("content");
  readBtn.classList.add("card-btn");
  readBtn.setAttribute("id", "read-btn");
  removeBtn.classList.add("card-btn");
  removeBtn.setAttribute("id", "remove-btn");
  // Set text content
  title.textContent = `"${book.title}"`;
  pages.textContent = `${book.pages} pages`;
  removeBtn.textContent = "remove";
  setReadButton(book, readBtn);
  // Append to DOM
  bookCard.appendChild(content);
  content.appendChild(title);
  content.appendChild(pages);
  content.appendChild(readBtn);
  content.appendChild(removeBtn);
  return bookCard;
};

// myLibrary.push(new Book("The Hobbit", 295, false));
// myLibrary.push(new Book("The 3 Body Problem", 295, false));
// myLibrary.push(new Book("Don't Make Me Think", 150, false));
displayBooks();


