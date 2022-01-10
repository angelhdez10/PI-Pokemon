import Tarjeta from '../styled/Tarjeta'
import styled from 'styled-components'
import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { cleanPokemon, getPokemonById } from '../actions'
import Button from '../styled/Button'
import { Eliminar } from './Pokemon'


export const Statics = styled.div`
    width: 90%;
    height: auto;
    padding: 5px;
    maring: 10px;
    display: inline-flex;
    alignt-items: center;
    justify-content: space-between;
`

export const Container = styled.div`
    width: inherit;
    height: inherit;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

export const Total = styled.div`
    width:70%;
    height: 5px;
    border-radius:5px;
    background-color: white;
`

const Borrar = styled(Eliminar)`
    position: absolute;
    right: 5px;
    top: 5px;
`

export const Porcentaje = styled.div` 
    height: inherit;
    border-radius:5px;
    width: ${props => props.width}%;
    animation-name: carga;
    animation-duration: 2s;
    background-color: blue;
    
    @keyframes carga{
        0% {
            width:0%;
        }
        50% {
            width: ${props => props.width}%;
        }
        
    }

`


export const TarjetaD = styled(Tarjeta)`
    position: relative;
    display: flex;
    width:480px;
    height: auto;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    /* margin: auto; */
    background-color: #212121;
    color: #eee;
`

const Details = () => {
    const params = useParams()
    const { pokemon } = useSelector(state => state)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getPokemonById(params.id))
    }, [])
    let p = pokemon[0];
    const por = 100 / 200

    const handleDelete = (e) => {
        e.preventDefault()
        if(window.confirm('Estas seguro de borrar el registro?')){
            alert('Registro Borrado')
        }
        else{
            console.log('gay')
        }
    }

    return (
        <Container>
            { p ?
            <TarjetaD>
                <Borrar onClick={handleDelete}>x</Borrar>
                <h1>{p.id}</h1>
                <img src={p.image} alt='Not found'/>
                <h1>{p.name}</h1>
                <Statics>
                    <label>Fuerza</label> <span>{p.strength}</span>
                    <Total>
                        <Porcentaje width={p.strength * por}/>
                    </Total>
                </Statics>
                <Statics>
                    <label>Defensa</label> <span>{p.defense}</span>
                    <Total>
                        <Porcentaje width={p.defense * por }/>
                    </Total>
                </Statics>
                <Statics>
                    <label>Vida</label> <span>{p.health}</span>
                    <Total>
                        <Porcentaje width={p.health * por}/>
                    </Total>
                </Statics>
                <Statics>
                    <label>Velocidad</label> <span>{p.speed}</span>
                    <Total>
                        <Porcentaje width={p.speed * por }/>
                    </Total>
                </Statics>
                <Statics>
                    <label>Altura</label> <span>{p.height}</span>
                    <Total>
                        <Porcentaje width={p.height * por *10}/>
                    </Total>
                </Statics>
                <Statics>
                    <label>Peso</label> <span>{p.weight}</span>
                    <Total>
                        <Porcentaje width={p.weight * por *0.2}/>
                    </Total>
                </Statics>
               <label>Types:</label>
                <ul>{!p.created ? p.types.map(t =>  <li key={t}>{t}</li>) : p.types.map(t =>  <li key={t.name}>{t.name}</li>)}</ul>
                {p.hasOwnProperty('created') ? <Link to={`/modified/${p.id}`}><button>Modifed</button></Link> : null} <Link to='/home'><Button onClick={() => dispatch(cleanPokemon())}>Home</Button></Link>
            </TarjetaD>
             
            : <div>Waiting</div>} 
            
           
        </Container>
    )
}

export default Details