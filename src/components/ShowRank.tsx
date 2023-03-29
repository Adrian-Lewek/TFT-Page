import { FunctionComponent, useEffect, useState } from 'react';
import API_KEY from '../API_KEY.json'

interface iProps {
  summonerId: string | undefined;
  type: string,
  name: string | undefined
}
interface DataSummonerName {
  freshBlood: boolean,
  hotStreak: boolean,
  inactive: boolean,
  leagueId: string,
  leaguePoints: number,
  losses: number,
  queueType: string,
  rank: string,
  summonerId: string,
  summonerName: string,
  tier: string,
  veteran: boolean,
  wins: number,

}
const ShowRank: FunctionComponent<iProps> = ({ summonerId, type, name }) => {
  const [Data, setData] = useState<DataSummonerName>()
  const [Loading, setLoading] = useState(true)
  const [Error, setError] = useState(false)
  const query = ["https://eun1.api.riotgames.com/tft/league/v1/entries/by-summoner/", "https://eun1.api.riotgames.com/lol/league/v4/entries/by-summoner/"]
  useEffect(() => {
    fetch((type === "solo" ? query[0] : query[1] )  + summonerId + '?api_key=' + API_KEY.REACT_APP_API_KEY)
    .then(response => {
      if (response.ok) return response.json();
      throw response;
    })
    .then(data => {
      setData(data.filter((item: { queueType: string; }) => item.queueType === "RANKED_TFT_DOUBLE_UP" || item.queueType === "RANKED_TFT")[0]);
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
  function showRank(){
    const img = "https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/ranked-emblem/emblem-" + (Data?.tier === undefined ? "" : Data?.tier.toLowerCase()) + ".png"
    return (
      <div className='rankContainer_rank'>
        { 
          Data?.tier === undefined? 
          <div className="rankContainer_rank_img rankContainer_rank_unrankedImg">
          <img src="https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-shared-components/global/default/unranked.png" alt="your Rank" />
          </div>
          : <div className="rankContainer_rank_img">
          <img src={img} alt="your Rank" />
        </div>
        }
        

        <div className='rankContainer_rank_summonerName rankContainer_rank_text'>{name}</div>
        <div className='rankContainer_rank_rankInfo rankContainer_rank_text'>{Data?.tier === undefined? "Unranked" : Data?.tier + " " + Data?.rank}</div>
        
        
        <div className='rankContainer_rank_rankedInfo rankContainer_rank_text'><b>Ranked: </b> {type === "solo" ? "Solo/Duo" : "Double Up"}</div>
      </div>
    )
  }

  return (
    <div className="rankContainer">
      {Loading ? "loading... " : (Error ? "Error": showRank())}
    </div>
  )
}
export default ShowRank;