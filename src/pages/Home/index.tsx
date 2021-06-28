import { FormEvent, useEffect, useState } from 'react';
//import { useHistory } from 'react-router-dom';
//import { Tracing } from 'trace_events';

import { api } from '../../services/api';

import './styles.scss';


//Tipagem
type Pokemons = Record<string, {
    name: string,
    url: string,
    id?: string
}>;

type PokemonsType =  {
    name: string,
    url: string,
    id?: string,
    imagem?: string,
};


type PaginationType = {
    next?: string,
    previous?: string;
  }


export function Home() {

    const [pokemons, setPokemons] = useState<PokemonsType[]>([]);
    const [erro, setErro]         = useState<boolean>(false);
    const [url, setURL]           = useState<string>('?limit=100');
    //const [nextURL, setNextURL]   = useState<string>('');
    
    const [nextURL, setNextURL]   = useState<PaginationType>({next: '', previous: ''});

    //let vUrl = '?limit=100';
    
    let vUrlImagem: string = 'https://pokeres.bastionbot.org/images/pokemon/';


    function handleNexPage() {
        setURL('?limit=2');
    }

    useEffect(() =>  {
       
        let vStatusRetorno: string = '';
        
        function LimpaCaracteres(vTexto: string){
            const retorno: string = vTexto;
            return retorno.replace('https://pokeapi.co/api/v2/pokemon/', '').replace('/', '')
        };
        

        async function fetchData() {
            await api.get(url)
                     .then(response => {
                                        
                                            vStatusRetorno = JSON.stringify(response.status, null, 2);
                                            
                                            if (vStatusRetorno === '200') {

                                                const respostaAPI: Pokemons = response.data.results ?? {};
                                                const parseResposta = Object.entries(respostaAPI).map( ([key, value]) => {
                                                    return {
                                                        name: value.name,
                                                        url: value.url,
                                                        id: LimpaCaracteres(value.url)
                                                    }
                                                });
                                                
                                                //console.log(response.data);

                                                //Alimentar o State com a lista do Pokémons
                                                setPokemons(parseResposta); 
                                                
                                                //Alimentar o State com a URL para a próxima página
                                                //setNextURL(response.data.next);

                                                setNextURL({next: response.data.next, previous: response.data.previous})

                                            };

                                        }
                    )
                     .catch(error => {
                        setErro(false);
                     });
        }

        fetchData();
        
        //console.log(pokemons);
        console.log(nextURL);

      },[url, erro])



    return (
        <>
            <div>
                <div>Pokédex</div>

                {pokemons.map(dados => 
                    (
                        <div key={dados.id}>
                            {`${dados.name} - ${dados.url}`}<br />
                            {/*<img src={`${vUrlImagem}${dados.id}.png`} alt={dados.name} />*/}
                        </div>
                    )
                )}
            </div>

            <button type='button' onClick={handleNexPage}>Próxima</button>

        </>
    )

}
