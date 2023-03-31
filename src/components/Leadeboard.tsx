import React, { FunctionComponent, useEffect, useState } from 'react';
import API_KEY from '../API_KEY.json'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
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
  let sortedLeaderboard;
  if(data?.entries.length)
    sortedLeaderboard = data?.entries.sort((a,b)=> b.leaguePoints - a.leaguePoints).slice(0, 30);
  
  useEffect(() => {
    //https://eun1.api.riotgames.com/tft/league/v1/challenger?api_key=RGAPI-666dadfe-df88-474d-8d2b-c8b9931cb248
    
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
  return (
    <>
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
      {/* */}

      
    </>
  )
}
export default Leaderboard;