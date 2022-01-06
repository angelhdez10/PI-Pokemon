import styled from "styled-components"
import Button from "../styled/Button"
import { useState } from "react"
import { useDispatch } from 'react-redux'
import { getPokemon } from "../actions"

const Busqueda = styled.div`
    filter: none;
    display: inline-flex;
    flex-direction: row;
    justify-content: space-between;
`

const Search = () => {
    const [pokemon, setPokemon] = useState('')
    const dispatch = useDispatch()

    const handleChange = (e) => {
        setPokemon(e.target.value)
    }

    const handleClick = (e) => {
        dispatch(getPokemon(pokemon))
    }

    return (
        <Busqueda>
            <input value={pokemon} placeholder={'Buscar'} onChange={handleChange}></input>
            <Button onClick={handleClick} >Buscar</Button>
        </Busqueda>
    )
}

export default Search