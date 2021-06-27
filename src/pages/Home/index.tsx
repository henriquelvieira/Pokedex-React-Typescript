import { FormEvent, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { api } from '../../services/api';

import './styles.scss';

type PokemonsParams = {
    id: string
  }

export function Home() {

    const [pokemons, setPokemons] = useState([]);

    let vUrl = '?limit=100';
    let vStatusRetorno; 

    useEffect(() =>  {
        
        async function fetchData() {
            await api.get(vUrl)
                     .then(response => {
                                        
                                        vStatusRetorno = JSON.stringify(response.status, null, 2);
                                        
                                        if (vStatusRetorno === '200') {
                                            setPokemons(response.data.results)   
                                        };

                                        })
                     .catch(error => {});
        }

        fetchData();
        
        console.log(pokemons);

      },[])



    return (
        <div>
            <div>Pokédex</div>

            {pokemons.map(dados => 
                (
                    <div>{dados.name}</div>
                )
            )}
        </div>
    )

}
