import Bar from "../styled/Bar"
import Search from "./Search"
import { Link } from "react-router-dom"
import Button from '../styled/Button'
import styled from 'styled-components'


const Header = () => {
    return (
        <Bar>
            <Link to={'/create'}><Button style={{'height': '25px'}}>Crear Pokemon</Button></Link>
            <Search />
        </Bar>
    )
}

export default Header