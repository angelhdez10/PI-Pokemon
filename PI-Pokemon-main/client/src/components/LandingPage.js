import styled from 'styled-components'
import image from '../landing.png' 
import { Link } from 'react-router-dom'
import Button from '../styled/Button'
import poke from '../pokeball.png'

const Tarjeta = styled.div`
    height: inherit;
    background-image: url(${image});
    background-size: cover;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-family: 'Bebas Neue', cursive;
    font-family: 'Lato', sans-serif;
    


    a{
        text-decoration: none;
    }

    a:active, a:visited{
        color: black;
    }    

    img:hover{
        animation: pokeball 2s infinite;



        @keyframes pokeball{
            0% {
                transform: translateX(0px) rotateZ(0deg);
            }
            25% {
                transform: translateX(10px) rotateZ(15deg);
            }
            50% {
                transform: translateX(-10px) rotateZ(-15deg);
            }
            75% {
                transform: translateX(10px) rotateZ(15deg);
            }
            100% {
                transform: translateX(0px) rotateZ(0deg);
            }
        }
    }

    
`

const ButtonI = styled.button`
    border: none;
    background-color: #ffffff00;
    cursor: pointer;
`


const LandingPage = () => {
    return(
        <Tarjeta>
            {/* <Link to='/home'><h1>Ingresar</h1></Link> */}
            {/* <Link to='/home'><img src={poke} height={'150px'} /></Link> */}
            <Link to='/home'><ButtonI><img src={poke} height={'150px'}/></ButtonI></Link>
            <h2>Pokemon's Api</h2>
        </Tarjeta>
    )
}

export default LandingPage