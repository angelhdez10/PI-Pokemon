import {
    GET_POKEMONS,
    GET_POKEMON,
    GET_TYPES,
    GET_FILTER,
    ORDER,
    GET_ID,
    POST_POKEMON
} from '../constantes'

const initialState = {
    allPokemons: [],
    pokemons: [],
    pokemon: [],
    types:[]
}

const rootReducer = (state = initialState, action) => {
    switch (action.type){
        case GET_POKEMONS:
            return {
                ...state,
                allPokemons: action.payload,
                pokemons: action.payload
            }
        case GET_POKEMON:
            return {
                ...state,
                pokemons: action.payload
            }
        case GET_TYPES:
            return {
                ...state,
                types: action.payload
           }
        case GET_ID: 
           return {
                ...state,
                pokemon: action.payload
           }
        case GET_FILTER:
            const filtered = action.payload !== 'seleccionar' ? state.allPokemons.filter((p) => !p.created ? p.types.includes(action.payload) : p.types.filter(t => { return t.name === action.payload}).length ? true : null) : state.allPokemons
            console.log(filtered)
            return {
                ...state,
                pokemons: filtered,
                /* filter:  tipo === 'seleccionar' || creado === 'seleccionar' ? false : true  */
            }
        case POST_POKEMON:
            return { 
                ...state
            }
        case ORDER:
            let sorteado = []
            if(action.payload === 'asc'){
               sorteado = state.pokemons.sort((a,b) => a.name > b.name ? 1 : a.name < b.name ? -1 : 0) 
            }else if(action.payload === 'desc'){
                sorteado = state.pokemons.sort((a,b) => a.name < b.name ? 1 : a.name > b.name ? -1 : 0)
            }else if(action.payload === 'more'){
                sorteado = state.pokemons.sort((a,b) => a.strength - b.strength)
                sorteado = sorteado.reverse()
            }else if(action.payload === 'less'){
                sorteado = state.pokemons.sort((a,b) => a.strength - b.strength)
            }else{
                sorteado = state.pokemons
            }
            console.log(sorteado)
            return {
                ...state,
                pokemons: sorteado
            }
        default:
            return {
                ...state
            }
    }
}


export default rootReducer