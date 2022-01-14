/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');/* 
const { INET } = require('sequelize/dist'); */
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Pokemon, conn, Type } = require('../../src/db.js');

const agent = session(app);
const pokemon = {
  name: 'Onix'
};
const pokemon2 = {
  name: 'cv',
  types:['fire', 'water']
}

const pokemon3 = {
  name: 'ads',
  strength: 30,
  speed: 10,
  height: 7,
  weight: 10,
  defense: 150,
  health: 100,
  types:['shadow', 'water']
}



describe('Pokemon routes', () => {
  before(() => conn.authenticate() 
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Pokemon.sync({ force: true }).then(() => Pokemon.create(pokemon)).catch((err) => console.log(err)))
  describe('GET /pokemons', () => {
    it('should get 200 and return a JSON ', async () =>
      await agent.get('/pokemons/', done => done()).expect(200).expect('Content-Type', /application\/json/)
    );
    it('should have at least 40 results', async () =>{
      const response = await agent.get('/pokemons/')
      expect(response.body).to.have.lengthOf.above(39)
    });
  }); 

  describe('GET /pokemons?name', () => {
    it('returns a single match with the query name existent on DB', async () => {
      const response = await agent.get(`/pokemons/?name=${pokemon.name}`).expect(200).expect('Content-Type', /application\/json/)
      expect(response.body).to.have.lengthOf(1)
      expect(response.body[0].name).equals(pokemon.name) 
    });
    it('returns a single match with the query name existent on Api', async () => {
      const response = await agent.get(`/pokemons/?name=bulbasaur`).expect(200).expect('Content-Type', /application\/json/)
      expect(response.body).to.have.lengthOf(1)
      expect(response.body[0].name).equals('bulbasaur') 
    })
    it('Does not match with a name that not exists on DB and API', async () => {
      const response = await agent.get(`/pokemons/?name=pokemon`).expect(200).expect('Content-Type', /application\/json/)
      expect(response.body).to.have.lengthOf(0)
    });  
  });
  describe('GET /pokemons/:id', () => {
    it('should return a match with an id correct with all stadistics', async () => {
      const response = await agent.get(`/pokemons/${1}`).expect(200).expect('Content-Type', /application\/json/)
      expect(response.body).to.have.lengthOf(1)
      expect(response.body[0].name).equals('bulbasaur')
      expect(response.body[0]).to.have.own.property('id')
      expect(response.body[0]).to.have.own.property('health')
      expect(response.body[0]).to.have.own.property('strength')
      expect(response.body[0]).to.have.own.property('defense')
      expect(response.body[0]).to.have.own.property('speed')
      expect(response.body[0]).to.have.own.property('height')
      expect(response.body[0]).to.have.own.property('weight')
      expect(response.body[0]).to.have.own.property('image')
      expect(response.body[0]).to.have.own.property('types')
    })
    it('should return a message error', async () => {
      const response = await agent.get(`/pokemons/${65}`).expect(200).expect('Content-Type', /application\/json/)
      expect(response.body).to.have.own.property('msg')
      expect(response.body.msg).equals('Pokemon not find') 
    })
  })
  before(() => {
    Type.sync({ force : false}).then(() => agent.get('/types/'))
  })
  describe('POST /pokemons/', () => {
    it('should create a new Pokemon with default values', async () => {
      const newPokemon = await agent.post('/pokemons/').send(pokemon2)
      const all = await agent.get('/pokemons/')
      const types = all.body[all.body.length-1].types.map(t => t.name)
      expect(all.body[all.body.length-1].name).equals('cv') 
      expect(all.body[all.body.length-1].strength).equals(50)
      expect(all.body[all.body.length-1].health).equals(50)
      expect(all.body[all.body.length-1].defense).equals(50)
      expect(all.body[all.body.length-1].speed).equals(50)
      expect(all.body[all.body.length-1].height).equals(10)
      expect(all.body[all.body.length-1].weight).equals(25)
      expect(types).to.have.all.members(['fire','water'])
    })
    it('it should return a msg', async () => {
      const response = await agent.post('/pokemons/').send({types:['water']}).expect(404).expect('Content-Type', /application\/json/)
      expect(response.body).to.have.own.property('msg')
    }) 
    it('it should create a new Pokemon with the information given', async () => {
      const newPokemon = await agent.post('/pokemons/').send(pokemon3).expect(200).expect('Content-Type', /application\/json/)
      const all = await agent.get('/pokemons/')
      const types = all.body[all.body.length-1].types.map(t => t.name)
      expect(all.body[all.body.length-1].name).equals('ads') 
      expect(all.body[all.body.length-1].strength).equals(30)
      expect(all.body[all.body.length-1].health).equals(100)
      expect(all.body[all.body.length-1].defense).equals(150)
      expect(all.body[all.body.length-1].speed).equals(10)
      expect(all.body[all.body.length-1].height).equals(7)
      expect(all.body[all.body.length-1].weight).equals(10)
      expect(types).to.have.all.members(['shadow','water'])
    })

  })
});


