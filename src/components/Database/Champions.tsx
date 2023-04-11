import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ILang_EN } from "../../interfaces";
import ChampionImg from "./ChampionsImg";

interface Props {
  dataInfoAll: ILang_EN;
}
interface IRowProps {
  tier: number
}
interface IChamps {
  id: string, 
  image: { full: string},
  name:string, 
  tier: number
}


const Champions: React.FC<Props> = ({dataInfoAll}) => {
  const {version} = useParams()
  const [championsList, setChampionsList] = useState<IChamps[]>();
  const ChampRow: React.FC<IRowProps> = ({tier}) => {
    return(
      <div className="championsContainer_row">
        <div className="championsContainer_row_title">{tier} Cost Champions</div>
        <div className="championsContainer_row_container">
        {
          championsList?.filter(champ => champ.tier === tier).map((champ, index) => {
            const champInfoAll = dataInfoAll.setData.find(item => item.champions.find(champs => champs.apiName === champ.id))?.champions.find(champs => champs.apiName === champ.id)
            return (
              <div className="championsContainer_championsList_champion" key={index} >
              {champInfoAll ? <ChampionImg champLink={"/database/" + version + "/champions/" + champInfoAll.apiName} rarity={champInfoAll.cost} setColor={getRarityColor} name={champInfoAll.name} img={champInfoAll.icon}/> : ""}
            </div>
            )
          })
        }
        </div>
      </div>
    )
  }
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
  useEffect(() => {
    fetch('https://ddragon.leagueoflegends.com/cdn/' + version + '/data/en_US/tft-champion.json')
    .then(response => {
      if(response.ok) return response.json();
      throw response
    })
    .then(data => {
      setChampionsList(Object.values(data.data))
    })
    .catch(error => console.log(error))
  },[])
  return (
    <>
    {championsList ? 
    <div className="championsContainer listContainer">
      <div className="title">Champions List</div>
      <ChampRow tier={5}/>
      <ChampRow tier={4}/>
      <ChampRow tier={3}/>
      <ChampRow tier={2}/>
      <ChampRow tier={1}/>
    </div>
    : <div className="loader"></div>
    }
    
    </>
  )
}
export default Champions;