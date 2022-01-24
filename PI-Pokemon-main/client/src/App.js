import { Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import Details from './components/Details';
import Pokemon from './components/Pokemon'
import Modified from './components/Modified'
import RouteWrong from './components/RouteWrong';
import Footer from './components/Footer';
import Form from './components/Form'

function App() {
  

  return (
    <div style={{'height': '100%'}}>
      <Routes>
        <Route exact path='/' element={<LandingPage/>}/>
        <Route path='/home' element={<Home />}/>  
        <Route path='/details/:id' element={<Details />} />
        <Route path='/create' element={<Pokemon />} />
        <Route path='/modified/:id' element={<Modified/>} />
        <Route path='*' element={<RouteWrong/>} />
      </Routes>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
