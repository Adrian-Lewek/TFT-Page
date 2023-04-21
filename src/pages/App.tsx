import '../style/profilePage.scss';
import '../style/database.scss';
import {Route,Routes} from 'react-router-dom';
import SummonerPage from './SummonerPage';
import HomePage from './HomePage';
import NavBar from '../components/NavBar';
import ChampionPage from './database/ChampionPage';
import Database from './database/Database';
import { useEffect } from 'react';
interface IChamp {
  image: {
    full: string
  }
}
function App() {

  useEffect(() => {
    fetch('https://ddragon.leagueoflegends.com/api/versions.json')
    .then(response => {
      if(response.ok) return response.json();
      throw response;
    })
    .then(data => {
      fetch('https://ddragon.leagueoflegends.com/cdn/' + data[0] + '/data/en_US/tft-champion.json')
      .then(response => {
        if(response.ok) return response.json();
        throw response
        })
        .then(datachamps => {
          const arrayChamp:IChamp[] = Object.values(datachamps.data)
          const fullArray = arrayChamp.map(champ => 'https://ddragon.leagueoflegends.com/cdn/' + data[0] + '/img/tft-champion/' + champ.image.full);
          fullArray.forEach((url) => {
            const img = new Image();
            img.src = url;
          });
        })
        .catch(error => console.log(error))
    })
    .catch(error => {
      console.log(error);
    })
  }, []);
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
