import { FunctionComponent, useEffect, useState } from 'react';
import API_KEY from '../API_KEY.json'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

interface iProps {
  type: string,
}
interface DataSummonerRank {
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
interface DataSummonerName {
  accountId: string,
  id: string,
  name:string,
  profileIconId: number,
  puuid: string,
  revisionDate: number,
  summonerLevel: number
}
type State = {
  user: string,
  summonerID: string;
  region: string;
}
const ShowRank: FunctionComponent<iProps> = ({ type }) => {
  const [DataRank, setDataRank] = useState<DataSummonerRank>()
  const [DataUser, setDataUser] = useState<DataSummonerName>()
  const [Loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const query = [".api.riotgames.com/tft/league/v1/entries/by-summoner/", ".api.riotgames.com/lol/league/v4/entries/by-summoner/"]
  const {profile} = useParams();
  const userInfo = useSelector((state: State) => state);
  const dispatch = useDispatch();
  
  useEffect(() => {
    fetch('https://'+ userInfo.region + '.api.riotgames.com/tft/summoner/v1/summoners/by-name/' + profile + '?api_key=' + API_KEY.REACT_APP_API_KEY)
    .then(response => {
      if (response.ok) return response.json();
      throw response;
    })
    .then(data => {
      dispatch({type:"CHANGE_SUMMONER_ID", payload: data.id})
      setDataUser(data);
    })
    .catch(error => {
      console.log("Error fetching data: ");
      setError(true);
    })
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    console.log(profile)
    console.log(userInfo.summonerID)
    if(userInfo.summonerID !== DataUser?.id) return;
    else {
      fetch( 'https://' + userInfo.region + (type === "solo" ? query[0] : query[1] )  + userInfo.summonerID + '?api_key=' + API_KEY.REACT_APP_API_KEY)
      .then(response => {
        if (response.ok) return response.json();
        throw response;
      })
      .then(data => {
        setDataRank(data.filter((item: { queueType: string; }) => item.queueType === "RANKED_TFT_DOUBLE_UP" || item.queueType === "RANKED_TFT")[0]);
      })
      .catch(error => {
        console.log("Error fetching data: ", error);
        setError(true)
      })
      .finally(() => {
        setLoading(false);
      })
    }
    // eslint-disable-next-line
  }, [userInfo])
  
  function showRank(){
    const img = "https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/ranked-emblem/emblem-" + (DataRank?.tier === undefined ? "" : DataRank?.tier.toLowerCase()) + ".png"
    return (
      <div className='rankContainer_rank'>
        { 
          DataRank?.tier === undefined? 
          <div className="rankContainer_rank_img rankContainer_rank_unrankedImg">
          <img src="https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-shared-components/global/default/unranked.png" alt="your Rank" />
          </div>
          : 
          <div className="rankContainer_rank_img">
          <img src={img} alt="your Rank" />
        </div>
        }
        

        <div className='rankContainer_rank_rankInfoTier rankContainer_rank_text'>{DataRank?.tier === undefined? "Unranked" : DataRank?.tier + " " + DataRank?.rank}</div>
        <div className='rankContainer_rank_rankInfo rankContainer_rank_text'>{DataRank?.tier === undefined? null : DataRank?.leaguePoints + " LP"}</div>
        <div className='rankContainer_rank_rankedInfo rankContainer_rank_text'><b>Ranked: </b> {type === "solo" ? "Solo/Duo" : "Double Up"}</div>
      </div>
    )
  }

  return (
    <div className="rankContainer">
      {error? "Wrong username or Server " : (Loading ? <div className='loaderContainer'><div className="loader"></div></div> : showRank())}
    </div>
  )
}
export default ShowRank;