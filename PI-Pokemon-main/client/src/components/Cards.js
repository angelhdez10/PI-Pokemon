import styled from 'styled-components'
import Card from './Card'

const Div = styled.div`
    display: inline-flex;
    flex-wrap: wrap;
    justify-content: space-around;
    column-count: 4;
`

const Cards = ({pokemons}) => {
    
    return (    
        <Div>
            {pokemons.length !== 0 ? pokemons.map((p) => (
                <Card key={p.id} pokemon={p} />
            )) : <h1 style={{'color':'white'}}>Pokemon not found</h1>}
        </Div>
    )
}

export default Cards