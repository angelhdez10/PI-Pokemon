import styled from 'styled-components'

const Pagina = styled.button`
    height: 25px;
    width: 25px;
    cursor: pointer;
    background-color: ${props => ( props.actual === props.numero ? '#ffff': '#ffffff10') };    
`

const Paginado = ({paginas, actual, changePage}) => {
    let numero = []

    for (let x = 1; x <= paginas; x++){
        numero.push(x)
    }
    
    return (    
        <div style={{'marginTop': '10px'}}>
            {numero?.map(p => (
                <Pagina key={p} onClick={() => changePage(p)} numero={p} actual={actual} >{p}</Pagina>
            ))}
        </div>
    )
}

export default Paginado