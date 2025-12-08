import React from 'react';

interface GenreFilterProps {
    genres: string[];
    selectedGenre: string;
    onSelectGenre: (genre: string) => void;
}

const GenreFilter: React.FC<GenreFilterProps> = ({ genres, selectedGenre, onSelectGenre }) => {
    return (
        <div className="flex items-center">
            <label htmlFor="genre-select" className="text-[var(--color-text-primary)] mr-3 font-medium">
                Filtrar por género:
            </label>
            <select
                id="genre-select"
                value={selectedGenre}
                onChange={(e) => onSelectGenre(e.target.value)}
                className="bg-[var(--color-surface)] text-[var(--color-text-primary)] border border-[var(--color-border)] rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-colors cursor-pointer hover:bg-[var(--color-surface-hover)]"
            >
                <option value="Todos">Todos</option>
                {genres.map((genre) => (
                    <option key={genre} value={genre}>
                        {genre}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default GenreFilter;
