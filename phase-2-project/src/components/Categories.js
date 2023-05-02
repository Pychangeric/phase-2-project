import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Categories = () => {
  const [movies, setMovies] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [genreOptions, setGenreOptions] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await axios.get('http://localhost:3000/movies');
      setMovies(response.data);
      const genres = [...new Set(response.data.map(movie => movie.genre))];
      setGenreOptions(genres);
    };

    fetchMovies();
  }, []);

  const handleGenreChange = (genre) => {
    setSelectedGenre(genre);
  };

  const filteredMovies = movies.filter(movie => movie.genre === selectedGenre);

  const genreGroups = genreOptions.reduce((acc, curr) => {
    const lastGroup = acc[acc.length - 1];
    if (!lastGroup || lastGroup.length === 2) {
      acc.push([curr]);
    } else {
      lastGroup.push(curr);
    }
    return acc;
  }, []);

  const handleButtonClick = () => {
    const dropdown = document.getElementById("genre-dropdown");
    dropdown.classList.toggle("show");
  }

  const handleGenreClick = (genre) => {
    setSelectedGenre(genre);
    const dropdown = document.getElementById("genre-dropdown");
    dropdown.classList.toggle("show");
  }

  return (
    <div className="dropdown">
      <button className="btn btn-primary dropdown-toggle" type="button" onClick={handleButtonClick}>
        {selectedGenre ? selectedGenre : 'Select Genre'}
      </button>
      <div id="genre-dropdown" className="dropdown-menu">
        {genreGroups.map((group, index) => (
          <div key={index} className="dropdown-item-group">
            {group.map(genre => (
              <button key={genre} className="dropdown-item" type="button" onClick={() => handleGenreClick(genre)}>{genre}</button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
