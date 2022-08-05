function theHobbit(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

theHobbit.prototype.info = function() {
    return this.title + ' by ' + this.author + ', ' + this.pages.toString() + ' pages'; 
}

const book = new theHobbit('The Hobbit', 'JRR Tolkein', 295, false);

console.log(book.info());