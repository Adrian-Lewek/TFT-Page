//component for showing champion mainly in match history
import { IFiles } from "../../interfaces"
import {AiFillStar} from 'react-icons/ai'
import ItemIcon from "./ItemIcon";
import { useState } from "react";
import ShowInformations from "./ShowInformations";
import { Link } from "react-router-dom";
interface Props {
  tier: number,
  rarity: number,
  name: string,
  version: string,
  items: string[],
  championId: string,
  championsInfo: IFiles | undefined,
  itemsInfo: IFiles | undefined,
}

const ChampionIcon: React.FC<Props> = ({tier, rarity, items, version, championId, championsInfo, itemsInfo, name}) => {
  const [showInfo, setShowInfo] = useState(false)
  const handleMouseEnter = () => {
    setShowInfo(true);
  };

  const handleMouseLeave = () => {
    setShowInfo(false);
  };

  function getStars(){
    switch(tier){
      case 1:
        return (<div className="championContainer_stars"></div>);
      case 2:
        return (<div className="championContainer_stars championContainer_stars_secondTier"><AiFillStar/><AiFillStar/></div>)
      case 3:
        return (<div className="championContainer_stars championContainer_stars_thirdTier"><AiFillStar/><AiFillStar/><AiFillStar/></div>)
    }
  }
  function getRarityColor(){
    switch(rarity){
      case 0:
        return "#565860";
      case 1:
        return "#11b288";
      case 2:
        return "#207ac7";
      case 4:
        return "#976ad4";
      case 6:
        return "#ffc528";
      default:
        return "#444445";
    }
  }
  return(
    <div className="championContainer">
      <div className="championContainer_stars">
        {getStars()}
      </div>
      <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="championContainer_images" style={{borderColor: getRarityColor()}}>
        <Link to={"/database/" + version + "/champions/" + championId}>
        <img src={ 'https://ddragon.leagueoflegends.com/cdn/' + version + '/img/tft-champion/' + championsInfo?.data[championId].image.full} alt="" />
        {showInfo ? <ShowInformations name={name}/> : ""}
        </Link>
      </div>
      <div className="championContainer_items">
        {items.map((item, index) => {
          const itemName = itemsInfo?.data[item] ? itemsInfo?.data[item].name : (itemsInfo?.data["TFT8_EmblemItems/"+item] ? itemsInfo?.data["TFT8_EmblemItems/"+item].name : (itemsInfo?.data["Set5_RadiantItems/"+item] ? itemsInfo?.data["Set5_RadiantItems/"+item].name : item));
          return (
            <ItemIcon name={itemName} key={index} url={'https://ddragon.leagueoflegends.com/cdn/' + version + '/img/tft-item/' + item + '.png'}/>
          )
        })}
      </div>
    </div>
  )
}
export default ChampionIcon
