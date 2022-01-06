import styled from 'styled-components'
import image from '../pokemon.jpg' 
import { Link } from 'react-router-dom'
import Button from '../styled/Button'

const Tarjeta = styled.div`
    height: inherit;
    background-image: url(${image});
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
`


const LandingPage = () => {
    return(
        <Tarjeta>
            <Link to='/home'><span>Ingresar</span></Link>
        </Tarjeta>
    )
}

export default LandingPage