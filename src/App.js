import "./App.css";
import { useState, useEffect } from "react";
import * as BooksAPI from "./BooksAPI";
import { Routes, Route } from "react-router-dom";
import MainPage from "./MainPage";
import SearchBook from "./SearchBook";
import NotFound from "./NotFound";

const App = () => {
  const [allBooks, setAllBooks] = useState([]);

  // get books on start using API
  useEffect(() => {
    const getBooks = async () => {
      const res = await BooksAPI.getAll();
      setAllBooks(res);
    }
    getBooks();
  }, [])

  // update shelf of book using API
  const updateShelf = async (shelf, updatedBook) => {
    await BooksAPI.update(updatedBook, shelf);
    updatedBook.shelf = shelf;
    setAllBooks(allBooks.filter((book) => book.id !== updatedBook.id).concat(updatedBook));
  }

  return (
    <div className="app">
      <Routes>
        <Route exact path="/" element={<MainPage allBooks={allBooks} updateShelf={updateShelf} />} />
        <Route exact path="/search" element={<SearchBook mainPageBooks={allBooks} updateShelf={updateShelf} />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </div >
  );
}

export default App;
