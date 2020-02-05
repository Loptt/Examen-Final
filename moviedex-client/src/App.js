import React from 'react';
import './App.css';

class App extends React.Component {

  constructor( props ){
    super( props );
    this.state = {
      peliculas : [],
      title: "",
      year: 0,
      rating: 0,
      movies: true
    }
  }

  fetchMovies = () => {
    let url = "http://localhost:8080/api/moviedex";
    let settings = {
      method: "GET"
    }

    fetch(url, settings)
      .then(response => {
        if (response.ok) {
          return response.json();
        }

        throw new Error(response.statusText);
      })
      .then(responseJSON => {
        if (responseJSON.length < 1) {
          console.log("No movies!!")
          this.setState({movies: false})
        } else {
          this.setState({movies: true})
        }
        this.setState({
          peliculas: responseJSON
        })
      })
      .catch(error => {
        console.log(error);
      })
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    
    let url = 'http://localhost:8080/api/moviedex';
    let settings = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        film_title: this.state.title,
        year: this.state.year,
        rating: this.state.rating
      })
    }

    fetch(url, settings)
      .then(response => {
        if (response.ok) {
          return response.json();
        }

        throw new Error(response.statusText);
      })
      .then(responseJSON => {
        document.getElementById('titleinput').value = '';
        document.getElementById('yearinput').value = '';
        document.getElementById('ratinginput').value = '';
        this.fetchMovies();
      })
      .catch(error => {
        console.log(error);
      })
  }

  componentDidMount(){
    this.fetchMovies();
  }

  render(){
    return (
      <div>
        <h1>Moviedex</h1>
        {!this.state.movies ? <h2>No movies!</h2> :
        this.state.peliculas.map((p, i ) => {
          return (
            <div className='movie'>
              <h3>{p.film_title}</h3>
              <p>Year: {p.year}</p>
              <p>Rating: {p.rating}</p>
            </div>
          )
        })}
        <form onSubmit={this.handleSubmit}>
          <fieldset>
            <legend>New Movie</legend>
            <div>
              <label for="title">Film Title: </label>
              <input id='titleinput' type="text" name="title" onChange={this.handleChange}/>
            </div>
            <div>
              <label for="year">Year: </label>
              <input id='yearinput'type="number" name="year" onChange={this.handleChange}/>
            </div>
            <div>
              <label for="rating">Rating: </label>
              <input id='ratinginput' type="number" name="rating" onChange={this.handleChange}/>
            </div>
            <input type='submit'/>
          </fieldset>
        </form>
      </div>
    );
  }
}

export default App;
