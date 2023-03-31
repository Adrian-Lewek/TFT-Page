import React, { FunctionComponent, useEffect, useState } from 'react';
import API_KEY from '../API_KEY.json'
interface iProps {
  region: string,
}
interface DataSummoner {
  accountId: string,
  id: string,
  name:string,
  profileIconId: number,
  puuid: string,
  revisionDate: number,
  summonerLevel: number
}
const Leaderboard: FunctionComponent<iProps> = ({ region = "eun1" }) => {
  const [data, setData] = useState<DataSummoner>();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  let loaderElements:JSX.Element[] = [];
  function handleLoader(){
    for(let i = 0; i < 15; i++){
      loaderElements.push(<tr className='loadingRow'></tr>)
    }
  }
  handleLoader();

  useEffect(() => {
    //https://eun1.api.riotgames.com/tft/league/v1/challenger?api_key=RGAPI-666dadfe-df88-474d-8d2b-c8b9931cb248
    
    fetch('https://'+ region + '.api.riotgames.com/tft/league/v1/challenger?api_key=' + API_KEY.REACT_APP_API_KEY)
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
  }, [])

  return (
    <div className='LaderboardContainer'>
      <div className="LaderboardContainer_table">
      <table>
        <tr>
          <th>Rank</th>
          <th>Summoner</th>
          <th>Wins</th>
          <th>Looses</th>
          <th>Tier</th>
          <th>Points</th>
        </tr>
        {loading ? 'loaderElements.map((element, index)=> element)'  : loaderElements.map((element, index)=> (<React.Fragment key={index}>{element}</React.Fragment>))}
      </table>
      </div>
    </div>
  )
}
export default Leaderboard;