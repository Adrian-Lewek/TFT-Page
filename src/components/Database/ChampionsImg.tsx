import { useState } from "react";
import ShowInformations from "../SummonerPage/ShowInformations";
import { Link } from "react-router-dom";

interface Props {
  img: string,
  name: string,
  rarity: number,
  champLink: string,
  setColor: (rarity: number) => "#565860" | "#11b288" | "#207ac7" | "#976ad4" | "#ffc528" | "#444445"; 
}

const ChampionImg: React.FC<Props> = ({img, name, setColor, rarity, champLink}) => {
  const [showInfo, setShowInfo] = useState(false)
  const handleMouseEnter = () => {
    setShowInfo(true);
  };

  const handleMouseLeave = () => {
    setShowInfo(false);
  };

  return (
    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} style={{borderColor: setColor(rarity)}} className="champ_container">
      <Link to={champLink}>
        <img src={"https://raw.communitydragon.org/latest/game/" + img.toLocaleLowerCase().replace('.dds', '.png')} alt="" />
        {showInfo ? <ShowInformations name={name}/> : ""}
      </Link>
    </div>
  )
}
export default ChampionImg;