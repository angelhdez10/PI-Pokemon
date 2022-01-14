import { render, screen } from '@testing-library/react';
import Selector from './components/Selector'


const types = [
  {
      "id": 1,
      "name": "normal"
  },
  {
      "id": 2,
      "name": "flying"
  },
  {
      "id": 3,
      "name": "poison"
  },
  {
      "id": 4,
      "name": "rock"
  },
  {
      "id": 5,
      "name": "fighting"
  },
  {
      "id": 6,
      "name": "ground"
  },
  {
      "id": 7,
      "name": "bug"
  },
  {
      "id": 8,
      "name": "ghost"
  },
  {
      "id": 9,
      "name": "steel"
  },
  {
      "id": 10,
      "name": "fire"
  },
  {
      "id": 11,
      "name": "water"
  },
  {
      "id": 12,
      "name": "grass"
  },
  {
      "id": 13,
      "name": "electric"
  },
  {
      "id": 14,
      "name": "psychic"
  },
  {
      "id": 15,
      "name": "ice"
  },
  {
      "id": 16,
      "name": "dragon"
  },
  {
      "id": 17,
      "name": "dark"
  },
  {
      "id": 18,
      "name": "fairy"
  },
  {
      "id": 19,
      "name": "shadow"
  },
  {
      "id": 20,
      "name": "unknown"
  }
]


test('renders a Selector with all the types like options', () => {
    render(<Selector types={types}/>);
    let numero = document.getElementsByTagName("option")
    expect(numero).toHaveLength(20)
});

test('it renders a label with the name types' , () => {
  render(<Selector types={types}/>);
  let texto = document.getElementsByTagName("label").length
  expect(texto).toEqual(1)
})


