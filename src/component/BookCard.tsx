import type { Book } from "../types/Book";
import { Heart, Pencil, Trash, ShoppingCart } from "lucide-react";

interface Props {
    book: Book;
    isFavorite: boolean;
    onDelete: (id: number) => void;
    onToggleFav: (id: number) => void;
    onEdit: (book: Book) => void;
}

export default function BookCard({
    book,
    isFavorite,
    onDelete,
    onToggleFav,
    onEdit,
}: Props) {
    // Builds an Amazon search link based on the book's title and author
    const amazonSearchUrl = `https://www.amazon.com/s?k=${encodeURIComponent(
        `${book.title} ${book.author}`
    )}`;

    return (
        <div className="group bg-[#141414] rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition duration-300">

            {/* IMAGE */}
            <div className="relative h-60 w-full bg-black flex items-center justify-center">
                <img
                    src={book.coverImage || "/placeholder-book.png"}
                    alt={book.title}
                    className="h-full w-full object-contain"
                />

                {/* FAVORITE HEART */}
                <button
                    onClick={() => onToggleFav(book.id)}
                    aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                    className={`absolute top-3 right-3 p-2 rounded-full transition ${
                        isFavorite
                            ? "bg-red-600 text-white"
                            : "bg-black/60 text-white"
                    }`}
                >
                    <Heart size={18} fill={isFavorite ? "currentColor" : "none"} />
                </button>
            </div>

            {/* CONTENT */}
            <div className="p-4 space-y-2">

                <h2 className="text-white font-bold text-lg">
                    {book.title}
                </h2>

                <p className="text-gray-400 text-sm">
                    {book.author}
                </p>

                <p className="text-gray-600 text-xs uppercase tracking-wide">
                    {book.category} · {book.year}
                </p>

                <p className="text-gray-500 text-xs line-clamp-3">
                    {book.description}
                </p>

                {/* AMAZON LINK */}
                <a
                    href={amazonSearchUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-yellow-500 hover:text-yellow-400 text-sm pt-1"
                >
                    <ShoppingCart size={14} /> View on Amazon
                </a>

                {/* ACTIONS */}
                <div className="flex justify-between pt-3">

                    <button
                        onClick={() => onEdit(book)}
                        className="flex items-center gap-1 text-blue-400 hover:text-blue-300"
                    >
                        <Pencil size={16} /> Edit
                    </button>

                    <button
                        onClick={() => onDelete(book.id)}
                        className="flex items-center gap-1 text-red-500 hover:text-red-400"
                    >
                        <Trash size={16} /> Delete
                    </button>

                </div>

            </div>
        </div>
    );
}