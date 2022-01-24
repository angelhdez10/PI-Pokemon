import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { TarjetaD, Container, Mod } from "./Details"
import Button from '../styled/Button'
import Input from './Input'
import Selector from './Selector'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { getTypes, postPokemon, updatePokemon, getPokemons } from '../actions'
import Charging from './Charging'
import Error from './Error'



export const Eliminar = styled.button`
    height: auto;
    width: auto;
    border-radius: 9999px;
    background-color: #e70202;
    color: white;
    cursor: pointer
`

const ButtonAc = styled(Button)`
    height: 25px;
    background-color: ${props => props.valid && props.validTypes ? '#4CAF50' : '#e70202'}/* 
    disabled: ${props => !props.disabled ? true : false} */
`


let valid = true;
let validForm = false;
let validTypes = false;
let invalid = false;
let existente = false;

const Pokemon = ({pokemonExistent}) => {
    let { types, loading, pokemons } = useSelector(state => state)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [newPokemon, setNewPokemon] = useState({
        id: pokemonExistent ? pokemonExistent.id : null,
        name: pokemonExistent ? pokemonExistent.name : '',
        strength: pokemonExistent ? pokemonExistent.strength : 50,
        speed: pokemonExistent ? pokemonExistent.speed : 50,
        defense: pokemonExistent ? pokemonExistent.defense : 50,
        health: pokemonExistent ? pokemonExistent.health : 50,
        weight: pokemonExistent ? pokemonExistent.weight : 25,
        height: pokemonExistent ? pokemonExistent.height : 10,
        image: pokemonExistent ? pokemonExistent.image : '',
        types: pokemonExistent ? pokemonExistent.types.map(t => t.name) : []
    })
    
    const [error, setError] = useState(false)

    

    useEffect(() =>{
        pokemons = pokemons.length ? pokemons : dispatch(getPokemons())
        types = types.length ? types : dispatch(getTypes()) 
    }, [])


    const handleTypes = (e) => {
        if(e.target.name === 'types'){
            setNewPokemon({
                ...newPokemon,
                [e.target.name]: !newPokemon.types.includes(e.target.value) ? [...newPokemon.types, e.target.value] : newPokemon.types
            })
           
        }
        
    }

    const handleChange = (e) => {
        e.preventDefault()
       if(e.target.name === 'name'){
           let expresion = /[^a-z]/i
           let coincidencias = e.target.value !== '' ? e.target.value.match(expresion) : []
           existente = pokemons.filter( p => p.name.toLowerCase() === e.target.value.trim().toLowerCase()).length !== 0 ? true : false
           valid = e.target.value === '' ? false : coincidencias !== null ? false : existente ? false : true
           invalid = e.target.value === '' ? false : coincidencias === null ? false : true;
        }
        
        setNewPokemon({
            ...newPokemon,
            [e.target.name] : e.target.value
        })
    
    }

    
    const handleEliminar = (e) => {
        e.preventDefault()
        setNewPokemon({
            ...newPokemon,
            types: newPokemon.types.filter(t => t !== e.target.value)
        })
    } 

    const handleSubmit = async (e) => {
        e.preventDefault();
        newPokemon.name = newPokemon.name.trim();
        valid = newPokemon.name !== '' ? valid : false
        validForm = newPokemon.name === '' || !newPokemon.types.length ?  false : existente ? valid : !invalid
        if(validForm === true && !pokemonExistent){
            dispatch(postPokemon(newPokemon))
            navigate('/home') 
        } else if(validForm === true && pokemonExistent){
            dispatch(updatePokemon(newPokemon))
            navigate(`/details/${pokemonExistent.id}`)
        }else{
            setError(true)
        }
        
    }
    newPokemon.types.length ? validTypes = true : validTypes = false 
    return (
        <Container>
            <TarjetaD>
                {!loading ? <>
                <form style={{'width':'60%', 'display':'flex','flexWrap':'wrap', 'justifyContent':'center'}} onSubmit={handleSubmit}>
                    <h1>{pokemonExistent ? 'Modificar Pokemon' : 'Crear Pokemon'}</h1>
                    <Input 
                        label='Nombre'
                        name='name'
                        value={newPokemon.name}
                        flag={valid}
                        invalid={invalid}
                        existente={existente}
                        onChange={handleChange}
                    />
                    <Input 
                        label='Fuerza'
                        name='strength'
                        type='range'
                        value={newPokemon.strength}
                        onChange={handleChange}
                    />
                    <Input 
                        label='Velocidad'
                        name='speed'
                        type='range'
                        value={newPokemon.speed}
                        onChange={handleChange}
                    />
                    <Input 
                        label='Defensa'
                        name='defense'
                        type='range'
                        value={newPokemon.defense}
                        onChange={handleChange}
                    />
                    <Input 
                        label='Vida'
                        name='health'
                        type='range'
                        value={newPokemon.health}
                        onChange={handleChange}
                    />
                    <Input 
                        label='Peso'
                        name='weight'
                        type='range'
                        value={newPokemon.weight}
                        onChange={handleChange}
                    />
                    <Input 
                        label='Altura'
                        name='height'
                        type='range'
                        value={newPokemon.height}
                        onChange={handleChange}
                    />
                    <Input 
                        label='Imagen'
                        name='image'
                        value={newPokemon.image}
                        onChange={handleChange}
                    />
                    
                    <br></br>
                    <Selector 
                        label='Tipo'
                        name='types'
                        types={types}
                        valid={validTypes}
                        onClick={handleTypes}
                    />

                    <br></br>
                    <div style={{ 'width': '50%', 'display':'inline-flex', 'justifyContent': 'center', 'alignItems': 'center'} }>
                        {newPokemon.types.length ? <div><ul /* style={{'width':'50%'} */ >{
                                                        newPokemon.types.map(t => (
                                                            <div key={t} style={{'display':'inline-flex', 'justifyContent':'space-between', 'width':'100%'}}>
                                                            <li >{t}</li>
                                                            <Eliminar value={t} onClick={handleEliminar}>x</Eliminar>
                                                            </div>
                                                        ))
                                                        }</ul></div> : null}
                    </div>
                    <div style={{'display': 'flex', 'marginBottom':'10px','alignItems': 'center', 'justifyContent':'space-between', 'width':'80%'}}>
                    <Link to='/home'><Mod>Volver</Mod></Link>
                    <ButtonAc  valid={valid} validTypes={validTypes} type='submit'>{pokemonExistent ? 'Modificar' : 'Crear'}</ButtonAc>
                    </div>
                </form> {error ? <Error error={setError}></Error> : null} 
                </> : <Charging /> }
            </TarjetaD>
        </Container>
    )
}

export default Pokemon