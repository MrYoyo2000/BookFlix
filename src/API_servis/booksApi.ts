import axios from "axios";
import type { Book } from "../types/Book";

const API_URL = "https://6a456f7baab3faec3f69ebff.mockapi.io/BOOKS";

// Get all books
export const getBooks = async (): Promise<Book[]> => {
    try {
        const response = await axios.get<Book[]>(API_URL);
        return response.data;
    } catch (error) {
        console.error("Error fetching books:", error);
        throw error;
    }
};

// Create a new book
export const createBook = async (
    book: Omit<Book, "id">
): Promise<Book> => {
    try {
        const res = await axios.post<Book>(API_URL, book);
        return res.data;
    } catch (error) {
        console.error("Error creating book:", error);
        throw error;
    }
};

// Delete a book
export const deleteBook = async (id: number): Promise<void> => {
    try {
        await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
        console.error("Error deleting book:", error);
        throw error;
    }
};

// Update a book
export const updateBook = async (book: Book): Promise<Book> => {
    try {
        const res = await axios.put<Book>(`${API_URL}/${book.id}`, book);
        return res.data;
    } catch (error) {
        console.error("Error updating book:", error);
        throw error;
    }
};