import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { api } from '../../services/api';

import './styles.scss';

//Tipagem
type Abilities  = Record<string, {
  ability: {
    name: string,
    url: string
  }
}>;

type AbilitiesType =  {
  ability: {
    name: string,
    url: string
  }
};


type Detalhes  = Record<string, {
  base_experience: string,
  height: string,
  id: string
}>;

type DetalhesType =  {
  base_experience: string,
  height: string,
  id: string
};


type PokemonParams = {
    id: string
};

export function Detalhes() {
  //Pegar o valor do parametro ID da URL
  const params = useParams<PokemonParams>()
  const pokemonParam = params.id;

  const [detalhes, setDetalhes] = useState<DetalhesType[]>([]);
  const [abilities, setAbilities] = useState<AbilitiesType[]>([]);

  const [erro, setErro]         = useState<boolean>(false);
  const [url, setURL]           = useState<string>(`https://pokeapi.co/api/v2/pokemon/${pokemonParam}`);


  const vUrlImagem: string = 'https://pokeres.bastionbot.org/images/pokemon/';
  
  const history = useHistory()


  function handleVoltar() {
    history.push('/');
  }
  
  function capitalizeText(texto: string) {
    return texto.charAt(0).toUpperCase() + texto.slice(1);
  }
  

  useEffect(() =>  {
       
    let vStatusRetorno: string = '';    

    async function fetchData() {
        await api.get(url)
                 .then(response => {
                                        vStatusRetorno = JSON.stringify(response.status, null, 2);
                                        //console.log(response.data);

                                        const resposta: any = response.data;
                                        
                                        if (vStatusRetorno === '200') {
                                            const respostaAPI: Abilities = response.data.abilities ?? {};
                                            const parseResposta = Object.entries(respostaAPI).map( ([key, value]) => {
                                                return {
                                                  ability: value.ability
                                                }
                                            });

                                            const respostaAPIDetalhes: Detalhes = resposta ?? {};
                                            const parseDetalhes = Object.entries(respostaAPIDetalhes).map( ([key, value]) => {
                                                return {
                                                  base_experience: value.base_experience,
                                                  height: value.height,
                                                  id: value.id

                                                }
                                            });

                                            //Alimentar o State com a lista de Habilidades
                                            setAbilities(parseResposta); 
                                          
                                            setDetalhes(parseDetalhes);

                                            //console.log(response.data);
                                        };

                                    }
                )
                 .catch(error => {
                    setErro(false);
                 });
    };

    fetchData();
    
    console.log(detalhes);
    //console.log(pagination);
    //console.log(pagination.next);

  },[url, erro])


    return (
        <div>
         
         <h1>{capitalizeText(pokemonParam)}</h1> 


          {abilities.map(dados => 
                    (
                        <div key = {dados.ability.name}>
                          {`${dados.ability.name} - ${dados.ability.url} `}
                        </div>
                    )
                )}


          {pokemonParam && <button type='button' onClick={handleVoltar}>Voltar</button>}
        </div>
    )
}