import {useEffect, useState} from 'react'
import {IAugments, IMatchInfo} from '../../interfaces/index'
import { ILittleLegendsImages } from '../../interfaces/index'
interface Props {
  match: string,
  region: string,
  puuid: string,
  version: string
  tacticanInfo: ILittleLegendsImages | undefined
  augments: IAugments | undefined,
  heroAugments: IAugments | undefined,
}
const Match: React.FC<Props> = ({match, region, puuid, tacticanInfo, version, augments, heroAugments}) => {
  const [data, setData] = useState<IMatchInfo>()
  const [loading, setLoading] = useState(true)
  //const [summonerMatch, setSummonerMatch] = useState()
  const summonerMatch = () => {
   if(data !== undefined){
    return data.info.participants.find(item => item.puuid === puuid)
   }
   return null
  }  
  function getColorRank(rank:number, type:string){
    if(type==='pairs'){
      switch (rank){
      case 1:
        return "#feca10";
      case 2:
        return "#ededed";
      default:
        return "#444445";
      }
    }
    else {
      switch (rank){
      case 1:
        return "#feca10";
      case 2:
        return "#ededed";
      case 3:
        return "#d67d29";
      case 4:
        return "#3434fe";
      default:
        return "#444445";
      }
    }
  } 
  function getDoubleUpPlacement(placement:number){
    return Math.ceil(placement/2);
  }
  const summonerMatchInfo = summonerMatch()
  useEffect(() =>{
    fetch('http://192.168.0.10:9000/match/matchInfo/' + region + '/' + match)
    .then(response => {
      if(response.ok) return response.json();
      throw response;
    })
    .then(data => {
      setData(data);
    })
    .catch(error => {
      console.log(error);
    })
    .finally(() => setLoading(false));

  },[])
    return (
    <>
    { loading ? <div>loading</div> : 
    <div className="matchContainer" style={{borderLeftColor: (data?.info.tft_game_type === "pairs" ? getColorRank(getDoubleUpPlacement(summonerMatchInfo?.placement ?? 0), data?.info.tft_game_type) : getColorRank(summonerMatchInfo?.placement ?? 0, data?.info.tft_game_type ?? ""))}}>
      <div className="matchContainer_info" >
        <div className="matchContainer_info_place">
          #{data?.info.tft_game_type === "pairs" ? getDoubleUpPlacement(summonerMatchInfo?.placement ?? 0) : summonerMatchInfo?.placement}
        </div>
        <div className="matchContainer_info_type">
          {data?.info.tft_game_type === "pairs" ? "Double Up" : "Ranked Solo"}
          
        </div>
      </div>
      <div className="matchContainer_profilePic">
        
        <img src={'http://ddragon.leagueoflegends.com/cdn/' + version + '/img/tft-tactician/' + tacticanInfo?.data[summonerMatchInfo?.companion.item_ID ?? 1].image.full} alt="" />
      </div>
      <div className="matchContainer_augments">
        {summonerMatchInfo?.augments.map((item, index)=> {
          const img = heroAugments?.data[item] ? 'http://ddragon.leagueoflegends.com/cdn/13.6.1/img/tft-hero-augment/' + heroAugments.data[item].image.full : 'http://ddragon.leagueoflegends.com/cdn/13.6.1/img/tft-augment/' + augments?.data[item].image.full;
          return(<div className='matchContainer_augments_item' key={index}> <img src={img} alt={item} /> </div>)
        })}
      </div>
      
      <div className="matchContainer_Champions">

      </div>
      <div className="matchContainer_traits">

      </div>
      <div className="matchContainer_otherPlayers">

      </div>
      <div className="matchContainer_More">

      </div>
    </div>
  }
  </>
  )
  
}
export default Match;