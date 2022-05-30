import React from 'react';
import './Pokemon.css'
import axios from "axios";
import {useState, useEffect} from "react";

function Pokemon({pokemon}) {
    const [pokemonData, setPokemonData] = useState({});
    const [error, toggleError] = useState(false)
    useEffect(() => {
        async function fetchData() {
            toggleError(false)
            try {
                const result = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
                setPokemonData(result.data);
            } catch (e) {
                console.error(e);
                toggleError(true)
            }
        }
        fetchData()
    }, [pokemon]);


    return (
        <>
            {error &&
                <span>
                    Er ging wat mis!
                    </span>}
            {Object.keys(pokemonData).length > 0 &&
                <div
                    className="pokemon-card"
                    key={pokemonData.name}>
                    <h1>{pokemonData.name}</h1>
                    <img
                        src={pokemonData.sprites.front_default}
                        alt={pokemonData.name}/>
                    <p><strong>Moves:</strong> {pokemonData.moves.length}</p>
                    <p><strong>Weight:</strong> {pokemonData.weight}</p>
                    <p><strong>Abilities:</strong>
                        {pokemonData.abilities.map((ability) => {
                            return <li key={ability.ability.name}>{ability.ability.name}</li>
                        })
                        }
                    </p>
                </div>}
        </>

    );
}

export default Pokemon;