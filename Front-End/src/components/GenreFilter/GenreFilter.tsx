import React from 'react';

interface GenreFilterProps {
    genres: string[];
    selectedGenre: string;
    onSelectGenre: (genre: string) => void;
}

const GenreFilter: React.FC<GenreFilterProps> = ({ genres, selectedGenre, onSelectGenre }) => {
    return (
        <div className="mb-6">
            <label htmlFor="genre-select" className="text-white mr-3 font-medium">
                Filtrar por género:
            </label>
            <select
                id="genre-select"
                value={selectedGenre}
                onChange={(e) => onSelectGenre(e.target.value)}
                className="bg-gray-800 text-white border border-gray-600 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-colors cursor-pointer hover:bg-gray-700"
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
