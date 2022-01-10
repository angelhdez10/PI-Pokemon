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
       /*  const details = data.map(async (p) => {
            const detail = await axios.get(`${p.url}`)
            console.log(detail.data)
            return detail.data
        }) */
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
        return await Pokemon.findAll({
            include: Type
        })
    }catch(e){
        throw new Error(e)
    }
}

const allPokemons = async () => {
    try{
        const api = /* pokemonApi.length ? pokemonApi : */ await getPokemons()
        const db = await getPokemonsDb()
        const all = api.concat(db)
        pokemons = all
        return all
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
           /*  pokemon.length ? res.json(pokemon) : res.status(404).send('Pokemon not exists') */
           res.status(200).json(pokemon)
        }else{
            res.status(200).json(pokemons)
        }
    }catch(e){
        res.status(500).send('Error on server')
        throw new Error(e)
    }
})

/* pokemon.get('/filtrado', (req, res) => {
    let { ordenar, tipo, creado } = req.query;
    try{
        if(ordenar === 'seleccionar' && tipo === 'seleccionar' && creado === 'seleccionar'){
            res.json(pokemons)
        }else{
            let filtrado = pokemons.filter(p => {
                if(tipo !== 'seleccionar' ){
                    if(p.created){
                        return 
                    }
                }  
            })
        }
    }catch(e){

    }
}) */

/* pokemon.get('/types', async (req, res) => {
    let { type } = req.query;

    try{
        if(type !== 'seleccionar'){
            let types = pokemons
            console.log(types)
            res.json(types)
        }else{
            res.json(pokemons)
        }
        res.send(type)
    }catch(e){
        throw new Error(e)
    }
}) */

pokemon.get('/:id', async (req, res) => {
    let { id } = req.params
    try {
        if(id) {
            /* const pokemons = await allPokemons() */
            pokemons.length !== 0 ? pokemons : await allPokemons()
            const pokemon = pokemons.filter(p => p.id == id)
            pokemon.length ? res.json(pokemon) : res.status(404).send('Pokemon not find')
        }else {
            res.status(500).send('id no especificado')
        }
    }catch(e){
        throw new Error(e)
    }
})

pokemon.post('/', async (req, res) => {
    const { name, health, strength, defense, speed, height, weight,
        image, types, created} = req.body
    try {
            console.log(pokemons.length)
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
                console.log(pokemons.length)
                pokemons.push(newPokemon)
                console.log(pokemons.length)
                res.json(newPokemon)
            }else{
                res.json({msg: 'Pokemon existent'})
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
        /* const oldTypes = await pokemonUp.getTypes()
        console.log(oldTypes)
        console.log(pokemonUp) */
        res.json(Pokemons)
    }catch(e){
        throw new Error(e);
    }
})





module.exports = pokemon