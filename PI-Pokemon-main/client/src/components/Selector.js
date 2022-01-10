import {Container, Validation} from './Input'
import styled from 'styled-components'

const VAlidate = styled.div`
    opacity: ${props => props.flag ? 0 : 1};
`



const Selector = ({label, types, name, onClick, valid}) => {
    return(
        <Container>
            <label>{label}</label>
            {valid ? null : <div flag={valid}>Required*</div> }
            <select name={name} onChange={onClick}>
                {types.map(t => (
                    <option key={t.id} value={t.name}>{t.name}</option>
                ))}
            </select>
        </Container>
    )
}

export default Selector