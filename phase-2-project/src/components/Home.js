import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Home.css';

const Home = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await axios.get('http://localhost:3000/movies');
      setMovies(response.data);
    };

    fetchMovies();
  }, []);

  return (
    <div className="container">
      <div className="card-container">
        {movies.map((movie, index) => (
          <div key={index} className="card">
            <div className={index === 0 ? "card-body big-card" : "card-body"}>
              <h5 className="card-title">{movie.title}</h5>
              <p className="card-text">{movie.description}</p>
              <img src={movie.image} alt={movie.title} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
