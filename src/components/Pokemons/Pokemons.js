import React from 'react';
import axios from "axios";
import {useState, useEffect} from "react";
import Pokemon from "../Pokemon/Pokemon";
import './Pokemons.css'

function Pokemons() {
    const [pokemonData, setPokemonData] = useState({});
    const [error, toggleError] = useState(false)
    const [url, setUrl] = useState('https://pokeapi.co/api/v2/pokemon?limit=20&offset=0')

    useEffect(() => {
        async function fetchData(Url) {
            toggleError(false)
            try {
                const result = await axios.get(Url);
                setPokemonData(result.data);
            } catch (e) {
                console.error(e);
                toggleError(true)
            }
        }

        fetchData(url)
    }, [url]);

    function nextClick() {
        setUrl(pokemonData.next)
    }

    function previousClick() {
        setUrl(pokemonData.previous)
    }

    return (
        <>
            {error && <span>Er ging wat mis!</span>}
            {Object.keys(pokemonData).length > 0 &&
                <div className="container">
                    <img src='https://cdn.mos.cms.futurecdn.net/nJqzZf3iyhawJfofUMicFV-1200-80.jpg'/>
                    <div className="buttons">
                        <button
                            disabled={!pokemonData.previous}
                            onClick={previousClick}
                        >
                            Vorige
                        </button>
                        <button
                            disabled={!pokemonData.next}
                            onClick={nextClick}
                        >
                            Volgende
                        </button>
                    </div>
                    <div className="pokemon-list">
                        {pokemonData.results.map((pokemon) => {
                            return <Pokemon
                                pokemon={pokemon.name}
                                key={pokemon.name}/>
                        })}
                    </div>
                </div>
            }
        </>
    );
}

export default Pokemons;