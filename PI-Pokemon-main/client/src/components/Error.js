import styled from 'styled-components'
import Button from '../styled/Button'


const Back = styled.div`
    height: 100%;
    width: 100%;
    z-index: 100;
    background-color: #00000010;
    position: fixed;
    top: 0;
    left: 0;
    opacity: 1;
`

const Front = styled.div`
    opacity: no-inherit;
    background-color: #ffffff;
    height: auto;
    width: 250px;
    margin: auto;
    border-radius: 14px;
    margin-top: ${window.innerHeight/2-50}px;
    color: black;
    text-align: center;
    
`

const Error = ({error}) => {
    return (
        <Back>
            <Front>
                <label>Formulario no valido</label>
                <br></br>
                <Button onClick={() => error(false)}>Aceptar</Button>
            </Front>
        </Back>
    )
}

export default Error