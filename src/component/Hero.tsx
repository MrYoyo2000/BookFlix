export default function Hero() {
    const scrollToLibrary = () => {
        document.getElementById("library")?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <section
            className="relative min-h-[380px] md:h-[450px] rounded-3xl overflow-hidden shadow-2xl"
            style={{
                backgroundImage:
                    "url('https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=1600')",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <div className="absolute inset-0 bg-linear-to-r from-black via-black/70 to-transparent" />

            <div className="relative h-full flex flex-col justify-center px-6 md:px-12 py-8">

                <p className="text-red-500 font-semibold uppercase tracking-widest text-sm md:text-base">
                    Welcome
                </p>

                <h1 className="text-white text-2xl md:text-5xl font-bold max-w-xl mt-2 leading-tight">
                    Discover Your Next Favorite Book
                </h1>

                <p className="text-gray-300 max-w-lg mt-3 md:mt-5 leading-6 text-sm md:text-base">
                    Build your personal library, search thousands of books,
                    save your favorites and organize your reading list.
                </p>

                <button
                    onClick={scrollToLibrary}
                    className="mt-5 md:mt-8 bg-red-600 hover:bg-red-700 transition w-fit px-6 md:px-8 py-2.5 md:py-3 rounded-xl text-white font-semibold shadow-lg text-sm md:text-base"
                >
                    Browse Library
                </button>

            </div>
        </section>
    );
}