import { IFiles } from "../../interfaces"
import {AiFillStar} from 'react-icons/ai'
interface Props {
  tier: number,
  rarity: number,
  items: string[],
  championId: string,
  championsInfo: IFiles | undefined,
  itemsInfo: IFiles | undefined,
}

const ChampionIcon: React.FC<Props> = ({tier, rarity, items, championId, championsInfo, itemsInfo}) => {
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
      <div className="championContainer_images" style={{borderColor: getRarityColor()}}>
        <img src={ 'http://ddragon.leagueoflegends.com/cdn/13.6.1/img/tft-champion/' + championsInfo?.data[championId].image.full} alt="" />
      </div>
      <div className="championContainer_items">
        {items.map((item, index) => {
          return (
            <div key={index} className="championContainer_items_itemImg">
              <img src={'http://ddragon.leagueoflegends.com/cdn/13.6.1/img/tft-item/'+item+'.png'} alt="" />
            </div>
          )
        })}
      </div>
    </>
  )
}
export default ChampionIcon
