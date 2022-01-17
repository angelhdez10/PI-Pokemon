import { 
    GET_POKEMONS,
    GET_POKEMON,
    GET_TYPES,
    GET_FILTER,
/*     ORDER, */
    GET_ID,
/*     CREATED, */
    CLEAN,
    POST_POKEMON,
    UPDATE,
    DELETE,
/*     WARNING */
 } from '../constantes'
 import axios from 'axios'

 export const getPokemons =  () => {
     try{
        return  async function(dispatch){
            dispatch({
                type: GET_POKEMONS,
                payload: 'charging'
            })
            /* ------ Async Await ------------------------------------------------------------------- */
            const response = await axios.get('http://localhost:3001/pokemons')
            const data = response.data
        
            dispatch({
                type: GET_POKEMONS,
                payload: data
            })
            /* ------ Async Await ------------------------------------------------------------------- */

            /* ------ Then ------------------------------------------------------------------- */
            /* axios.get('http://localhost:3001/pokemons')
                .then(response =>  response.data)
                .then(data => dispatch({
                    type: GET_POKEMONS,
                    payload: data
                })) */

            /* ------ Then ------------------------------------------------------------------- */

        }
     }catch(e){
         throw new Error(e)
     }
 }

 export const getPokemon = (pokemonName) => {
     try{
        return async dispatch => {
            /* ------ Async Await ------------------------------------------------------------------- */
            const response = await axios.get(`http://localhost:3001/pokemons/?name=${pokemonName}`)
            const data = response.data
            dispatch({
                type: GET_POKEMON,
                payload: data
            })
            /* ------ Async Await ------------------------------------------------------------------- */
            /* ------ Then ------------------------------------------------------------------- */
            /* axios.get(`http://localhost:3001/pokemons/?name=${pokemonName}`)
                .then(response => response.data)
                .then(data => dispatch({
                    type: GET_POKEMON,
                    payload: data
                })) */
            /* ------ Then ------------------------------------------------------------------- */
        }
     }catch(e){
         throw new Error(e)
     }
 }

export const getPokemonById = (id) => {
    try{
        return async dispatch => {
            /*---Async Await---------------------------------------------------------------------------*/
            const response = await axios.get(`http://localhost:3001/pokemons/${id}`)
            const data = response.data
            
            dispatch({
                type: GET_ID,
                payload: data
            })
           
            /*---Async Await---------------------------------------------------------------------------*/

            /*--- Then ---------------------------------------------------------------------------*/
            /* axios.get(`http://localhost:3001/pokemons/${id}`)
                .then(response => response.data)
                .then(data => dispatch({
                    type: GET_ID,
                    payload: data
                })) */
            
            /*--- Then ---------------------------------------------------------------------------*/
            
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

export const postPokemon = (pokemon) => {
    try{
        return async dispatch =>{
            /*---Async Await---------------------------------------------------------------------------*/
            /* const response = await axios.post('http://localhost:3001/pokemons', pokemon)
            const data = response.data 
            
            dispatch({
                type: POST_POKEMON,
                payload: data
            })
            */
             /*---Async Await---------------------------------------------------------------------------*/

             /*----------- Then-------------------------------------------------------------------------------------- */
                axios.post('http://localhost:3001/pokemons', pokemon)
                    .then(response =>  response.data)
                    .then(data => dispatch({
                        type: POST_POKEMON,
                        payload: data
                    }))
             /*----------- Then-------------------------------------------------------------------------------------- */
            
        }
    }catch(e){
        throw new Error(e)
    }
}

export const deletePokemon = (id) => {
    try{
        return async dispatch => {
             /*---Async Await---------------------------------------------------------------------------*/
            /* const response = await axios.delete(`http://localhost:3001/pokemons/delete?id=${id}`)
            const data = response.data
            dispatch({
                type: DELETE,
                payload: data
            }) */
             /*---Async Await---------------------------------------------------------------------------*/

            /*----------- Then-------------------------------------------------------------------------------------- */
                axios.delete(`http://localhost:3001/pokemons/delete?id=${id}`)
                    .then(response => response.data)
                    .then(data => dispatch({
                        type: DELETE,
                        payload: data
                    }))
            /*----------- Then-------------------------------------------------------------------------------------- */
            
        }
    }catch(e){
        throw new Error(e)
    }
}

export const updatePokemon = (pokemon) => {
    try{
        return async dispatch =>{
             /*---Async Await---------------------------------------------------------------------------*/
            const response = await axios.put('http://localhost:3001/pokemons/modify', pokemon)
            const data = response.data[0];
            dispatch({
                type: UPDATE,
                payload: data
            })
           
             /*---Async Await---------------------------------------------------------------------------*/

             /*----------- Then-------------------------------------------------------------------------------------- */
            /* axios.put('http://localhost:3001/pokemons/modify', pokemon)
                .then(response => response.data[0])
                .then(data => dispatch({
                    type: UPDATE,
                    payload: data
                })) */
             /*----------- Then-------------------------------------------------------------------------------------- */

            
        }
    }catch(e){

    }
}


export const filtrado = (tipo) => {
    return dispatch => {
        dispatch({
            type: GET_FILTER,
            payload: tipo
        })
    }
   
       /*  return async dispatch => {
        const response = await axios.get(`http://localhost:3001/pokemons/filtrado/?ordenar=${tipo.ordenar}&tipo=${tipo.tipo}&creado=${tipo.creado}` )
        const data = response.data
        console.log(data)
        dispatch({
            type: GET_FILTER,
            payload: data
        })
        } */
    
}

/* export const orderBy = (order) => {
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
} */

/* export const createdPok = (value) => {
    return dispatch => {
        dispatch({
            type: CREATED,
            payload: value
        })
    }
} */

export const cleanPokemon = () => {
    return dispatch => {
        dispatch({
            type: CLEAN,
            payload: []
        })
    }
}

/* export const clearWarning = () => {
    return dispatch => {
        dispatch({
            type: WARNING,
            payload: ''
        })
    }
} */
