import { Link, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import Details from './components/Details';
import Pokemon from './components/Pokemon'

function App() {
  

  return (
    <div style={{'height': '100%'}}>
      <Routes>
        <Route exact path='/' element={<LandingPage/>}/>
        <Route path='/home' element={<Home />}/>  
        <Route path='/details/:id' element={<Details />} />
        <Route path='/create' element={<Pokemon />} />
      </Routes>
    </div>
  );
}

export default App;
