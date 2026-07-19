import { useState, useEffect } from "react";
import type { Book } from "../types/Book";

interface Props {
  onSubmit: (book: Omit<Book, "id"> & { id?: number }) => void;
  onClose: () => void;
  initialData?: Book | null;
}

type BookFormEvent = React.FormEvent<HTMLFormElement>;

export default function BookForm({
  onSubmit,
  onClose,
  initialData,
}: Props) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [description, setDescription] = useState("");
  const [coverImage, setCoverImage] = useState("");

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setAuthor(initialData.author);
      setCategory(initialData.category);
      setYear(initialData.year);
      setDescription(initialData.description);
      setCoverImage(initialData.coverImage);
    } else {
      setTitle("");
      setAuthor("");
      setCategory("");
      setYear(new Date().getFullYear());
      setDescription("");
      setCoverImage("");
    }
  }, [initialData]);

  const handleSubmit = (e: BookFormEvent) => {
    e.preventDefault();

    if (!title.trim() || !author.trim()) {
      return;
    }

    onSubmit({
      ...(initialData?.id && { id: initialData.id }),
      title: title.trim(),
      author: author.trim(),
      category: category.trim(),
      year,
      description,
      coverImage,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

      <form
        onSubmit={handleSubmit}
        className="bg-[#141414] w-[90vw] max-w-[420px] p-6 rounded-2xl space-y-4 border border-gray-800 max-h-[85vh] overflow-y-auto"
      >

        <h2 className="text-white text-xl font-bold">
          {initialData ? "Edit Book" : "Add Book"}
        </h2>

        <input
          className="w-full p-2 rounded bg-black text-white border border-gray-700"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <input
          className="w-full p-2 rounded bg-black text-white border border-gray-700"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />

        <input
          className="w-full p-2 rounded bg-black text-white border border-gray-700"
          placeholder="Category (manga, marvel, dc, novel...)"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <input
          type="number"
          className="w-full p-2 rounded bg-black text-white border border-gray-700"
          placeholder="Year"
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
        />

        <input
          className="w-full p-2 rounded bg-black text-white border border-gray-700"
          placeholder="Image URL"
          value={coverImage}
          onChange={(e) => setCoverImage(e.target.value)}
        />

        <textarea
          className="w-full p-2 rounded bg-black text-white border border-gray-700"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className="flex justify-end gap-3 pt-2">

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-700 text-white"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white"
          >
            Save
          </button>

        </div>

      </form>
    </div>
  );
}