import React, { useState, useEffect } from 'react';

import { URL } from '../shared/mainUrl';
import Pokemon from './Pokemon';
import Search from './Search';
import Pagination from './Pagination';
import Preloader from './Preloader';

const PokemonsList = () => {
    const [allPokemonsData, setAllPokemonsData] = useState([]);
    const [currentPage, setCurrentPage] = useState(URL);
    const [nextPage, setNextPage] = useState('');
    const [prevPage, setPrevPage] = useState('');
    const [loading, setLoading] = useState(true);
    const [searchedPokemon, setSearchedPokemon] = useState(null);
    const [inputError, setInputError] = useState(false);
    const [searchError, setSearchError] = useState(false);

    useEffect(() => {
        const fetchAllPokemons = async () => {
            let data;

            try {
                const response = await fetch(currentPage);
                if (response.ok) {
                    data = await response.json();

                    setNextPage(data.next);
                    setPrevPage(data.previous);
                } else {
                    const error = 
                        new Error(`Error ${response.status}: ${response.statusText}`);
                        
                    throw error;
                }
            
                const fetchDetails = async results => {
                    const pokemonsDetails = await Promise.all(results.map(async pokemon => {
                        let data;

                        const response = await fetch(pokemon['url']);
                        
                        if (response.ok) {
                            data = await response.json();
                        } else {
                            const error = 
                                new Error(`Error ${response.status}: ${response.statusText}`);

                            throw error;
                        }

                        return data;
                    }));

                    setAllPokemonsData(pokemonsDetails);
                };

                await fetchDetails(data.results);

                setLoading(false);
            } catch(err) {
                console.log(err);
            }
        };

        fetchAllPokemons();
    }, [currentPage]);

    const fetchSearchedPokemon = async name => {
        try {
            let data;

            const response = await fetch(`${URL}/${name}`);
            if (response.ok) {
                data = await response.json();
                setSearchedPokemon(data);
            } else {
                setSearchError(true);

                const error = 
                    new Error(`Error ${response.status}: ${response.statusText}`);
                error.response = response;
                throw error;
            }
        } catch(error) {
            console.log(error);
        }

        setLoading(false);
    };

    const goToNextPage = () => {
        if (searchedPokemon) return;
        setLoading(true);
        setCurrentPage(nextPage);
    };

    const goToPrevPage = () => {
        if (searchedPokemon) return;
        setLoading(true);
        setCurrentPage(prevPage);
    };

    const handleSearchSubmit = e => {
        e.preventDefault();

        if (!e.target.search.value) {
            setInputError(true);
            return;
        }

        setSearchError(false);
        setInputError(false);
        setLoading(true);
        fetchSearchedPokemon(
            e.target.search.value.toLowerCase().trim()
        );
    };

    const showAllPokemons = () => {
        setSearchedPokemon(null);
    };

    return (
        <>
            {loading ? <Preloader /> :
                <>
                    <Search handleSearchSubmit={handleSearchSubmit} />

                    {inputError && <p className="error">The field must not be empty!</p>}
                    {searchError && <p className="error">No pokemon with that name found!</p>}

                    <Pagination 
                        goToNextPage={goToNextPage}
                        goToPrevPage={goToPrevPage}
                    />

                    {searchedPokemon && <button className="main__btn" onClick={showAllPokemons}>Show All Pokemons</button>}
                    <ul className="main__list">
                        {searchedPokemon ? 
                            <Pokemon key={searchedPokemon.name} data={searchedPokemon} /> :
                            allPokemonsData.map(pokemon => <Pokemon key={pokemon.name} data={pokemon} />)}
                    </ul>

                    <Pagination 
                        goToNextPage={goToNextPage}
                        goToPrevPage={goToPrevPage}
                    /> 
                </>
            }
        </>
    )
}

export default PokemonsList;
