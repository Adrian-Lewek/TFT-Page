//component for showing match
import {useEffect, useState} from 'react'
import {HOST, IFiles, IMatchInfo} from '../../interfaces/index'
import { ILittleLegendsImages } from '../../interfaces/index'
import ChampionIcon from './ChampionIcon'
import {BsChevronDown, BsChevronUp } from 'react-icons/bs'
import TraitIcon from './TraitIcon'
import AugmentIcon from './AugmentIcon'
import { useTransition, animated } from 'react-spring'
import ShowAllPlayers from './ShowAllPlayers'

export interface Props {
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
  setPlaces: (place:number, type:string) => void
} 
const Match: React.FC<Props> = ({match, region, puuid, tacticanInfo, version, augments, heroAugments, champions, items, traitInfo, setPlaces}) => {
  const [data, setData] = useState<IMatchInfo>()
  const [loading, setLoading] = useState(true)
  const [morePlayers, setMorePlayers] = useState(false)
  const transition = useTransition(morePlayers, {
    from: {height: 0, opacity: 0, marginTop: 0},
    enter: {height: 950, opacity: 1, marginTop: 10},
    leave: {height: 0, opacity: 0, marginTop: 0}
  })
  //getting summoner from match and his stats
  const summonerMatch = () => {
   if(data !== undefined){
    const summonerData = data.info.participants.find(item => item.puuid === puuid);
    return summonerData
   }
   return null
  }  
  const summonerMatchInfo = summonerMatch()
  //getting color based on match position
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
  //swapping place to double up standards
  function getDoubleUpPlacement(placement:number){
    return Math.ceil(placement/2);
  }
  //getting background Color for traits
  function getBackgroundColor(style:number){
    switch (style) {
      case 0:
        return "#7d1092"
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
  //fetching informations about match
  useEffect(() =>{
    fetch(HOST + 'match/matchInfo/' + region + '/' + match)
    .then(response => {
      if(response.ok) return response.json();
      throw response;
    })
    .then(data => {
      setData(data);
      const participant = data.info.participants.find((item: { puuid: string }) => item.puuid === puuid);
      data?.info.tft_game_type === "pairs" ? setPlaces(getDoubleUpPlacement(participant?.placement ?? 0) , "double") : setPlaces(participant?.placement ?? 0, "solo")
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
            {data?.info.tft_game_type === "pairs" ? "Double Up" : data?.info.tft_game_type === "standard" ? "Ranked Solo" : "Hyper Roll"}
            
          </div>
        </div>
        <div className="matchContainer_profilePic">
          <img src={'https://ddragon.leagueoflegends.com/cdn/' + version + '/img/tft-tactician/' + tacticanInfo?.data[summonerMatchInfo?.companion.item_ID ?? 1].image.full} alt="" />
        </div>
        <div className="matchContainer_augments">
          {summonerMatchInfo?.augments.map((augment, index)=> {
            if (heroAugments?.data[augment] || augments?.data[augment]){
              const img = heroAugments?.data[augment] ? 'https://ddragon.leagueoflegends.com/cdn/' + version + '/img/tft-hero-augment/' + heroAugments.data[augment].image.full : (augments?.data[augment] ? 'https://ddragon.leagueoflegends.com/cdn/' + version + '/img/tft-augment/' + augments.data[augment].image.full : "");
              return(<AugmentIcon key={index} name={heroAugments?.data[augment] ? heroAugments.data[augment].name  : (augments?.data[augment] ? augments.data[augment].name : "")} url={img}/>)
            } else return null
          })}
        </div>
        <div className="matchContainer_champions">
          {summonerMatchInfo?.units.sort((a,b)=>{
            if(a.tier == b.tier) {
              if(b.itemNames.length === a.itemNames.length) return b.rarity - a.rarity
              return b.itemNames.length - a.itemNames.length
            }
            return b.tier - a.tier
          }).map((unit, index) => {
            if (champions?.data[unit.character_id])
              return (
                  <ChampionIcon 
                  key={index}
                  version={version ?? "13.6.1"}
                  name={champions.data[unit.character_id].name}
                  championsInfo={champions} 
                  itemsInfo={items} tier={unit.tier} 
                  rarity={unit.rarity} 
                  items={unit.itemNames} 
                  championId={unit.character_id}
               />)
          })}
        </div>
        <div className="matchContainer_traits">
          {summonerMatchInfo ? summonerMatchInfo.traits.filter(trait => trait.tier_current > 0).sort((a,b) => b.style - a.style).map((trait, index) => {
            return(
              <TraitIcon name={traitInfo?.data[trait.name]? traitInfo?.data[trait.name].name : "" } key={index} url={'https://ddragon.leagueoflegends.com/cdn/' + version + '/img/tft-trait/' + traitInfo?.data[trait.name].image.full} styles={{backgroundColor: getBackgroundColor(trait.style)}}/>
            )
          }) : ""}
        </div>
        <div className="matchContainer_more">
          <button onClick={() => setMorePlayers(prev => !prev)}> {morePlayers ? <BsChevronUp/> : <BsChevronDown/> } </button>
        </div>
      </div>
      <div className="morePlayerContainer">
        { transition((style, item) =>
          item ? <animated.div style={style} className="item">
            <ShowAllPlayers 
            augments={augments} 
            getDoubleUpPlacement={getDoubleUpPlacement} 
            getBackgroundColor={getBackgroundColor} 
            heroAugments={heroAugments}
            traitInfo={traitInfo} 
            items={items} 
            champions={champions} 
            version={version} 
            tacticanInfo={tacticanInfo} 
            match={data}/>
            </animated.div> : ""
        ) }
      </div>
    </div>
  }
  </>
  )
  
}
export default Match;