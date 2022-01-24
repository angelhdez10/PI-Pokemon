const express = require('express')
const axios = require('axios')
const { Pokemon, Type } = require('../db')
const { Router } = require('express')
const types = require('./types')
let pokemon = express.Router()


let pokemons = []

const getPokemons = async () => {
    try{
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/`)
        const data1 = response.data.results
        const response2 = await axios.get(`${response.data.next}`)
        const data2 = response2.data.results
        const data = [...data1, ...data2]
        let detail = []
        for(let x = 0; x< data.length; x++){
            let pokemon = data[x];
            detail.push(axios.get(`${pokemon.url}`))
        }

        const detalles = Promise.all(detail).then((detail) => (
            detail.map(p => ({
                id : p.data.id,
                name: p.data.species.name,
                health: p.data.stats[0].base_stat,
                strength: p.data.stats[1].base_stat,
                defense:p.data.stats[2].base_stat,
                speed: p.data.stats[5].base_stat,
                height: p.data.height,
                weight: p.data.weight,
                types: p.data.types.map(t => t.type.name),
                image: p.data.sprites.front_default,                
            }))
        ))
        
        return detalles
    }catch(e){
        throw new Error(e)
    }
}

/* const getDetails = async (pokemon) => {
   try {
        const detail 
    }catch(e){
        throw new Error(e)
    }
} */

const getPokemonsDb = async () => {
    try{
        /*---------------------Async Await -------------------*/
        return await Pokemon.findAll({
            include: Type
        })
        /*---------------------Async Await -------------------*/
        /*---------------------Then -------------------*/
       /*  return Pokemon.findAll({
            include: Type
        }).then((resultados) => resultados) */
        /*---------------------Then -------------------*/
    }catch(e){
        throw new Error(e)
    }
}

const allPokemons = async () => {
    try{
        const api = await getPokemons()
        const db = await getPokemonsDb()
        const all = api.concat(db)
        pokemons = all
        return all
        /* const all = getPokemons().then(api => api)
        console.log(all)
        return all */
    }catch(e){
        throw new Error(e)
    }
}


pokemon.get('/', async (req, res) => {
    let { name } = req.query;
    try{
        pokemons.length !== 0 ? pokemons : await allPokemons()
        if(name){
            name = name.toLowerCase();
            const pokemon = pokemons.filter(p => p.name.toLowerCase() === name)
           res.status(200).json(pokemon)
        }else{
            res.status(200).json(pokemons)
        }
        /* await allPokemons()
        if(name){
            name = name.toLowerCase();
            const pokemon = pokemons.filter(p => p.name.toLowerCase() === name)
           res.status(200).json(pokemon)
        }else{
            res.status(200).json(pokemons)
        } */
    }catch(e){
        res.status(500).send('Error on server')
        throw new Error(e)
    }
})

pokemon.get('/:id', async (req, res) => {
    let { id } = req.params
    try {
        if(id) {
            /* const pokemons = await allPokemons() */
            pokemons.length !== 0 ? pokemons : await allPokemons()
            const pokemon = pokemons.filter(p => p.id == id)
            pokemon.length ? res.json(pokemon) : res.status(200).json({msg : 'Pokemon not find'})
        }else {
            res.status(404).json({msg : 'ID not find on DB and API'})
        }
    }catch(e){
        throw new Error(e)
    }
})

pokemon.post('/', async (req, res) => {
    const { name, health, strength, defense, speed, height, weight,
        image, types, created} = req.body
    try {
            if(name){
            const existent = pokemons.filter(p => p.name === name)
            if(existent.length === 0){
                let newPokemon = await Pokemon.create({
                    name, 
                    health, 
                    strength, 
                    defense, 
                    speed, 
                    height, 
                    weight,
                    image,
                    created
                })
                
                
                let typeDb = await Type.findAll({
                    where: { name : types}
                })
                await newPokemon.addType(typeDb)
                newPokemon = await Pokemon.findOne({
                    include: Type,
                    where: { name : name}
                })
                pokemons.push(newPokemon)
                res.json(newPokemon)
            }else{
                res.json({msg: 'Pokemon existent'})
            }
        }else{
            res.status(404).json({msg : 'Name not send'})
        }

    }catch(e){
        throw new Error(e)
    }
})

pokemon.put('/modify', async (req, res)=> {
    const { id, name, health, strength, defense, speed, height, weight,
        image, types } = req.body;
    
    try{
        const pokemonUp = await Pokemon.update({ 
            name : name,
            health: health,
            strength: strength,
            defense: defense,
            speed: speed,
            height: height,
            weight: weight,
            image: image,
        }, {
            where: {
                id : id
            }
        })

        const pokemonOld = await Pokemon.findOne({
            where: {id : id},
            include: Type
        })
        let typesNew = await Type.findAll({
            where: { name: types}
        })
        let pokemonsOld = pokemons.filter((p) => p.id === id)
        const oldTypes = await pokemonOld.setTypes(typesNew)
        const Pokemons = await Pokemon.findAll({
            include: Type,
            where: {id : id}
        })
        pokemons[pokemons.indexOf(pokemonsOld[0])] = Pokemons[0]
        
        res.json(Pokemons)
    }catch(e){
        throw new Error(e);
    }
})

pokemon.delete('/delete', async (req, res) => {
    let { id } = req.query
    try {
        if(id){
            const pokemonDelete = await Pokemon.findOne({
                where: { id : id}
            })
            await Pokemon.destroy({
                where :{ 
                    id : id
                }
            })
            pokemons = pokemons.filter(p => !p.id === id)
            res.json(pokemonDelete)
        }
    }catch(e){
        throw new Error(e)
    }
})





module.exports = pokemon