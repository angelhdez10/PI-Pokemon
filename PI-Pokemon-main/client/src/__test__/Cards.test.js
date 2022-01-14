import { Link } from "react-router-dom";
import { configure, shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import Card, { FrontCard, BackCard } from '../components/Card'


configure({ adapter: new Adapter() });

const pokemon = {
    id : 4,
    name: 'charmander',
    strength: 52,
    defense: 43,
    health: 39,
    speed: 65,
    height: 6,
    weight:  85,
    types: ['fire', 'shadow', 'grass']
}

describe('<Header />', () => {
    let card = shallow(<Card pokemon={pokemon}/>)
    it('Debe de renderizar un link', () => {
        expect(card.find(Link).length).toBe(1)
    })
    it('Debe renderizar un img', () => {
        expect(card.find('img')).toHaveLength(1)
    })
    it('Debe de renderizar 2 labels',() => {
        expect(card.find('label').length).toBe(2)
    })
    it('Debe de renderizar 1 span',() => {
        expect(card.find('span').length).toBe(1)
    })

    it('Debe de contener una lista con los tipos', () => {
        expect(card.find('ul').length).toBe(1)
        expect(card.find('li').length).toBe(3)
    })

    it('Debe de renderizar tanto el Front como el Back de la carta', () => {
        expect(card.find(FrontCard).length).toBe(1)
        expect(card.find(BackCard).length).toBe(1)
    })

    it('BackCard debe tener la clase back', () => {
       expect(card.find(BackCard).at(0).prop('className')).toBe('back')
    })

    it('El link debe de llevarme al detalle de mi pokemon', () => {
        expect(card.find(Link).at(0).prop('to')).toBe('/details/4')
    })


})