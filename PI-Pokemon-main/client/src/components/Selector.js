import {Container, Validation} from './Input'
import styled from 'styled-components'

const Validate = styled.div`
    opacity: 1;
`



const Selector = ({label, types, name, onClick, valid}) => {
    return(
        <Container>
            <label>{label}</label>
            {valid ? null : <Validate >Required*</Validate> }
            <select name={name} onChange={onClick}>
                {types.map(t => (
                    <option key={t.id} value={t.name}>{t.name}</option>
                ))}
            </select>
        </Container>
    )
}

export default Selector