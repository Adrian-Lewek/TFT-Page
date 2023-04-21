import { FunctionComponent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HOST } from '../interfaces';
interface iProps {
}
interface DataSummoner {
  entries: [{
    summonerId: string;
    losses: number;
    wins: number;
    leaguePoints: number;
    summonerName: string;
  }]
}
const Leaderboard: FunctionComponent<iProps> = () => {
  const [data, setData] = useState<DataSummoner>();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()
  const [regionLeaderboard, setRegionLeaderboard] = useState("eun1")
  let sortedLeaderboard;
  //sorting leaderboard based on lp
  if(data?.entries.length)
    sortedLeaderboard = data?.entries.sort((a,b)=> b.leaguePoints - a.leaguePoints).slice(0, 30);
  //fetching leadeboard 
  useEffect(() => {
    setLoading(true)
    fetch(HOST + 'leaderboard/'+ regionLeaderboard)
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
  }, [regionLeaderboard])
  function handleSummonerClick(name:string){
    navigate('profile/' + regionLeaderboard + '/' + name)
  }
  //changing region
  function handleregionClick(region: string){
    if(regionLeaderboard !== region){
      setRegionLeaderboard(region)
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
          <div onClick={() => handleregionClick("eun1")} className={regionLeaderboard === "eun1"? "HomePage_laderboardContainer_titlebar_navigation_item HomePage_laderboardContainer_titlebar_navigation_active":"HomePage_laderboardContainer_titlebar_navigation_item"}>EUNE</div>
          <div onClick={() => handleregionClick("euw1")} className={regionLeaderboard === "euw1"? "HomePage_laderboardContainer_titlebar_navigation_item HomePage_laderboardContainer_titlebar_navigation_active":"HomePage_laderboardContainer_titlebar_navigation_item"}>EUW</div>
          <div onClick={() => handleregionClick("na1")} className={regionLeaderboard === "na1"? "HomePage_laderboardContainer_titlebar_navigation_item HomePage_laderboardContainer_titlebar_navigation_active":"HomePage_laderboardContainer_titlebar_navigation_item"}>NA</div>
          <div onClick={() => handleregionClick("kr")} className={regionLeaderboard === "kr"? "HomePage_laderboardContainer_titlebar_navigation_item HomePage_laderboardContainer_titlebar_navigation_active":"HomePage_laderboardContainer_titlebar_navigation_item"}>KR</div>
        </div>
      </div>
      {error? "Error with connection to Servers!" : (loading ? <div className="loader"></div>  :
      <table>
        <thead>
          <tr className='LaderboardContainer_Header'>
            <th className='LaderboardContainer_item_rank'>Rank</th>
            <th className='LaderboardContainer_item_summoner'>Summoner</th>
            <th className='LaderboardContainer_item_wins'>Wins</th>
            <th className='LaderboardContainer_item_losses'>Losses</th>
            <th className='LaderboardContainer_item_winper'>Win %</th>
            <th className='LaderboardContainer_item_tier'>Tier</th>
            <th className='LaderboardContainer_item_lp'>Lp</th>
          </tr>
          </thead>
        <tbody>
          {sortedLeaderboard?.map((summoner, index) => {
            let winPercent = Math.floor(summoner.wins / (summoner.wins + summoner.losses) *100)
            return(
              <tr key={index}>
                <td className='LaderboardContainer_item_rank'>{index + 1}</td>
                <td className='LaderboardContainer_item_summoner' onClick={() => handleSummonerClick(summoner.summonerName)}>{summoner.summonerName}</td>
                <td className='LaderboardContainer_item_wins'>{summoner.wins}</td>
                <td className='LaderboardContainer_item_losses'>{summoner.losses}</td>
                <td className='LaderboardContainer_item_winper'>{winPercent}%</td>
                <td className='LaderboardContainer_item_tier'>Challenger</td>
                <td className='LaderboardContainer_item_lp'>{summoner.leaguePoints}</td>
              </tr>
            )
          })}
        </tbody>
      </table> )}
    </>
  )
}
export default Leaderboard;