import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import BookShelves from "./BookShelves";

const MainPage = ({ allBooks, updateShelf }) => {
    // Separating books to show in different shelves
    const currentlyReading = "currentlyReading";
    const wantToRead = "wantToRead";
    const read = "read";

    const currentlyReadingBooks = allBooks.filter((book) => book.shelf === currentlyReading);
    const wantToReadBooks = allBooks.filter((book) => book.shelf === wantToRead);
    const readBooks = allBooks.filter((book) => book.shelf === read);


    return (
        <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div >
            <div className="list-books-content">
                <div>
                    <BookShelves books={currentlyReadingBooks} updateShelf={updateShelf} title="Currently Reading" />
                    <BookShelves books={wantToReadBooks} updateShelf={updateShelf} title="Want to Read" />
                    <BookShelves books={readBooks} updateShelf={updateShelf} title="Read" />
                </div>
            </div>
            <div className="open-search">
                <Link to="/search">Add a book</Link>
            </div>
        </div >
    );
}
MainPage.propTypes = {
    allBooks: PropTypes.array.isRequired,
    updateShelf: PropTypes.func.isRequired
};
export default MainPage;