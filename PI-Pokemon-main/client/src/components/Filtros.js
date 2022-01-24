import styled from 'styled-components'
import Filtro from './Filtro'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useState, useRef } from 'react'
import { filtrado } from '../actions'

const Div = styled.div`
    background-color: #00000000;
    display:flex;
    justify-content: space-between;
    width: 90%;
    margin-bottom: 5px;

    select {
        background-color: #eee;
        border: none;
        outline: none;
        cursor: pointer;
        z-index: 1;
        transition: all 0.3s ease;
    }

    select:-ms-expand{
        display: none;
    }

    select:hover {
        background-color: #0900FD;
        
    }
    select > option {
        background-color: white;
        box-shadow: 1px 2px rgb(0,0,0);
    }
    
`

const Reset = styled.button`
    border: none;
    border-radius: 4px;
    background-color: #eee;
    cursor: pointer;

    &:hover{
        background-color: #bbb;
    }
    
`

const Filtros = () => {
    const refO = useRef(null);
    const refT = useRef(null);
    const refC = useRef(null);
    const types = useSelector(state => state.types)
    const dispatch = useDispatch()
    const [filtro, setFiltro] = useState({
        ordenar: 'All',
        tipo: 'All',
        creado: 'All',
    })

    useEffect(() => {
        dispatch(filtrado(filtro))
    }, [filtro])

    const handleChange = (e) => {
        setFiltro({
            ...filtro,
            [e.target.name] : e.target.value
        })
    }   

    const handleReset = () => {
        refO.current.value = 'All'
        refC.current.value = 'All'
        refT.current.value = 'All'
        setFiltro({
            ordenar: 'All',
            tipo: 'All',
            creado: 'All',
        })
    }

    return (
        <>
        <Div>
            <Filtro 
                label={'Ordernar'} 
                name='ordenar'
                All='All' 
                asc='Ascendente' 
                desc='descendente' 
                more='Powerfull'
                less='Weakness'
                ref={refO}
                onChange={handleChange} 
            />
            <Filtro 
                label='Tipo'
                name='tipo'
                All='All'
                types={types}
                ref={refT}
                onChange={handleChange}
                />
            <Filtro 
                label={'Creado'} 
                name='creado'
                All='All'
                api='Api'
                db='Creado'
                ref={refC}
                onChange={handleChange}
                />
        </Div>
        <Reset onClick={handleReset}>Reset</Reset>
        </>
    )
}

export default Filtros
