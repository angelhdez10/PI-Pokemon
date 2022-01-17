import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Contenedor = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #ffffff10;
`

const Message = styled.div`
    height: 150px;
    width: 150px;
    border-radius: 14px;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const Button = styled.button`
    background-color: #0225f9;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover{
        background-color: #0003D7;
    }
`

const RouteWrong = () => {
    return (
        <Contenedor>
           <Message>
                No existe la ruta
                <Link to={'/'}><Button>Inicio</Button></Link>
            </Message>
        </Contenedor>
        )
}

export default RouteWrong;