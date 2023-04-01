import React, { FunctionComponent, useEffect, useState } from 'react';
import API_KEY from '../API_KEY.json'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
interface iProps {
}
interface DataSummoner {
  entries: [{
    summonerId: string;
    losses: number;
    wins: number;
    leaguePoints: number;
    summonerName: "immoQ";
  }]
}
type State = {
  user: string,
  summonerID: string;
  region: string;
}
const Leaderboard: FunctionComponent<iProps> = () => {
  const [data, setData] = useState<DataSummoner>();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()
  const userInfo = useSelector((state: State) => state);
  const dispatch = useDispatch();
  let sortedLeaderboard;
  if(data?.entries.length)
    sortedLeaderboard = data?.entries.sort((a,b)=> b.leaguePoints - a.leaguePoints).slice(0, 30);
  const allRegionsLeaderboards = [
    
  ]
  useEffect(() => {
    //https://eun1.api.riotgames.com/tft/league/v1/challenger?api_key=RGAPI-666dadfe-df88-474d-8d2b-c8b9931cb248
    setLoading(true)
    fetch('https://'+ userInfo.region + '.api.riotgames.com/tft/league/v1/challenger?api_key=' + API_KEY.REACT_APP_API_KEY)
    .then(response => {
      
      if (response.ok) return response.json();
      throw response;
    })
    .then(data => {
      setData(data);
    })
    .catch(error => {
      console.log("Error fetching data: ");
      setError(true);
    })
    .finally(()=>{
      setLoading(false);
    })
    // eslint-disable-next-line
  }, [userInfo.region])

  function handleSummonerClick(name:string){
    navigate('profile/' + name)
  }
  function handleregionClick(region: string){
    if(userInfo.region !== region){
      dispatch({type: 'CHANGE_REGION', payload: region});
    }
  }
  return (
    <>
      <div className="HomePage_laderboardContainer_titlebar">
        <div className='HomePage_laderboardContainer_titlebar_descContainer'>
          <div className="HomePage_laderboardContainer_titlebar_descContainer_img">
            <img src="https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/ranked-emblem/emblem-challenger.png" alt="challenger_emblem" />
          </div>
          <div className='HomePage_laderboardContainer_titlebar_descContainer_desc'>
            <p>Challenger Leaderboard</p>
            <p>TFT Ranked Solo</p>
          </div>
        </div>
        <div className='HomePage_laderboardContainer_titlebar_navigation'>
          <div onClick={() => handleregionClick("eun1")} className={userInfo.region === "eun1"? "HomePage_laderboardContainer_titlebar_navigation_item HomePage_laderboardContainer_titlebar_navigation_active":"HomePage_laderboardContainer_titlebar_navigation_item"}>EUNE</div>
          <div onClick={() => handleregionClick("euw1")} className={userInfo.region === "euw1"? "HomePage_laderboardContainer_titlebar_navigation_item HomePage_laderboardContainer_titlebar_navigation_active":"HomePage_laderboardContainer_titlebar_navigation_item"}>EUW</div>
          <div onClick={() => handleregionClick("na1")} className={userInfo.region === "na1"? "HomePage_laderboardContainer_titlebar_navigation_item HomePage_laderboardContainer_titlebar_navigation_active":"HomePage_laderboardContainer_titlebar_navigation_item"}>NA</div>
          <div onClick={() => handleregionClick("kr")} className={userInfo.region === "kr"? "HomePage_laderboardContainer_titlebar_navigation_item HomePage_laderboardContainer_titlebar_navigation_active":"HomePage_laderboardContainer_titlebar_navigation_item"}>KR</div>
        </div>
      </div>
      {error? "Error with connection to Servers!" : (loading ? <div className="loader"></div>  :
      <table>
        <thead>
          <tr className='LaderboardContainer_Header'>
            <th>Rank</th>
            <th>Summoner</th>
            <th>Wins</th>
            <th>Losses</th>
            <th>Win %</th>
            <th>Tier</th>
            <th>Lp</th>
          </tr>
          </thead>
        <tbody>
          {sortedLeaderboard?.map((summoner, index) => {
            let winPercent = Math.floor(summoner.wins / (summoner.wins + summoner.losses) *100)
            return(
              <tr key={index}>
                <td>{index + 1}</td>
                <td onClick={() => handleSummonerClick(summoner.summonerName)}>{summoner.summonerName}</td>
                <td>{summoner.wins}</td>
                <td>{summoner.losses}</td>
                <td>{winPercent}%</td>
                <td>Challenger</td>
                <td>{summoner.leaguePoints}</td>
              </tr>
            )
          })}
        </tbody>
      </table> )}
    </>
  )
}
export default Leaderboard;