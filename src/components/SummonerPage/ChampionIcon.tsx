import { IFiles } from "../../interfaces"
import {AiFillStar} from 'react-icons/ai'
import ItemIcon from "./ItemIcon";
import { useState } from "react";
import ShowInformations from "./ShowInformations";
interface Props {
  tier: number,
  rarity: number,
  name: string,
  items: string[],
  championId: string,
  championsInfo: IFiles | undefined,
  itemsInfo: IFiles | undefined,
}

const ChampionIcon: React.FC<Props> = ({tier, rarity, items, championId, championsInfo, itemsInfo, name}) => {
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
        return "#363944";
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
    <>
      <div className="championContainer_stars">
        {getStars()}
      </div>
      <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="championContainer_images" style={{borderColor: getRarityColor()}}>
        <img src={ 'http://ddragon.leagueoflegends.com/cdn/13.6.1/img/tft-champion/' + championsInfo?.data[championId].image.full} alt="" />
        {showInfo ? <ShowInformations name={name}/> : ""}
      </div>
      <div className="championContainer_items">
        {items.map((item, index) => {
          return (
            <ItemIcon name={itemsInfo?.data[item] ? itemsInfo?.data[item].name : ""} key={index} url={'http://ddragon.leagueoflegends.com/cdn/13.6.1/img/tft-item/' + item + '.png'}/>
          )
        })}
      </div>
    </>
  )
}
export default ChampionIcon
