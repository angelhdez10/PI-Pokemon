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

const Wrapper = styled.div`
    position: relative;
    overflow: hidden;
`

export const Validation = styled.div`
    font-size: 15px;
    position: absolute;
    top: 20%;
    right: 0.2rem;
    transform: ${props => props.flag ? 'translate(5rem, -50%)' : 'translate(0, -20%)'};
    opacity: ${props => props.flag ? 0 : 1};
    color: #0f0f0f;
    transition: all 0.35s;
`

const InVal = styled.input`
    backgorund-color: #212121;
    width: 10rem;
    height: 1.2rem;
    padding: 0 0.5rem;
    border-radius: 0.25rem;
    border: 2px solid #585858;
    color: #0f0f0f;
    outline: none;
    border-color: ${props => props.flag  ? '#55d688' : '#fd4444'}
`

const Input = ({label, name,value, onChange, type, ...props}) => {
    return (
        <Container>
            <label>{label}</label>
            {type === 'range' ? <div><span>{value}</span> <input 
                                                                type='range'
                                                                value={value} 
                                                                name={name} 
                                                                min={1} 
                                                                max={name === 'height' ? 20 : name === 'weight' ? 1000 : 200 } 
                                                                onChange={onChange}>
                                                                </input></div>: 
            name === 'name' ?
            <Wrapper> 
            <InVal value={value} name={name}  flag={props.flag}  placeholder={label + '...'} onChange={onChange} ></InVal>
            <Validation flag={props.flag}>{props.invalid ? 'Invalid' : 'Required'}</Validation>
            </Wrapper> :
            <input value={value} name={name} placeholder={label + '...'} onChange={onChange} ></input>
            }
           
        </Container>
    )
}

export default Input;
/* 
<input style={{'width':'25px'}} value={value} name={name} onChange={onChange} max={name === 'height' ? 20 : 200}> </input>   input para controlar la barra */