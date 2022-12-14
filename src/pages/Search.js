import React from 'react';
import SearchResults from '../components/SearchResults';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Header from '../components/Header';
import '../css/Search.css';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      searchInput: '',
      searchingFor: '',
      disableBtn: true,
      results: undefined,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    const minLength = 2;
    const verifySearc = value.length < minLength;

    this.setState({
      [name]: value,
      disableBtn: verifySearc,
    });
  }

  async handleClick(event) {
    event.preventDefault();
    const { searchInput } = this.state;

    const data = await searchAlbumsAPI(searchInput);
    // console.log(data);

    this.setState((prevState) => ({
      searchingFor: prevState.searchInput,
      searchInput: '',
      results: data,
    }));
  }

  render() {
    const { searchInput, searchingFor, results, disableBtn } = this.state;

    return (
      <div data-testid="page-search" className="search">
        <Header />

        <div className="search-container">
          <form className="search-form">
            <input
              data-testid="search-artist-input"
              className="search-input"
              type="text"
              name="searchInput"
              onChange={ this.handleChange }
              value={ searchInput }
              placeholder="Nome do artista"
            />
            <button
              data-testid="search-artist-button"
              className="searchBtn"
              type="submit"
              disabled={ disableBtn }
              onClick={ this.handleClick }
            >
              Search
            </button>
          </form>
        </div>

        {
          searchingFor !== ''
          && (
            <SearchResults
              artist={ searchingFor }
              results={ results }
            />)
        }
      </div>
    );
  }
}

export default Search;
