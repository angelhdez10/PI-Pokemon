import Tarjeta from '../styled/Tarjeta'
import { Link } from 'react-router-dom'

const Card = ({ pokemon }) => {
    return ( 
        <Tarjeta>
            <img src={pokemon.image} alt='Not found' height='50px'/>
            <Link to={`/details/${pokemon.id}`}><h1>{pokemon.name}</h1></Link>
            <ul> {!pokemon.created ? pokemon.types.map(t => <li key={t}>{t}</li>) : pokemon.types.map(t => <li key={t.name}>{t.name}</li>)} </ul>
        </Tarjeta>
    )
}

export default Card