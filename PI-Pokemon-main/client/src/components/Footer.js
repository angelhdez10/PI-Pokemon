import styled from "styled-components"

const Wrapper = styled.div`
    border-top: solid 1px #333;
    margin: auto;
    width: 80%;
    background-color: #212121;
    display: flex;
    justify-content: center;
    align-items: center;

    ul{
        list-decoration: none;
    }
`

const Footer = () => {
    return (
        <Wrapper>
            <ul>
                <li><a href='https://github.com/angelhdez10'>Github</a></li>
            </ul>
        </Wrapper>
    )
}

export default Footer