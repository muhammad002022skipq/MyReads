import PropTypes from "prop-types";
import Book from "./Book";

const BookShelves = ({ books, updateShelf, title }) => {
    // Showing filtered books in their respective shelves

    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{title}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {books.map((book) => (
                        <li key={book.title}>
                            <Book book={book} updateShelf={updateShelf} />
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    );

}

BookShelves.propTypes = {
    books: PropTypes.array.isRequired,
    updateShelf: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired
}

export default BookShelves;