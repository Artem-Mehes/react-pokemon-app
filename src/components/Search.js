import React from 'react';

const Search = ({ handleSearchSubmit }) => {
    return (
        <form className="search-form" onSubmit={handleSearchSubmit}>
            <input 
                className="search-form__input" 
                type="search" 
                name="search" 
                placeholder="Pikachu"
            />
            <input className="search-form__submit" type="submit" value="Search" />
        </form>
    )
}

export default Search;
