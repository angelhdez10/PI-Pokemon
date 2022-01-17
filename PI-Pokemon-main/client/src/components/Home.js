import Container from "../styled/Container"
import Header from './Header'
import Cards from "./Cards"
import Paginado from './Paginado'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getPokemons, getTypes } from '../actions'
import Filtros from './Filtros'
import Charging from "./Charging"
import Footer from "./Footer"




const Home = () => {
    
    const { pokemons, types, loading } = useSelector(state => state)
    const [pages, setPages] = useState({
        page: 1,
        pokemonPerPage: 12
    })
    const dispatch = useDispatch()
    const indexL = pages.page*pages.pokemonPerPage;
    const indexF = indexL - pages.pokemonPerPage;
    const paginas = Math.ceil(pokemons.length/pages.pokemonPerPage)
    const pokemonRender = pokemons.slice(indexF, indexL)

    useEffect(() => {
    
        dispatch(getPokemons())
        dispatch(getTypes())
    },[])

    useEffect(() => {
        setPages({
            ...pages,
            page: 1
        })
    }, [paginas])

    const changePage = (e) => {
        setPages({
            ...pages,
            page: e
        })
    }
    return (
        
        <Container>
            <Header />
            {loading ? <Charging /> : <>
            <Filtros />
            <Paginado paginas={paginas} actual={pages.page} changePage={changePage}/>
            <Cards pokemons={pokemonRender} />
             </>}{/* 
            <Filtros />
            <Paginado paginas={paginas} actual={pages.page} changePage={changePage}/>
            <Cards pokemons={pokemonRender} /> */}
        </Container>
    )
}

export default Home