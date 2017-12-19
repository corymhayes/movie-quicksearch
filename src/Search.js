import React, { Component } from 'react';

class Search extends Component {

  render() {
    const movie = this.props.movie;
    return (
      <div>
        <img src={movie.Poster} alt="movie poster"/>
        <div className="movieInfo">
          <h1>{movie.Title} ({movie.Year})</h1>
          <h5>{movie.Released.slice(3)} | {movie.Genre} | {movie.Rated}</h5>

          <p> {movie.Plot} </p>

          <ul className="ratings">
            {movie.Ratings.map((item, key) =>
              <li key={key} className={`rating${key}`}>
                {item.Source[0] === 'I' ? 'IMDb' : item.Source}<br />
                <span style={{fontWeight: 'bold', fontSize: 16, color: 'black'}}>{item.Value}</span>
              </li>
            )}
          </ul>
        </div>
      </div>
    );
  }
}

export default Search;
