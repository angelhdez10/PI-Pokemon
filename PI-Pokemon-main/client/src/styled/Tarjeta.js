import styled from 'styled-components'

export const TarjetaM =styled.div`
    width: 95%;
    height:80%;
    position:relative;
    top: 10px;
    transition: -webkit-transform 0.8s ease;
    -webkit-transform-style: preserve-3d;
    transform-style: preserve-3d;
    background-color: #00000011;
    border-radius: 4px 4px 4px 4px;
    div{
        position: absolute;
        backface-visibility: hidden;
    }

    &:hover {
        -webkit-transform: rotateY(0.5turn);
        transform: rotateY(0.5turn)
    }
`

const Tarjeta = styled.div`
    width: 180px;
    height: 280px;
    margin: 10px 5px 10px 5px;
    background-color: #485461;
    background-image: linear-gradient(315deg, #485461 0%, #28313b 74%);
    border-radius: 14px;
    display: flex;
    flex-direction: column;
    align-items:center;
    justify-content: space-around;
    
      
    a {
        text-decoration: none;
        color: #000;
    }
`

export default Tarjeta