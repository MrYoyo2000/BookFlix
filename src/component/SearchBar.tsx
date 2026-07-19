interface Props {
    search: string;
    setSearch: (v: string) => void;
}

export default function SearchBar({ search, setSearch }: Props) {
    return (
        <div className="w-full flex justify-center my-6">

            <div className="relative w-full max-w-xl">
                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search books, authors..."
                    className="w-full px-5 py-3 rounded-xl bg-[#0F0F0F] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-600"
                />

                {search && (
                    <button
                        onClick={() => setSearch("")}
                        aria-label="Clear search"
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                    >
                        ✕
                    </button>
                )}
            </div>

        </div>
    );
}