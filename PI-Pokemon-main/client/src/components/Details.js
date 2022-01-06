import Tarjeta from '../styled/Tarjeta'
import styled from 'styled-components'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getPokemonById } from '../actions'

export const Container = styled.div`
    width: inherit;
    height: inherit;
    display: flex;
    align-items: center;
`

export const TarjetaD = styled(Tarjeta)`
    display: flex;
    height: auto;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: auto;
    background-color: #212121;
`

const Details = () => {
    const params = useParams()
    const { pokemon } = useSelector(state => state)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getPokemonById(params.id))
    }, [])
    let p = pokemon[0];
    console.log(p)
    return (
        <Container>
            { p ?
            <TarjetaD>
                <img src={p.image} alt='Not found'/>
                <div>{p.name}</div>
                <h2>{p.strength}</h2>
                <h2>{p.defense}</h2>
                <h2>{p.health}</h2>
                <h2>{p.height}</h2>
                <h2>{p.speed}</h2>
                <h2>{p.id}</h2>
                <ul>{p.types.map(t =>  <li key={t}>{t}</li>)}</ul>
            </TarjetaD>
            : <div>Waiting</div>} 
        </Container>
    )
}

export default Details