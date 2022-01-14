const { Pokemon, conn } = require('../../src/db.js');
const { expect } = require('chai');

const pokemon2 = {
  name: 'Onix',
  strength: 10,
  speed: 1,
  height: 20,
  weight: 15,
  image: 'prueba',
  defense: 10,
  health: 60
} 

describe('Pokemon model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Pokemon.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null',   (done) => {
        const pokemon =  Pokemon.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', async () => {
        const pokemon = await Pokemon.create({ name: 'Pikachu' });
        expect(pokemon.name).equals('Pikachu')
      });
      it('add statics by default', async ()=> {
        const pokemon = await Pokemon.create({name: 'ivy'})
        expect(pokemon.name).equals('ivy')
        expect(pokemon.strength).equals(50)
        expect(pokemon.speed).equals(50)
        expect(pokemon.defense).equals(50)
        expect(pokemon.height).equals(10)
        expect(pokemon.weight).equals(25)
        expect(pokemon.image).equals(null)
        expect(pokemon.created).equals(true)
      })
      it('add statics correctly', async () => {
        const pokemon = await Pokemon.create(pokemon2)
        expect(pokemon.name).equals(pokemon2.name)
        expect(pokemon.strength).equals(pokemon2.strength)
        expect(pokemon.speed).equals(pokemon2.speed)
        expect(pokemon.defense).equals(pokemon2.defense)
        expect(pokemon.height).equals(pokemon2.height)
        expect(pokemon.weight).equals(pokemon2.weight)
        expect(pokemon.image).equals(pokemon2.image)
        expect(pokemon.created).equals(true)

      })
    });
  });
});
