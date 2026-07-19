export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="bg-black border-t border-gray-800 mt-10 py-6 text-center text-gray-500 text-sm">
            <p>© {year} BookFlix - React + Tailwind Project</p>
        </footer>
    );
}