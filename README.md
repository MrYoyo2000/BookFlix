# 📚 Book Library App

A React + TypeScript web application for managing a personal comic and manga library, with categorized browsing, favorites, and book suggestions.

## Features

- **CRUD operations** — Add, edit, and delete books via a REST API (mockapi.io)
- **Category sections** — Books are automatically grouped into sections: Manga, Marvel, DC (and any additional categories, sorted alphabetically after the main three)
- **Favorites** — Mark any book as a favorite; favorites appear in their own dedicated section
- **Suggested for you** — A horizontally scrolling carousel showing a random selection of existing books, with a subtle 3D hover effect
- **Amazon integration** — Each book card includes a "View on Amazon" link that opens a pre-filled Amazon search based on the book's title and author
- **Search** — Filter the library by title in real time
- **Activity logging** — Every create/update/delete/fetch action is logged with a timestamp and status (success/error), visible in the browser console (and optionally forwarded to the terminal in local development via a custom Vite plugin)

## Tech Stack

- **React** + **TypeScript**
- **Vite** (build tool and dev server)
- **Tailwind CSS** (styling)
- **Axios** (HTTP client)
- **mockapi.io** (REST API backend for book data)
- **lucide-react** (icons)

## Project Structure

```
src/
├── API_servis/
│   └── booksApi.ts        # API calls (getBooks, createBook, updateBook, deleteBook)
├── component/
│   ├── Navbar.tsx
│   ├── Sidebar.tsx
│   ├── Hero.tsx
│   ├── SearchBar.tsx
│   ├── BookCard.tsx        # Individual book card (with Amazon link, hover effects)
│   ├── BookForm.tsx        # Add/Edit book form (modal)
│   └── Footer.tsx
├── hook/
│   ├── useBooks.ts         # Book state management + logging
│   └── useFavorites.ts     # Favorites state management
├── logges/
│   └── logges.ts           # Centralized logging utility
├── page/
│   └── Home.tsx             # Main page: search, categories, suggestions, favorites
├── types/
│   └── Book.ts               # Book type definition
└── vite.config.ts            # Vite config (includes terminal logging plugin for dev)
```

## Data Model

```typescript
interface Book {
    id: number;
    title: string;
    author: string;
    category: string;
    year: number;
    description: string;
    coverImage: string;
}
```

## Getting Started

### Prerequisites
- Node.js 18 or later
- npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:5173` (or the port shown in your terminal).

### Build

```bash
npm run build
```

## API

This project uses [mockapi.io](https://mockapi.io) as a lightweight REST backend. The base URL is configured in `API_servis/booksApi.ts`:

```typescript
const API_URL = "https://6a456f7baab3faec3f69ebff.mockapi.io/BOOKS";
```

| Method | Endpoint      | Description          |
|--------|---------------|----------------------|
| GET    | `/BOOKS`      | Fetch all books      |
| POST   | `/BOOKS`      | Create a new book     |
| PUT    | `/BOOKS/:id`  | Update an existing book |
| DELETE | `/BOOKS/:id`  | Delete a book         |

## Notes

- Book records must be created through the app's `POST` flow (via the "+ Add Book" form) to be properly indexed for future edits/deletes. Records manually pasted into the mockapi.io dashboard JSON editor may not support `PUT`/`DELETE` operations correctly.
- Logging is visible in the browser DevTools console (F12) on both local and deployed versions. Terminal-based logging (via the custom Vite plugin) only works in local development with `npm run dev`.

## License

This project is for educational purposes.