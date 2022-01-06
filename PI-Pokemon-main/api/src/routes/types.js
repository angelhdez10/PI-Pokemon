const express = require('express')
const axios = require('axios')
const { Type } = require('../db')
const types = express.Router()

const getTypes = async () => {
    try{
        const response = await axios.get(`https://pokeapi.co/api/v2/type`)
        const data = response.data.results
        return data
    }catch(e){
        throw new Error(e)
    }
}

types.get('/', async (req,res) => {
    try {
        const types = await getTypes()
        const types1 = types.map(t => t.name)
        types1.forEach(async t => (
            await Type.findOrCreate({
                where: {name : t}
            })
        ))
        let typesDb = await Type.findAll()
        res.send(typesDb)
    }catch(e){
        throw new Error(e)
    }

})

module.exports = types
