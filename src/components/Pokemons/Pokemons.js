import React from 'react';
import axios from "axios";
import {useState, useEffect} from "react";
import Pokemon from "../Pokemon/Pokemon";
import './Pokemons.css'

function Pokemons() {
    const [pokemonData, setPokemonData] = useState({});
    const [error, toggleError] = useState(false)

    useEffect(() => {
        async function fetchData() {
            toggleError(false)
            try {
                const result = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=0`);
                setPokemonData(result.data);
            } catch (e) {
                console.error(e);
                toggleError(true)
            }
        }
        fetchData()
        console.log(pokemonData)
    }, []);
    return (
        <>
        {error && <span>Er ging wat mis!</span>}
            {Object.keys(pokemonData).length > 0 &&
                <div className="pokemon-list">
                    {pokemonData.results.map((pokemon) => {
                        return <Pokemon
                            pokemon={pokemon.name}
                            key={pokemon.url}/>
                    })}
        </div>}
        </>
    );
}

export default Pokemons;