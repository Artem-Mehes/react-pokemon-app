import React from 'react';
import { Link } from 'react-router-dom';
import { colors } from '../shared/pokemonsColors';

const Pokemon = ({ data }) => {
    const pokemonType = data.types[0].type.name,
        color = colors[pokemonType];

    const name = data.name[0].toUpperCase() + data.name.slice(1);

    const image = data.sprites.other.dream_world.front_default;

    return (
        <li className="main__card" style={{ backgroundColor: color}}>
            <div className="main__card-circle">
                <img 
                    className="main__card-img"
                    src={image} 
                    alt="pokemon" 
                />
            </div>

            <img 
                className="main__card-icon"
                src={require(`../img/${pokemonType}.svg`)} 
                alt="type-icon" 
                width="30"
                title={pokemonType} 
            />

            <div className="main__card-btn">
                <Link className="main__card-btn-link" to={`/details/${data.id}`}>Details</Link>
            </div>

            <h2>{name}</h2>
        </li>
    );
};

export default Pokemon;