const form = document.querySelector('.search-form');
const input = document.querySelector('.search-input');
const bookList = document.querySelector('.book-list');

form.addEventListener('submit', function(e) {
	e.preventDefault();
	const searchTerm = input.value;
	const url = `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}`;
  
	fetch(url)
		.then(function(response) {
  		return response.json();
    })
    	.then(function(data) {
      	displayBooks(data);
    })
    	.catch(function(error) {
      	console.log(error);
    });
});

function displayBooks(data) {
	bookList.innerHTML = '';
	const books = data.items;
  
	books.forEach(function(book) {
    const title = book.volumeInfo.title;
    const author = book.volumeInfo.authors;
    const thumbnail = book.volumeInfo.imageLinks.thumbnail;
    
    const bookCard = `
		<div class="book-card">
	        <img src="${thumbnail}" alt="${title}" class="book-image">
	        <div class="book-details">
				<h2 class="book-title">${title}</h2>
				<p class="book-author">${author}</p>
        	</div>
      	</div>
    `;
    
    bookList.insertAdjacentHTML('beforeend', bookCard);
  });
}