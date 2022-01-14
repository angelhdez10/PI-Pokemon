import Tarjeta, {TarjetaM} from '../styled/Tarjeta'
import { Link } from 'react-router-dom'
import  Button  from '../styled/Button'
import styled from 'styled-components'
import pokeball from '../pokeball.png'


export const FrontCard = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: transform 0.8s ease;
    transform-style: preserve-3d;
    img{
        position: relative;
        top: -40px;
        margin-bottom: 0px;
    }
    label{
        position: relative;
        top: -35px;
    }
`
export const BackCard = styled(FrontCard)`
    display: flex;
    justify-content: space-between;
    align-items: space-between;
    transition: transform 0.8s ease;
    transform: rotateY(180deg);
    ul{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    
`


const Card = ({ pokemon }) => {
    return ( 
       
        <Tarjeta>
           
             <TarjetaM> 
                <FrontCard className={'front'}>
                    <img src={pokemon.image ? pokemon.image : pokeball} alt={'Not Found'} height='100px'/>
                    <label>{pokemon.name}</label>
                    <label>{pokemon.strength}</label>
                </FrontCard>
                <BackCard className={'back'}>
                    <span>Types:</span> 
                    <ul> {!pokemon.created ? pokemon.types.map(t => <li key={t}>{t}</li>) : pokemon.types.map(t => <li key={t.name}>{t.name}</li>)} </ul>
                   
                    <Link to={`/details/${pokemon.id}`}><Button>Details</Button></Link>
                </BackCard>
            </TarjetaM>
            
        </Tarjeta>
        
    )
}

export default Card

/* /* /* <span>Types:</span> */
                /* <ul> {!pokemon.created ? pokemon.types.map(t => <li key={t}>{t}</li>) : pokemon.types.map(t => <li key={t.name}>{t.name}</li>)} </ul> */ 