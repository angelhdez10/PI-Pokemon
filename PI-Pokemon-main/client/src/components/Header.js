import Bar from "../styled/Bar"
import Search from "./Search"
import { Link } from "react-router-dom"
import Button from '../styled/Button'


const Header = () => {
    return (
        <Bar>
            <Link to={'/create'}><Button>Crear Pokemon</Button></Link>
            <Search />
        </Bar>
    )
}

export default Header