import styled from 'styled-components'
import Filtro from './Filtro'
import { useSelector, useDispatch } from 'react-redux'
import { filtrado, orderBy, createdPok } from '../actions'

const Div = styled.div`
    background-color: #00000010;
    display:flex;
    justify-content: space-between;
    width: 100%;
`


const Filtros = () => {
    const types = useSelector(state => state.types)
    const dispatch = useDispatch()
    /* const [filtro, setFiltro] = useState({
        ordenar: 'seleccionar',
        tipo: 'seleccionar',
        creado: 'seleccionar',
    }) */

    const handleType = (e) => {
        dispatch(filtrado(e.target.value))
    }

    const handleSort = (e) => {
        dispatch(orderBy(e.target.value))
        console.log(e.target.value)
    }

    const handleCreated = (e) => {
        dispatch(createdPok(e.target.value))
    }

   
    
    
    return ( 
        <Div>
            <Filtro 
                label={'Ordernar'} 
                name='ordenar'
                seleccionar='--seleccionar--' 
                asc='Ascendente' 
                desc='descendente' 
                more='Powerfull'
                less='Weakness'
                onChange={handleSort} 
            />
            <Filtro 
                label='Tipo'
                name='tipo'
                seleccionar='seleccionar'
                types={types}
                onChange={handleType}
                />
            <Filtro 
                label={'Creado'} 
                name='creado'
                seleccionar='--seleccionar--'
                api='Api'
                db='Creado'
                onChange={handleCreated}
                />
        </Div>
    )
}

export default Filtros