import { useEffect, useState } from 'react';
import '../style/profilePage.scss';
import API_KEY from '../API_KEY.json';
import RankShow from './SummonerPage';
import {Route,Routes} from 'react-router-dom';
import HomePage from './HomePage';
import NavBar from '../components/NavBar';

interface DataSummonerName {
  accountId: string,
  id: string,
  name:string,
  profileIconId: number,
  puuid: string,
  revisionDate: number,
  summonerLevel: number
}
function App() {
  const [Data, setData] = useState<DataSummonerName | undefined>(undefined)
  const [Loading, setLoading] = useState(true)
  const [Error, setError] = useState(false)
  const username = 'FroGiSxBOSSx'
  useEffect(() => {
    fetch('https://eun1.api.riotgames.com/tft/summoner/v1/summoners/by-name/' + username + '?api_key=' + API_KEY.REACT_APP_API_KEY)
    .then(response => {
      if (response.ok) return response.json();
      throw response;
    })
    .then(data => {
      setData(data);
    })
    .catch(error => {
      console.log("Error fetching data: ", error);
      setError(error);
    })
    .finally(() => {
      setLoading(false);
    })
  }, [])
  console.log(Data)
  return (
    <div className="App">
      <NavBar/>
      {Loading ? "loading... " : (Error ? "Error": 
        <Routes>
          <Route path='/' element={<HomePage/>}></Route>
          <Route path='/profile/:id' element={<RankShow summonerId={Data?.id} name={Data?.name}/>}></Route>
        </Routes>
      )}
    </div>
  );
}

export default App;
