import { useState } from "react";
import Navbar from "../component/Navbar";
import Sidebar from "../component/Sidebar";
import Hero from "../component/Hero";
import SearchBar from "../component/SearchBar";
import BookCard from "../component/BookCard";
import BookForm from "../component/BookForm";
import Footer from "../component/Footer";
import { useBooks } from "../hook/useBooks";
import { useFavorites } from "../hook/useFavorites";
import type { Book } from "../types/Book";

export default function Home() {
  const {
    books,
    loading,
    error,
    addBook,
    removeBook,
    editBook,
  } = useBooks();

  const { isFavorite, toggleFavorite } = useFavorites();

  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const filtered = books.filter((b) =>
    b.title.toLowerCase().includes(search.toLowerCase())
  );

  const favorites = books.filter((b) => isFavorite(b.id));

  // Group filtered books by category (case-insensitive)
  // Fixed order: Manga, Marvel, DC first, then any other categories alphabetically
  const categoryOrder = ["manga", "marvel", "DC"];

  const categories = Array.from(
    new Set(filtered.map((b) => (b.category || "Other").trim()))
  ).sort((a, b) => {
    const indexA = categoryOrder.indexOf(a.toLowerCase());
    const indexB = categoryOrder.indexOf(b.toLowerCase());

    const rankA = indexA === -1 ? categoryOrder.length : indexA;
    const rankB = indexB === -1 ? categoryOrder.length : indexB;

    if (rankA !== rankB) return rankA - rankB;
    return a.localeCompare(b); // fallback alphabétique pour les catégories hors liste
  });

  const renderBookGrid = (list: Book[]) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
      {list.map((book) => (
        <BookCard
          key={book.id}
          book={book}
          isFavorite={isFavorite(book.id)}
          onDelete={removeBook}
          onToggleFav={toggleFavorite}
          onEdit={setSelectedBook}
        />
      ))}
    </div>
  );

  return (
    <div className="bg-black min-h-screen text-white flex flex-col">

      <Navbar />
      <Sidebar onAddBook={() => setShowForm(true)} />

      <div className="md:ml-64 pt-20 px-4 md:px-6 flex-1">

        <section id="home">
          <Hero />
        </section>

        {error && (
          <p className="text-red-500 text-center mt-4 text-sm">{error}</p>
        )}

        <div className="mt-6">
          <SearchBar search={search} setSearch={setSearch} />
        </div>

        <div className="flex justify-center md:justify-end mb-6">
          <button
            onClick={() => setShowForm(true)}
            className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-lg w-full md:w-auto"
          >
            + Add Book
          </button>
        </div>

        {loading ? (
          <p className="text-gray-400 text-center mt-10">Loading books...</p>
        ) : (
          <>
            {/* CATEGORY SECTIONS */}
            {categories.map((category) => {
              const booksInCategory = filtered.filter(
                (b) => (b.category || "Other").trim() === category
              );

              return (
                <section
                  key={category}
                  id={`category-${category.toLowerCase()}`}
                  className="mt-10 md:mt-12"
                >
                  <h2 className="text-lg md:text-xl font-bold mb-4 capitalize">
                    {category}
                  </h2>
                  {renderBookGrid(booksInCategory)}
                </section>
              );
            })}

            {filtered.length === 0 && (
              <p className="text-gray-500 text-center mt-10">
                No books found.
              </p>
            )}

            <section id="favorites" className="mt-10 md:mt-12">
              <h2 className="text-lg md:text-xl font-bold mb-4">Favorites</h2>
              {renderBookGrid(favorites)}
              {favorites.length === 0 && (
                <p className="text-gray-500 text-center mt-10">
                  No favorites yet.
                </p>
              )}
            </section>
          </>
        )}

      </div>

      <div className="md:ml-64">
        <Footer />
      </div>

      {showForm && (
        <BookForm onSubmit={addBook} onClose={() => setShowForm(false)} />
      )}

      {selectedBook && (
        <BookForm
          initialData={selectedBook}
          onSubmit={(book) => editBook(book as Book)}
          onClose={() => setSelectedBook(null)}
        />
      )}

    </div>
  );
}