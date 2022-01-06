import {Container} from './Input'

const Selector = ({label, types, name, onClick}) => {
    
    return(
        <Container>
            <label>{label}</label>
            <select name={name} onChange={onClick}>
                {types.map(t => (
                    <option key={t.id} value={t.name}>{t.name}</option>
                ))}
            </select>
        </Container>
    )
}

export default Selector