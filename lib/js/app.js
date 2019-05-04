const API_PATH = 'http://localhost:3003';
const B = () => {
    const getBooks = () => {
        $.get(API_PATH + '/books.json')
            .then((resp) => {
                console.log(resp.books);
                for (let book in resp.books) {
                    $('#books').append(template(resp.books[book]));
                }
            })
    };
    const template = (book) => {
        let thumbnail = API_PATH + book.thumbnail;
        return $('<div>')
            .append($('<p>').text(book.title))
            .append($('<img>').attr('src', thumbnail))
    }
    return {
        getBooks: getBooks
    };
}
Book = B();
Book.getBooks();