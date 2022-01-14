import styled from "styled-components"
import Button from "../styled/Button"
import { useState } from "react"
import { useDispatch } from 'react-redux'
import { getPokemon } from "../actions"
import icono from '../buscar.png'

const Busqueda = styled.div`
    filter: none;
    display: inline-flex;
    flex-direction: row;
    justify-content: space-between;
    
    input{
        transition: all 0.8s ease;
        opacity: 0;
        width: 0%;
        border-radius: 25px;
        outline: none;
        border: none;
        text-align: center;
    }

    &:hover{
        input{
           transition: all 0.8s ease;
           width: 100%;
           opacity:1;
           /* border-radius: 25px;
           outline: none;
           border: none; */
        }    

    }
    
    input:focus {
        width: 100%;
        opacity:1;
       /*  border-radius: 25px;
        outline: none;
        border: none; */
    }
`

const Search = () => {
    const [pokemon, setPokemon] = useState('')
    const dispatch = useDispatch()

    const handleChange = (e) => {
        setPokemon(e.target.value)
    }

    const handleClick = (e) => {
        dispatch(getPokemon(pokemon))
        setPokemon('')
    }

    const handleEnter = (e) => {
       if(e.keyCode === 13){
        dispatch(getPokemon(pokemon))
        setPokemon('')
       } 
    }
    
    return (
        <Busqueda>
            <input onKeyDown={handleEnter} value={pokemon} /* placeholder={'Buscar'} */ onChange={handleChange}></input>
            <Button onClick={handleClick} ><img src={icono} height={`20px`} width={`20px`} /></Button>
        </Busqueda>
    )
}

export default Search