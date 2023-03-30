import '../style/profilePage.scss';
import SummonerPage from './SummonerPage';
import {Route,Routes} from 'react-router-dom';
import HomePage from './HomePage';
import NavBar from '../components/NavBar';



function App() {
  
  return (
    <div className="App">
      <NavBar/>
      <Routes>
        <Route path='/' element={<HomePage/>}></Route>
        <Route path='/profile/:profile' element={<SummonerPage/>}></Route>
      </Routes>

    </div>
  );
}

export default App;
