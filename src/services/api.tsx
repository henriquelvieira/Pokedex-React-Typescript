import axios from 'axios';


const api = axios.create({
    //baseURL: process.env.REACT_APP_POKEMONS, 
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    }
});


export { api };