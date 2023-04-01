
import { useEffect, useState } from 'react';
import ShowRank from '../components/ShowRank';
import { useDispatch, useSelector } from 'react-redux';
import { DataSummonerName, State, DataSummonerRank} from '../interfaces';
import { useParams } from 'react-router-dom';

function SummonerPage() {
const [dataUser, setDataUser] = useState<DataSummonerName>()
const [dataRankSolo, setDataRankSolo] = useState<DataSummonerRank>()
const [dataRankDouble, setDataRankDouble] = useState<DataSummonerRank>()
const [loading, setLoading] = useState(true)
const [error, setError] = useState(false)
const userInfo = useSelector((state: State) => state);
const dispatch = useDispatch();
const {profile} = useParams();
useEffect(() => {
  fetch('http://localhost:9000/summoner/'+ userInfo.region + '/' + profile)
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

function fetchSummonerRank(type:string){
  fetch('http://localhost:9000/summoner/rank/'+ userInfo.region +'/' + type +'/'+ dataUser?.id )
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
    })
    .finally(() => setLoading(false))
}
useEffect(() => {
  if(userInfo.summonerID !== dataUser?.id) return;
  else {
    fetchSummonerRank("solo")
    fetchSummonerRank("double")
    
  }
  // eslint-disable-next-line
}, [userInfo])

  return (
    <div className="profileContainer">
      {error? "Wrong username or region" : 
        loading? <div className='loader'/> : 
        <>
        <ShowRank type="solo" DataRank={dataRankSolo}/>
        <ShowRank type="double" DataRank={dataRankDouble}/>
        </>
      }
    </div>
  )
}
export default SummonerPage;