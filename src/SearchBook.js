import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import PropTypes from "prop-types";
import * as BooksAPI from "./BooksAPI";
import Book from "./Book";
import { debounce } from "lodash";

const SearchBook = ({ mainPageBooks, updateShelf }) => {
    const [query, setQuery] = useState("");
    const [foundBooks, setfoundBooks] = useState([]);

    const getBooks = async (query) => {
        //Search books with user input using API
        if (query) {
            let books = await BooksAPI.search(query.trim(), 20);
            if (books.length > 0) {
                // update shelf of book at search page with shelf of main page book for default value
                books.forEach(book => {
                    let mainPageBookFound = mainPageBooks.find((mainPageBook) => mainPageBook.id === book.id);
                    if (mainPageBookFound) {
                        book.shelf = mainPageBookFound.shelf;
                    }
                });
                setfoundBooks(books);
            }
        }
        else {
            setfoundBooks([]);
        }

    }

    // using debounce and useRef for input optimization
    // without debounce the app was showing results even when the search bar was empty
    const debouncedSearch = useRef(debounce((query) => getBooks(query), 500)).current;

    //Handle user input
    const updateQuery = (q) => {
        setQuery(q);
        debouncedSearch(q);
    }

    return (
        <div className="search-books">
            <div className="search-books-bar">
                <Link className="close-search" to="/">
                    Close
                </Link>
                <div className="search-books-input-wrapper">
                    <input
                        type="text"
                        placeholder="Search by title, author, or ISBN"
                        value={query}
                        onChange={(event) => updateQuery(event.target.value)}
                    />
                </div>
            </div>
            <div className="search-books-results">
                {foundBooks.length > 0 && (
                    <div>
                        <strong>{foundBooks.length} books found </strong>
                        <ol className="books-grid">
                            {foundBooks.map(book => (
                                <li key={book.id}>
                                    <Book book={book} updateShelf={updateShelf} />
                                </li>
                            ))}
                        </ol>
                    </div>
                )}
                {foundBooks.length === 0 && (
                    <strong>No books found</strong>
                )}
            </div>
        </div>
    );
}

SearchBook.propTypes = {
    updateShelf: PropTypes.func.isRequired
};

export default SearchBook;