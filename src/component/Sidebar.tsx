import { House, BookOpen, Heart, Plus } from "lucide-react";

interface Props {
    onAddBook: () => void;
}

export default function Sidebar({ onAddBook }: Props) {
    const scrollToSection = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};

return (
<aside className="hidden md:block fixed left-0 top-16 w-64 h-[calc(100vh-4rem)] bg-[#0F0F0F] border-r border-gray-800">
        <div className="p-6">
        <h2 className="text-gray-400 uppercase text-sm mb-6">Navigation</h2>
        <div className="space-y-4">
                <button onClick={() => scrollToSection("home")} className="flex items-center gap-3 text-white hover:text-red-500 transition">
            <House size={20} /> Home
                </button>
                <button onClick={() => scrollToSection("library")} className="flex items-center gap-3 text-white hover:text-red-500 transition">
            <BookOpen size={20} /> Books
                </button>
                <button onClick={() => scrollToSection("favorites")} className="flex items-center gap-3 text-white hover:text-red-500 transition">
            <Heart size={20} /> Favorites
                </button>
                <button onClick={onAddBook} className="flex items-center gap-3 text-white hover:text-red-500 transition">
            <Plus size={20} /> Add Book
                </button>
        </div>
    </div>
</aside>
);
}