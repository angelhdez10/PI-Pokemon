import styled from "styled-components";

export const Container = styled.div`
    width: 90%;
    height: auto;
    padding: 5px;
    maring: 10px;
    display: flex;
    alignt-items: center;
    justify-content: space-between;
`

const Input = ({label, name,value, onChange, type}) => {
    return (
        <Container>
            <label>{label}</label>
            {type === 'range' ? <div><span>{value}</span> <input type='range' value={value} name={name} min={0} max={200} onChange={onChange}></input></div>:  
            <input value={value} name={name} placeholder={label + '...'} onChange={onChange}></input> }
           
        </Container>
    )
}

export default Input;