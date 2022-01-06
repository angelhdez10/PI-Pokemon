import Bar from "../styled/Bar"
import Search from "./Search"
import { Link } from "react-router-dom"
import Button from '../styled/Button'
import Filtros from './Filtros'

const Header = () => {
    return (
        <Bar>
            <Link to={'/create'}><Button>Crear Pokemon</Button></Link>
            <Filtros />
            <Search />
        </Bar>
    )
}

export default Header