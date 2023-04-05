import {useEffect, useState} from 'react'
import {HOST, IFiles, IMatchInfo} from '../../interfaces/index'
import { ILittleLegendsImages } from '../../interfaces/index'
import ChampionIcon from './ChampionIcon'
import {BsChevronRight } from 'react-icons/bs'
import TraitIcon from './TraitIcon'
import AugmentIcon from './AugmentIcon'

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
  traitInfo: IFiles | undefined,
} 
const Match: React.FC<Props> = ({match, region, puuid, tacticanInfo, version, augments, heroAugments, champions, items, traitInfo}) => {
  const [data, setData] = useState<IMatchInfo>()
  const [loading, setLoading] = useState(true)
  const [morePlayers, setMorePlayers] = useState(false)

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
  function getBackgroundColor(style:number){
    switch (style) {
      case 0:
      case 3:
        return "#d8b01c"
      case 1: 
        return "#9c530f"
      case 2:
        return "#949494"
      
      case 4:
        return "#2dc3f1"
      default:
        return;
    }
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
    <div className="match">
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
            return(<AugmentIcon key={index} name={heroAugments?.data[augment] ? heroAugments.data[augment].name  : (augments?.data[augment].name ?? "")} url={img}/>)
          })}
        </div>
        <div className="matchContainer_champions">
          {summonerMatchInfo?.units.map((unit, index) => {
            return (<div className="championContainer" key={index}>
              { champions?.data[unit.character_id] ? 
                <ChampionIcon 
                name={champions.data[unit.character_id].name}
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
          {summonerMatchInfo ? summonerMatchInfo.traits.filter(trait => trait.tier_current > 0).sort((a,b) => b.style - a.style).map((trait, index) => {
            return(
              <TraitIcon name={traitInfo?.data[trait.name]? traitInfo?.data[trait.name].name : "" } key={index} url={'http://ddragon.leagueoflegends.com/cdn/13.6.1/img/tft-trait/' + traitInfo?.data[trait.name].image.full} styles={{backgroundColor: getBackgroundColor(trait.style)}}/>
            )
          }) : ""}
        </div>
        <div className="matchContainer_more">
          <button onClick={() => setMorePlayers(prev => !prev)}><BsChevronRight/></button>
        </div>
      </div>
    </div>
  }
  </>
  )
  
}
export default Match;