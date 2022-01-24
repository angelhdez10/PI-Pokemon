function Filtrar(pokemons, types){
    let filtrados = []
    for(let x = 0; x < pokemons.length; x++){
        for(let y=0; y< types.length; y++){
            if(!pokemons[x].types.includes(types[y])){
                break;
            }
        }
        filtrados.push(pokemons[x])
    }
}