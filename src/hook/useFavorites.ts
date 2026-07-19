// src/hook/useFavorites.ts
import { useEffect, useState } from "react";

const STORAGE_KEY = "bookflix_favorites";

function loadFavorites(): number[] {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch {
        return [];
    }
}

export const useFavorites = () => {
    const [favoriteIds, setFavoriteIds] = useState<number[]>(() => loadFavorites());

    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(favoriteIds));
        } catch (err) {
            console.error("Failed to save favorites:", err);
        }
    }, [favoriteIds]);

    const isFavorite = (id: number) => favoriteIds.includes(id);

    const toggleFavorite = (id: number) => {
        setFavoriteIds((prev) =>
            prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
        );
    };

    return { favoriteIds, isFavorite, toggleFavorite };
};