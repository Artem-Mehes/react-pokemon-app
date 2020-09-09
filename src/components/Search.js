import React from 'react';

const Search = ({ handleSearch }) => {
    return (
        <form className="search-form" onSubmit={handleSearch}>
            <input className="search-form__input" type="search" name="search" placeholder="Pikachu" />
            <input className="search-form__submit" type="submit" value="Search" />
        </form>
    )
}

export default Search;
