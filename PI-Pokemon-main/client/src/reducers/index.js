import {
    GET_POKEMONS,
    GET_POKEMON,
    GET_TYPES,
    GET_FILTER,
    ORDER,
    GET_ID,
    CREATED,
    POST_POKEMON,
    UPDATE,
    CLEAN
} from '../constantes'

const initialState = {
    allPokemons: [],
    pokemons: [],
    pokemon: [],
    types:[],
    loading: false
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
            let  { creado, tipo, ordenar } = action.payload
            let tipos = tipo === 'seleccionar' ? [...state.allPokemons] : state.allPokemons.filter(p => !p.created ? p.types.includes(tipo) : p.types.filter(p => p.name === tipo).length ? true : false)
            let creados = creado === 'seleccionar' ? tipos : creado === 'api' ? tipos.filter(p => !p.created) : tipos.filter(p => p.created)
            let ordenado = ordenar === 'seleccionar' ? creados 
            : ordenar === 'asc' ? creados.sort((a,b) => a.name > b.name ? 1 : a.name < b.name ? -1 : 0) 
            : ordenar === 'desc' ? creados.sort((a,b) => a.name < b.name ? 1 : a.name > b.name ? -1 : 0)
            : ordenar === 'less' ? creados.sort((a,b) => a.strength - b.strength) 
            : creados.sort((a,b) => a.strength - b.strength).reverse()
            ordenado = (tipo === 'seleccionar' && creado === 'seleccionar' && ordenar === 'seleccionar') ? state.allPokemons : ordenado
            const filtered = ordenado
            return {
                ...state,
                pokemons: filtered,
               
            }
            
            
        case POST_POKEMON:
            return { 
                ...state,
                pokemons: [...state.pokemons, action.payload]
            }
        case UPDATE:
                console.log(action.payload)
                return {
                    ...state,
                    pokemon: [action.payload]
                }
       /*  case ORDER:
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
            return {
                ...state,
                pokemons: sorteado
            } */
        /* case CREATED:
            let created = []
            action.payload === 'seleccionar' ? created = state.allPokemons : created = action.payload === 'db' ? state.pokemons.filter(p => p.created) : state.pokemons.filter(p => !p.created)
            return{
                ...state,
                pokemons: created
            } */
        case CLEAN:
            return{
                ...state,
                pokemon: action.payload
            }
        default:
            return {
                ...state
            }
    }
}


export default rootReducer