import React from 'react';
import './App.css';
import {useEffect, useState} from "react";
import axios from 'axios';

function App() {
    const [pokemonData, setPokemonData] = useState({});
    const [error, toggleError] = useState(false)

    async function fetchData() {
        toggleError(false)
        try {
            const result = await axios.get(`https://pokeapi.co/api/v2/pokemon/jigglypuff`);
            setPokemonData(result.data);
        } catch (e) {
            console.error(e);
            toggleError(true)
        }
    }

    useEffect(() => {
        fetchData()
    }, []);

    return (
        <>
            {error &&
                <span>
                    Er ging wat mis!
                    </span>}
            <ul>
                <li>
                    <img src={pokemonData.sprites.front_default} alt="afbeelding" />

                    <h1>  {pokemonData.name}</h1>
                    <h3>moves : {pokemonData.moves.length}</h3>
                    <h4>pokemon id: {pokemonData.id}</h4>
                    <h3>weight: {pokemonData.weight}</h3>
                    {pokemonData.abilities.map((ability) => {
                        return (
                                <p>{ability.ability.name}</p>
                                            )
                    })}

                </li>
            </ul>
        </>
    );
}

export default App;
