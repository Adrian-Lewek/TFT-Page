import '../style/profilePage.scss';
import '../style/database.scss';
import {Route,Routes} from 'react-router-dom';
import SummonerPage from './SummonerPage';
import HomePage from './HomePage';
import NavBar from '../components/NavBar';
import ChampionPage from './database/ChampionPage';
import Database from './database/Database';
function App() {
  
  return (
    <div className="App">
      <NavBar/>
      <Routes>
        {/* Home Page */}
        <Route path='/' element={<HomePage/>}></Route>
        {/* Profile */}
        <Route path='/profile/:region/:profile' element={<SummonerPage/>}></Route>
        {/* Database Routes */}
        <Route path='/database/:version/' element={<Database/>}></Route>
        <Route path='/database/:version/champions/:champion' element={<ChampionPage/>}></Route>
      </Routes>

    </div>
  );
}

export default App;
