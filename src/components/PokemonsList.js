import React, { useState, useEffect } from 'react';

import { URL } from '../shared/mainUrl';
import Pokemon from './Pokemon';
import Search from './Search';
import Pagination from './Pagination';
import Preloader from './Preloader';

const PokemonsList = () => {
    const [allPokemonsData, setAllPokemonsData] = useState([]);
    const [currentPage, setCurrentPage] = useState(`${URL}pokemon`);
    const [nextPage, setNextPage] = useState('');
    const [prevPage, setPrevPage] = useState('');
    const [loading, setLoading] = useState(true);
    const [searchedPokemon, setSearchedPokemon] = useState(null);

    useEffect(() => {
        const fetchAllPokemons = async () => {
            const response = await fetch(currentPage);
            const data = await response.json();
            
            setNextPage(data.next);
            setPrevPage(data.previous);

            const fetchDetails = async results => {
                const pokemonsDetails = await Promise.all(results.map(async pokemon => {
                    const response = await fetch(pokemon['url']);
                    const data = await response.json();
                    return data;
                }));

                setAllPokemonsData(pokemonsDetails);
            };

            await fetchDetails(data.results);

            setLoading(false);
        };

        fetchAllPokemons();
    }, [currentPage]);

    const fetchSearchedPokemon = async name => {
        const response = await fetch(`${URL}pokemon/${name}`);
        const data = await response.json();

        setSearchedPokemon(data);
    };

    const goToNextPage = () => {
        if (searchedPokemon) return;
        setCurrentPage(nextPage);
    };

    const goToPrevPage = () => {
        if (searchedPokemon) return;
        setCurrentPage(prevPage);
    };

    const handleSearch = e => {
        e.preventDefault();

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
                    <Search handleSearch={handleSearch} />
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
