import '../style/profilePage.scss';
import SummonerPage from './SummonerPage';
import {Route,Routes} from 'react-router-dom';
import HomePage from './HomePage';
import NavBar from '../components/NavBar';
import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { ILang_EN } from '../interfaces';




function App() {
  const userInfo = useSelector((state: ILang_EN) => state);
  const dispatch = useDispatch();


  useEffect(() => {
    fetch('https://raw.communitydragon.org/latest/cdragon/tft/en_us.json')
    .then(response => {
      if (response.ok) return response.json();
      throw response;
    })
    .then(data => {
      dispatch({type: "CHANGE_LANG", payload: data});
      //onsole.log(data);
    })
    .catch(error => {
      console.log(error);
    })
  },[])
  useEffect(() => {
    if(userInfo) console.log(userInfo.items[2].apiName);
  },[userInfo])
  return (
    <div className="App">
      <NavBar/>
      <Routes>
        <Route path='/' element={<HomePage/>}></Route>
        <Route path='/profile/:region/:profile' element={<SummonerPage/>}></Route>
      </Routes>

    </div>
  );
}

export default App;
