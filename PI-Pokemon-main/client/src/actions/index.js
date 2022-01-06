import { 
    GET_POKEMONS,
    GET_POKEMON,
    GET_TYPES,
    GET_FILTER,
    ORDER,
    GET_ID,
    POST_POKEMON
 } from '../constantes'
 import axios from 'axios'

 export const getPokemons =  () => {
     try{
        return  async function(dispatch){
        const response = await axios.get('http://localhost:3001/pokemons')
        const data = response.data
        
            dispatch({
                type: GET_POKEMONS,
                payload: data
            })
        }
     }catch(e){
         throw new Error(e)
     }
 }

 export const getPokemon = (pokemonName) => {
     try{
        return async dispatch => {
            const response = await axios.get(`http://localhost:3001/pokemons/?name=${pokemonName}`)
            const data = response.data
            dispatch({
                type: GET_POKEMON,
                payload: data
            })
        }
     }catch(e){
         throw new Error(e)
     }
 }

export const getPokemonById = (id) => {
    try{
        return async dispatch => {
            const response = await axios.get(`http://localhost:3001/pokemons/${id}`)
            const data = response.data
            dispatch({
                type: GET_ID,
                payload: data
            })
        }
    }catch(e){
        throw new Error(e)
    }
}

export const getTypes = () => {
    try{
        return async dispatch => {
            const response = await axios.get('http://localhost:3001/types')
            const data = response.data
            dispatch({
                type: GET_TYPES,
                payload: data
            })
        }
    }catch(e){
        throw new Error(e)
    }
}

export const filtrado = (tipo) => {
    return dispatch => {
        dispatch({
            type: GET_FILTER,
            payload: tipo
        })
    }
}

export const orderBy = (order) => {
    try {
        return dispatch => {
            dispatch({
                type: ORDER,
                payload: order
            })
        }
    }catch(e){
        throw new Error(e)
    }
}
