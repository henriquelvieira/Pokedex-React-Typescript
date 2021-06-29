import { useEffect, useState } from 'react';
import { Card } from '../../components/Card';

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
    next: string,
    previous: string;
  }


export function Home() {

    const [pokemons, setPokemons] = useState<PokemonsType[]>([]);
    const [erro, setErro]         = useState<boolean>(false);
    const [url, setURL]           = useState<string>('https://pokeapi.co/api/v2/pokemon?offset=0&limit=10');
    const [pagination, setPagination]   = useState<PaginationType>({next: '', previous: ''});
    
    let vUrlImagem: string = 'https://pokeres.bastionbot.org/images/pokemon/';

    function handlePagination(urlPagination: string) {
        setURL(urlPagination);
    };

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
                                            //console.log(response.data);
                                            
                                            if (vStatusRetorno === '200') {
                                                const respostaAPI: Pokemons = response.data.results ?? {};
                                                const parseResposta = Object.entries(respostaAPI).map( ([key, value]) => {
                                                    return {
                                                        name: value.name,
                                                        url: value.url,
                                                        id: LimpaCaracteres(value.url)
                                                    }
                                                });

                                                //Alimentar o State com a lista do Pokémons
                                                setPokemons(parseResposta); 
                                                
                                                //Alimentar o State com a URL para a próxima página
                                                setPagination({next: response.data.next, previous: response.data.previous})

                                            };

                                        }
                    )
                     .catch(error => {
                        setErro(false);
                     });
        };

        fetchData();
        
        //console.log(pokemons);
        //console.log(pagination);
        //console.log(pagination.next);

      },[url, erro])

    return (
        <>
            <div>
                {pokemons.map(dados => 
                    (
                        <Card 
                            key = {dados.id}
                            imagem={`${vUrlImagem}${dados.id}.png`}
                            name = {dados.name}
                        />
                    )
                )}
            </div>

            {pagination.previous && <button type='button' onClick={() => handlePagination(pagination.previous) }>Anterior</button>}
            {pagination.next && <button type='button' onClick={() => handlePagination(pagination.next) }>Próxima</button>}

        </>
    )

}
