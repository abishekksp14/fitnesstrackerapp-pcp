import { useState } from "react";
import { useMovie } from "../context/Moviecontext.jsx";

const MovieForm = () => {
  const { addMovie } = useMovie();
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedTitle = title.trim();
    const trimmedGenre = genre.trim();
    const trimmedYear = year.trim();
    
    if (!trimmedTitle || !trimmedGenre || !trimmedYear) return;

    addMovie({
      id: Date.now(),
      title: trimmedTitle,
      genre: trimmedGenre,
      year: trimmedYear,
      watched: false,
      favorite: true,
    });
    setTitle("");
    setGenre("");
    setYear("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "1rem", display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a movie title"
        required
      />
      <input
        type="text"
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
        placeholder="Genre"
        required
      />
      <input
        type="number"
        value={year}
        onChange={(e) => setYear(e.target.value)}
        placeholder="Year"
        required
      />
      <button type="submit">
        Add
      </button>
    </form>
  );
};

export default MovieForm;
