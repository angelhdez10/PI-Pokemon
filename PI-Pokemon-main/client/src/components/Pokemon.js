import { useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { TarjetaD, Container } from "./Details"
import Button from '../styled/Button'
import Input from './Input'
import Selector from './Selector'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { postPokemon } from '../actions'

let flag = true;

const Eliminar = styled.button`
    height: 5px;
    width: 5px;
    border-radius: 14px;
    background-color: red;
    color: white;
    cursor: pointer
`

const ButtonAc = styled(Button)`
    disabled: ${props => props.disabled ? true : false}
`



const Pokemon = () => {
    const { types } = useSelector(state => state)
    const dispatch = useDispatch()
    const [newPokemon, setNewPokemon] = useState({
        name: '',
        strength: 50,
        speed: 50,
        defense: 50,
        health: 50,
        weight: 25,
        height: 75,
        image: '',
        types: []
    })

    const handleTypes = (e) => {
        if(e.target.name === 'types'){
            setNewPokemon({
                ...newPokemon,
                [e.target.name]: !newPokemon.types.includes(e.target.value) ? [...newPokemon.types, e.target.value] : newPokemon.types
            })
        }
    }

    const handleChange = (e) => {
        setNewPokemon({
            ...newPokemon,
            [e.target.name] : e.target.value
        })
    }

    const handleEliminar = (e) => {
        setNewPokemon({
            ...newPokemon,
            types: newPokemon.types.filter(t => t !== e.target.value)
        })
    } 

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(postPokemon(newPokemon))
    }

    newPokemon.name !== '' && newPokemon.types.length ? flag=false : flag = true
    return (
        <Container>
            <TarjetaD>
                <form onSubmit={handleSubmit}>
                    <h1>Crear Pokemon</h1>
                    <Input 
                        label='Nombre'
                        name='name'
                        value={newPokemon.name}
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
                        onClick={handleTypes}
                    />

                    <br></br>
                    <div style={{ 'width': '100%', 'display':'flex', 'justifyContent': 'center'} }>
                        {newPokemon.types.length ? <ul>{
                                                        newPokemon.types.map(t => (
                                                            <div style={{'display':'inline-flex', 'justifyContent':'spaceBetween', 'width':'100%'}}>
                                                            <li key={t}>{t}</li>
                                                            <Eliminar value={t} onClick={handleEliminar}>x</Eliminar>
                                                            </div>
                                                        ))
                                                        }</ul> : null}
                    </div>
                    <div style={{'display': 'flex', 'marginBottom':'10px', 'justifyContent':'space-around', 'width':'80%'}}>
                    <Link to='/home'><button>Volver</button></Link>
                    <ButtonAc disabled={flag} type='submit'>Crear</ButtonAc>
                    </div>
                </form>
            </TarjetaD>
        </Container>
    )
}

export default Pokemon