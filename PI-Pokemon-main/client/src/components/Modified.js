import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getPokemonById } from '../actions'
import Pokemon from './Pokemon'

const Modified = () => {
    const { pokemon } = useSelector(state => state)
    const params = useParams() 
    const dispatch = useDispatch()

    let p = pokemon[0]
    useEffect(() => {
        dispatch(getPokemonById(params.id))
    }, [])

    return (
        <div>
            {p ? <Pokemon pokemonExistent={p}/>  : null}
        </div>
    )
}

export default Modified