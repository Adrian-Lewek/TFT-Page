import { useParams } from "react-router-dom";
import {useEffect, useState} from 'react'
import { IChampion, IFiles, ILang_EN } from "../../interfaces";
import ChampionImg from "../../components/Database/ChampionsImg";
interface IChampionAll {
  ability: {
    desc: string,
    icon: string,
    name: string,
    variables: {
      name: string,
      value: number[]
    }[]
  },
  stats: {
    armor: number,
    attackSpeed: number,
    critChance: number,
    critMultiplier: number,
    damage: number,
    hp: number,
    initialMana: number,
    magicResist: number,
    mana: number,
    range: number,
  }
  apiName: string,
  cost: number,
  icon: string,
  name: string,
  traits: string[]
}
function ChampionPage(){
  const [dataChampion, setDataChampion] = useState<IChampion>();
  const [allChampions, setAllChampions] = useState<IFiles>();
  const [dataChampionAll, setDataChampionAll] = useState<IChampionAll>()
  const [dataAll, setDataAll] = useState<ILang_EN>()
  const [loading, setLoading] = useState(false);
  const {champion, version} = useParams()

  //function to get border color based on champion rarity
  function getRarityColor(rarity: number){
    switch(rarity){
      case 1:
        return "#565860";
      case 2:
        return "#11b288";
      case 3:
        return "#207ac7";
      case 4:
        return "#976ad4";
      case 5:
        return "#ffc528";
      default:
        return "#444445";
    }
  }

  //fetching informations about champions in tft
  useEffect(() => {
    Promise.all([
      fetch('https://ddragon.leagueoflegends.com/cdn/' + version + '/data/en_US/tft-champion.json'),
      fetch("https://raw.communitydragon.org/latest/cdragon/tft/en_us.json"),
    ])
    .then(responses => Promise.all(responses.map(response => response.json())))
    .then(data => {
      setDataChampion(data[0].data[champion ?? ""] ?? undefined);
      setAllChampions(data[0])
      setDataAll(data[1]);
    })
    .catch(error => console.log(error))
    .finally(() => setLoading(false))
  }, [champion])
  useEffect(() => {
    if(dataAll !== undefined){
      setDataChampionAll(dataAll?.setData.find(item => item.champions.find(championInfo => championInfo.apiName === champion) !== undefined)?.champions.find(championInfo => championInfo.apiName === champion))
    }
  }, [dataAll])
  function changeText(str: string, obj: {name:string, value: number[]}[]){
    const strClean = str.replace(/<br\s*\/?>/g, "\n").replace(/<[^>]*>/g, "").replace(/ %i:[^%]*%/g, "");
    const replacedStr = strClean.replace(/@(\w+)(\*\d+)?@/g, (match, key, multiplier) => {
      const objMatch = obj.find(objItem => objItem.name === key);
      const value = objMatch ? objMatch.value[1] : 0;
      return multiplier ? (Math.round(value*100)/100 * multiplier.slice(1)).toString() : ((Math.round(value*100)/100).toString() === "0" ? "" : Math.round(value*100)/100).toString();
    });
    return(replacedStr.replace(/@[^@]*@/g, "").split('\n'));
  }
  return (
    <div className="championDatabase">
      <div className="championDatabase_banner">
        <img src={'https://ddragon.leagueoflegends.com/cdn/' + version + '/img/tft-champion/' + dataChampion?.image.full} alt="" />
        <div className="championDatabase_banner_downside"></div>
      </div>
      <div className="championDatabase_container">
      {!loading && dataAll !== undefined?
      <>
        {dataChampion === undefined ? "there is no such champion with this nickname" : 
        <>
        <div className="championDatabase_container_leftSide">
          <div className="championDatabase_container_leftSide_cont">
            <div className="championDatabase_container_leftSide_icon" style={{borderColor: getRarityColor(dataChampion.tier)}} >
              <img src={ 'https://ddragon.leagueoflegends.com/cdn/' + version + '/img/tft-champion/' + dataChampion?.image.full} alt="" />
            </div>
            <div className="championDatabase_container_leftSide_name">
              TFT {dataChampion.name}
            </div>
          </div>
          <div className="championDatabase_container_leftSide_stats">
            <div className="championDatabase_container_leftSide_stats_title"> Stats</div>
            <div className="championDatabase_container_leftSide_stats_item"><p>Cost:</p> {dataChampionAll?.cost}</div>
            <div className="championDatabase_container_leftSide_stats_item"><p>Damage:</p> {dataChampionAll?.stats.damage}</div>
            <div className="championDatabase_container_leftSide_stats_item"><p>Health:</p> {dataChampionAll?.stats.hp}</div>
            <div className="championDatabase_container_leftSide_stats_item"><p>Armor:</p> {dataChampionAll?.stats.armor}</div>
            <div className="championDatabase_container_leftSide_stats_item"><p>Magic Resist:</p> {dataChampionAll?.stats.magicResist}</div>
            <div className="championDatabase_container_leftSide_stats_item"><p>Mana:</p> {dataChampionAll?.stats.initialMana + "/" + dataChampionAll?.stats.mana}</div>
            <div className="championDatabase_container_leftSide_stats_item"><p>Attack Speed:</p> {dataChampionAll ? Math.floor(dataChampionAll.stats.attackSpeed * 100) /100 : 0}</div>
            <div className="championDatabase_container_leftSide_stats_item"><p>Crit Chance:</p> {dataChampionAll ? dataChampionAll.stats.critChance * 100 : 0}%</div>
            <div className="championDatabase_container_leftSide_stats_item"><p>Range:</p> {dataChampionAll?.stats.range}</div>
          </div>
        </div>
        <div className="championDatabase_container_rightSide">
          <div className="championDatabase_container_rightSide_title">
            Ability Description
          </div>
          <div className="championDatabase_container_rightSide_abilityContainer">
            <div className="championDatabase_container_rightSide_abilityContainer_img"><img src={"https://raw.communitydragon.org/latest/game/" + dataChampionAll?.ability.icon.replace('.dds', '.png').toLocaleLowerCase() } alt="" /></div>
            <div className="championDatabase_container_rightSide_abilityContainer_desc">
              {changeText(dataChampionAll?.ability.desc ?? "", dataChampionAll?.ability.variables ?? []).map((item, index)=>{
                return (<div key={index}>{item} <br/></div>)
              })}
            </div>
          </div>
          <div className="championDatabase_container_rightSide_title">
            Traits
          </div>
          <div className="championDatabase_container_rightSide_traitsContainer">
            {dataChampionAll?.traits.map((trait, index) => {
              const infoAll = Object.values(dataAll.sets).find(item => item.traits.find(traits => traits.name === trait));
              const traitsInfo = infoAll?.traits.find(traits => traits.name === trait)
              const similarChampTrait = infoAll?.champions.filter(champ => champ.traits.find(item => item === trait && champ.apiName !== dataChampion.id)).sort((a,b) => a.cost - b.cost)
              return ( 
              <div key={index}>
              <div className="championDatabase_container_rightSide_traitsContainer_trait">
                <div className="championDatabase_container_rightSide_traitsContainer_trait_img">
                  <img src={"https://raw.communitydragon.org/latest/game/" + traitsInfo?.icon.replace(".tex", ".png").toLowerCase()} alt="" />
                </div>
                <div className="championDatabase_container_rightSide_traitsContainer_trait_title">{traitsInfo?.name}</div>
              </div> 
              <div className="championDatabase_container_rightSide_traitsContainer_trait_champions">
                {similarChampTrait?.map((champ, champIndex) => {
                  return (<ChampionImg version={version} champLink={"/database/" + version + "/champions/" + champ.apiName} rarity={champ.cost} setColor={getRarityColor} key={champIndex} name={champ.name} img={allChampions?.data[champ.apiName].image.full ?? ""}/>)})
                }
                </div>
              </div>
              )
            })}
            </div>
          </div>
        </>}
        </>
        : 
        <>
        <div className="championLoader_leftSide">
          <div className="championLoader_leftSide_loaderIcon"></div>
          <div className="championLoader_leftSide_stats">
            <div className="championLoader_leftSide_stats_item" style={{width: '95%'}}></div>
            <div className="championLoader_leftSide_stats_item" style={{width: '70%'}}></div>
            <div className="championLoader_leftSide_stats_item" style={{width: '80%'}}></div>
            <div className="championLoader_leftSide_stats_item" style={{width: '50%'}}></div>
            <div className="championLoader_leftSide_stats_item" style={{width: '60%'}}></div>
            <div className="championLoader_leftSide_stats_item" style={{width: '90%'}}></div>
          </div>
        </div>
        <div className="championLoader_rightSide">
          <div className="championLoader_rightSide_item" style={{width: '100%'}}></div>
          <div className="championLoader_rightSide_item" style={{width: '100%'}}></div>
          <div className="championLoader_rightSide_item" style={{width: '100%'}}></div>
          <div className="championLoader_rightSide_item" style={{width: '100%'}}></div>
          <div className="championLoader_rightSide_item" style={{width: '60%'}}></div>
        </div>
        </>
      }
      </div>
    </div>
  )
}
export default ChampionPage;