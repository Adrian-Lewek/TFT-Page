import {useEffect, useState} from 'react'
import {HOST, IFiles, IMatchInfo} from '../../interfaces/index'
import { ILittleLegendsImages } from '../../interfaces/index'
import ChampionIcon from './ChampionIcon'
interface Props {
  match: string,
  region: string,
  puuid: string,
  version: string
  tacticanInfo: ILittleLegendsImages | undefined
  augments: IFiles | undefined,
  heroAugments: IFiles | undefined,
  champions: IFiles | undefined,
  items: IFiles | undefined,
}
const Match: React.FC<Props> = ({match, region, puuid, tacticanInfo, version, augments, heroAugments, champions, items}) => {
  const [data, setData] = useState<IMatchInfo>()
  const [loading, setLoading] = useState(true)
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
    fetch(HOST + 'match/matchInfo/' + region + '/' + match)
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
        {summonerMatchInfo?.augments.map((augment, index)=> {
          const img = heroAugments?.data[augment] ? 'http://ddragon.leagueoflegends.com/cdn/13.6.1/img/tft-hero-augment/' + heroAugments.data[augment].image.full : 'http://ddragon.leagueoflegends.com/cdn/13.6.1/img/tft-augment/' + augments?.data[augment].image.full;
          return(<div className='matchContainer_augments_item' key={index}> <img src={img} alt={augment} /> </div>)
        })}
      </div>
      
      <div className="matchContainer_champions">
        {summonerMatchInfo?.units.map((unit, index) => {
          return (<div className="championContainer" key={index}>
            { champions?.data[unit.character_id] ? 
              <ChampionIcon 
              championsInfo={champions} 
              itemsInfo={items} tier={unit.tier} 
              rarity={unit.rarity} 
              items={unit.itemNames} 
              championId={unit.character_id}
            /> : null}
           </div>)
        })}
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