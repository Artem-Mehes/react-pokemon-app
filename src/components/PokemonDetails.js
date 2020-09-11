import React, { useState, useEffect } from 'react';
import { URL } from '../shared/mainUrl';
import { colors } from '../shared/pokemonsColors';

import Preloader from './Preloader';

const PokemonDetails = ({ match }) => {
    const [details, setDetails] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pokemonId, setPokemonId] = useState(match.params.id || 1);

    useEffect(() => {
        const fetchDetails = async () => {
            const response = await fetch(`${URL}/${pokemonId}`);
            const data = await response.json();
    
            setDetails(data);
            setLoading(false);
        }

        fetchDetails();
    }, [pokemonId]);

    const showNextPokemon = () => {
        setLoading(true);
        setPokemonId(prev => +prev + 1);
    }

    const showPrevPokemon = () => {
        if (pokemonId === 1) return;
        setLoading(true);
        setPokemonId(prev => +prev - 1);
    }

    const abilities = details.abilities && 
        details.abilities.map(item => item.ability.name);

    const stats = details.stats && details.stats.map(item => {
        return [ item.stat.name, item.base_stat ];
    });

    const types = details.types && 
        details.types.map(item => item.type.name);

    const image = details.sprites && 
        details.sprites.other.dream_world.front_default;

    const name = details.name && 
        details.name[0].toUpperCase() + details.name.slice(1);

    const pokemonType = details.types && details.types[0].type.name,
        color = colors[pokemonType];

    return (
        <article className="details">
            {loading ? <Preloader /> :
            <>
                <i className="details__arrow fas fa-caret-left" onClick={showPrevPokemon}></i>
                <header className="details__header" style={{ backgroundColor: color }}>
                    {types && types.map(item => {
                        return (
                            <img
                            className="details__header-icon" 
                            key={item} 
                            src={require(`../img/${item}.svg`)} 
                            alt="type-icon" 
                            width="40"
                            title={item}>
                            </img>
                        );
                    })}
                </header>
            
                <div className="details__container">
                    <img 
                        className=""
                        src={image} 
                        alt="pokemon"
                        width="350" 
                    />

                    <div className="details__inner">
                        <h2 className="details__title">
                            {name}
                        </h2>

                        <div className="details__info">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Stats</th>
                                        <th>Value</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {stats.map(item => {
                                        return (
                                            <tr key={item[0]}>
                                                <td>{item[0]}</td>
                                                <td>{item[1]}</td>
                                            </tr>
                                        ) 
                                    })}
                                </tbody>
                            </table>

                            <div className="details__abilities">
                                <h3>Abilities:</h3>
                                <ul className="details__abilities-list">
                                    {abilities && abilities.map(item => <li key={item}>{item}</li>)}
                                </ul>

                                <p><span>Height:</span> {details.height}</p>
                                <p><span>Weight:</span> {details.weight}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <i className="details__arrow fas fa-caret-right" onClick={showNextPokemon}></i>
            </>}

        </article>
    );
}

export default PokemonDetails;
