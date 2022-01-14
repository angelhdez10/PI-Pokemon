import styled from 'styled-components'

const DivContenedor = styled.div`  
    height: 100%;
    width: 100%;
    margin: auto;
`

const DivLoader = styled.div`
    &:before,
    &:after,
    & {
        border-radius: 50%;
        width: 2.5em;
        height: 2.5em;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
        -webkit-animation: load 1.8s infinite ease-in-out;
        animation: load 1.8s infinite ease-in-out;
    }

    & {
        margin: 8em auto;
        font-size: 10px;
        position: relative;
        text-indent: -9999em;
        -webkit-animation-delay: 0.16s;
        animation-delay: 0.16s;
    }

    &:before {
        left: -3.5em;
    }

    &:after {
        left: 3.5em;
        -webkit-animation-delay: 0.32s;
        animation-delay: 0.32s;
    }

    &:before,
    &:after {
        content: '';
        position: absolute;
        top: 0;
    }

    @-webkit-keyframes load {
        0%,
        80%,
        100% {
          box-shadow: 0 2.5em 0 -1.3em #ffffff;
        }
        40% {
          box-shadow: 0 2.5em 0 0 #FFF;
        }
      }

      @keyframes load {
        0%,
        80%,
        100% {
          box-shadow: 0 2.5em 0 -1.3em #ffffff;
        }
        40% {
          box-shadow: 0 2.5em 0 0 #FFF;
        }
      }
      
`

const Charging = () => {
    return (
        <DivContenedor>
           <DivLoader></DivLoader>
        </DivContenedor>
    )
}

export default Charging