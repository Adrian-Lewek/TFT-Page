import '../style/profilePage.scss';
import '../style/database.scss';
import SummonerPage from './SummonerPage';
import {Route,Routes} from 'react-router-dom';
import HomePage from './HomePage';
import NavBar from '../components/NavBar';
import ChampionPage from './database/ChampionPage';

function App() {

  return (
    <div className="App">
      <NavBar/>
      <Routes>
        <Route path='/' element={<HomePage/>}></Route>
        <Route path='/profile/:region/:profile' element={<SummonerPage/>}></Route>
        <Route path='/database/:version/:champion' element={<ChampionPage/>}></Route>
      </Routes>

    </div>
  );
}

export default App;
