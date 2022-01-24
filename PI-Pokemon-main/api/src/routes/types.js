const express = require('express')
const axios = require('axios')
const { Type } = require('../db')/* 
const { Sequelize } = require('sequelize/dist') */
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
        await types.forEach(async t => { 
            const [type, created] = await Type.findOrCreate({
                where: { name : t.name}
            })
            
        })
       
        let typesDb = await Type.findAll()
        
        res.json(typesDb)
        
                
    }catch(e){
        throw new Error(e)
    }

})

module.exports = types
