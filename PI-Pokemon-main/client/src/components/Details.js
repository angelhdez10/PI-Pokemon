import Tarjeta from '../styled/Tarjeta'
import styled from 'styled-components'
import { useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { cleanPokemon, deletePokemon, getPokemonById } from '../actions'
import Button from '../styled/Button'
import { Eliminar } from './Pokemon'
import image from '../pokeball.png'
import Charging from './Charging'


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

    label {
        width: 15%;
    }

    span{
        text-align:center;
        width: 15%;
    }

    img:hover{
        transition: all 1s ease;
        transform: scale(1.3);
    }

    img{
        transition: all 1s ease;
        transform: scale(1);
    }
`

export const Mod = styled.button`
    cursor: pointer;
    border: none;
    border-radius: 15px;
    background-color: #3979e5;
    color: white;
    height: 25px;
`

const Details = () => {
    const params = useParams();
    const navigate = useNavigate()
    const { pokemon } = useSelector(state => state)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getPokemonById(params.id))
    },[])
    let p = pokemon[0];
    const por = 100 / 200

    const handleDelete = (e) => {
        e.preventDefault()
        if(window.confirm('Estas seguro de borrar el registro?')){
            dispatch(deletePokemon(p.id))
            alert('Registro Borrado')
            navigate('/home')
        }
    }

    return (
        <Container>
            { p ?
            <TarjetaD>
                {p.created ? <Borrar onClick={handleDelete}>x</Borrar> : null}
                <h1>{p.id}</h1>
                <img src={p.image ? p.image : image} alt='Not found'  height={!p.image ? '100px' : p.image}/>
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
                {p.hasOwnProperty('created') ? <Link to={`/modified/${p.id}`}><Mod>Modify</Mod></Link> : null} <Link to='/home'><Button onClick={() => dispatch(cleanPokemon())}>Home</Button></Link>
            </TarjetaD>
             
            : <Charging />} 
            
           
        </Container>
    )
}

export default Details