
import { useEffect, useState } from 'react';
import ShowRank from '../components/SummonerPage/ShowRank';
import { IDataSummonerName, IDataSummonerRank} from '../interfaces';
import { useParams } from 'react-router-dom';
import SummonerInfoStats from '../components/SummonerPage/SummonerInfoStats'
import MatchHistory from '../components/SummonerPage/MatchHistory';
function SummonerPage() {
  const [dataUser, setDataUser] = useState<IDataSummonerName>()
  const [dataRankSolo, setDataRankSolo] = useState<IDataSummonerRank>()
  const [dataRankDouble, setDataRankDouble] = useState<IDataSummonerRank>()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const {profile, region} = useParams();
  const [allMatch, setAllMatch] = useState<string[]>([])
  const [fetchCount, setFetchCount] = useState(2);
  function fetchSummonerRank(type:string){
    fetch('http://localhost:9000/summoner/rank/'+ region +'/' + type +'/'+ dataUser?.id )
      .then(response => {
        if (response.ok) return response.json();
        throw response;
      })
      .then(data => {
        type === "solo" ? setDataRankSolo(data.filter((item: { queueType: string; }) => item.queueType === "RANKED_TFT")[0]) : setDataRankDouble(data.filter((item: { queueType: string; }) => item.queueType === "RANKED_TFT_DOUBLE_UP")[0]);
        //setDataRankSolo(data.filter((item: { queueType: string; }) => item.queueType === "RANKED_TFT_DOUBLE_UP" || item.queueType === "RANKED_TFT")[0]);
      })
      .catch(error => {
        console.log("Error fetching data: ", error);
        setError(true)
        setFetchCount(count => count - 1)
      })
      .finally(() => {
        
        setFetchCount(count => count - 1)
      })
  }
  function getRegionFull(region:string) {
    switch (region) {
      case 'eun1':
      case 'euw1':
        return "europe"
      case 'na1': 
        return 'americas' 
      case 'kr': 
        return 'asia' 
      default:
        return "europe"
    }
  }
  useEffect(() => {
    fetch('http://localhost:9000/summoner/'+ region + '/' + profile)
    .then(response => {
      if (response.ok) return response.json();
      throw response;
    })
    .then(data => {
      setDataUser(data);
    })
    .catch(error => {
      console.log("Error fetching data: ");
      setError(true);
      
    })
    // eslint-disable-next-line
  }, [])
  useEffect(() => {

    if(dataUser?.puuid !== undefined && allMatch.length === 0 && fetchCount === 0){
      const countMatches = (dataRankSolo?.wins ? dataRankSolo.wins : 0) + (dataRankSolo?.losses ? dataRankSolo.losses : 0) + (dataRankDouble?.wins ? dataRankDouble.wins : 0) + (dataRankDouble?.losses ? dataRankDouble.losses : 0)
      const regionFull = getRegionFull(region ?? "eun1")
      fetch('http://192.168.0.10:9000/summoner/match/' + regionFull + '/'+ dataUser?.puuid+'/'+countMatches)
      .then(response => {
        if (response.ok) return response.json();
        throw response;
      })
      .then(data => {
        setAllMatch(data);
        
      })
      .catch(error => {
        setError(true)
      })
      .finally(() => setLoading(false))
    }
    
  }, [fetchCount])
  useEffect(() => {
    if(dataUser?.id !== undefined) {
      fetchSummonerRank("solo")
      fetchSummonerRank("double")
    }
    // eslint-disable-next-line
  }, [dataUser])
  function getWinrate(win:number | undefined, loss:number | undefined){
    const wins = win ? win: 0
    const losses = loss ? loss: 0;
    let winrate
    (wins + losses) ? winrate = Math.floor(wins / (wins + losses) *100) : winrate = 0
    return winrate 
  }
  const doubleWinrate = getWinrate(dataRankDouble?.wins, dataRankDouble?.losses) + '%';
  const soloWinrate = getWinrate(dataRankSolo?.wins, dataRankSolo?.losses) + '%';
  
  return (
    <>
      <div className="profileContainer_banner">
        <img src="https://i.pinimg.com/originals/bf/f2/49/bff2497c130e8149d59fc7aed62f175d.png" alt="tft banner" />
        <div className="profileContainer_banner_downside"/>
      </div>
      <div className="profileContainer">
        {error? "Wrong username or region" : 
        loading? <div className='loader'/> :
        <>
          <div className="summonerInfo">
            <SummonerInfoStats profileIconId={dataUser?.profileIconId} soloWinrate={soloWinrate} doubleWinrate={doubleWinrate} name={dataUser?.name} />
          </div>
          <div className="profileContainer_rank">
            <ShowRank type="solo" DataRank={dataRankSolo}/>
            <ShowRank type="double" DataRank={dataRankDouble}/>
          </div>
          <div className="matchHistory">
          <MatchHistory puuid={dataUser?.puuid ?? ""} region={getRegionFull(region ?? "eun1") ?? "europe"} match={allMatch} />
        </div>
        </>
        }
      </div>
      
    </>
  )
}
export default SummonerPage;