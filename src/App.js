import React, { Component } from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import ActionSearch from 'material-ui/svg-icons/action/search';
import {grey50, grey900, grey500, orange500} from 'material-ui/styles/colors';
import './App.css';
import Search from './Search'



class App extends Component {
  state = {
    movieSearchResult: [],
    selectedMovie: [],
    open: false,
    populate: false
  }

  // componentDidMount = () => {
  //   fetch(`http://www.omdbapi.com/?t=Halloween&plot=full&apikey=e1f71893`)
  //     .then((response) => response.json())
  //     .then((omdb) => {
  //       this.setState({selectedMovie: [...this.state.selectedMovie, omdb]})
  //     }).catch((error) => {
  //       console.error(error);
  //     })
  // }

  searchButton = () => {
    const movie = document.getElementById('movieSearch').value;

    fetch(`http://www.omdbapi.com/?s=${movie}&plot=full&apikey=e1f71893`)
      .then((response) => response.json())
      .then((omdb) => {
        if(this.state.movieSearchResult.length > 0){
          this.state.movieSearchResult.pop();
          this.setState({movieSearchResult: [...this.state.movieSearchResult, omdb]})
        } else {
          this.setState({movieSearchResult: [...this.state.movieSearchResult, omdb]})
        }
      }).catch((error) => {
        console.error(error);
      })
  }


  getIMDBId = (title) => {
    fetch(`http://www.omdbapi.com/?t=${title}&plot=full&apikey=e1f71893`)
      .then((response) => response.json())
      .then((omdb) => {
        if(this.state.selectedMovie.length > 0){
          this.state.selectedMovie.pop();
          this.setState({selectedMovie: [...this.state.selectedMovie, omdb]})
        } else {
          this.setState({selectedMovie: [...this.state.selectedMovie, omdb]})
        }
      }).catch((error) => {
        console.error(error);
      })
  }


  populateMovie = () => {
    return this.state.selectedMovie.map((movie, key) => {
      return <Search key={key} movie={movie} />
    });
  }

  handleClose = () => {
    this.setState({open: false})
  }


  render() {
    return (
      <MuiThemeProvider>
        <div>
          <header style={{backgroundColor: grey900}}>
            <div>
              {/* <input className="movieSearch" type='search' /> */}
              <TextField
                id='movieSearch'
                inputStyle={{color: grey50, fontSize: 32}}
                style={{width: 750}}
                underlineFocusStyle={{borderColor: orange500}}
                hintText='Movie Quicksearch'
                hintStyle={{color: grey500, fontSize: 32}}
                onKeyPress={
                  (e) => { if(e.key === 'Enter'){
                    this.searchButton()
                  }}
                }
              />
              <IconButton
                style={{paddingLeft: 0, paddingBottom: 0}}
                iconStyle={{
                  color: grey50,
                  width: 32,
                  height: 32
                }}
                onClick={this.searchButton}
              >
                <ActionSearch />
              </IconButton>
              {/* <button className="movieSearchButton" onClick={this.searchButton}>Search</button> */}
            </div>
          </header>
          <div>
            <GridList
              cellHeight={200}
              cols={5}
            >
              {this.state.movieSearchResult.map((item) => (
                item.Search.map((movie, key) => {
                  return <GridTile
                      onClick={() => {
                        this.getIMDBId(movie.Title)
                        this.setState({populate: true, open: true})
                      }}
                      key={key}
                      title={`${movie.Title} (${movie.Year})`}
                    >
                      <img src={movie.Poster} alt="movie poster"/>
                    </GridTile>
              })))}
            </GridList>

            <Dialog
              // actions={actions}
              modal={false}
              open={this.state.open}
              bodyClassName="dialogBody"
              onRequestClose={this.handleClose}
            >
              {this.state.populate ? this.populateMovie() : console.log('error')}
            </Dialog>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
