import { useState } from "react";
import ShowInformations from "./ShowInformations";

interface Props {
  styles: {
    backgroundColor: string | undefined
  },
  url: string
  name: string
}

const TraitIcon: React.FC<Props> = ({styles, url, name}) => {
  const [showInfo, setShowInfo] = useState(false)
  const handleMouseEnter = () => {
    setShowInfo(true);
  };

  const handleMouseLeave = () => {
    setShowInfo(false);
  };
  return (
    <div className="matchContainer_traits_traitHover"  onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className='matchContainer_traits_trait' style={styles}>
        <img src={ url } alt="" />
        
      </div>
      {showInfo ? <ShowInformations name={name}/> : ""}
    </div>
  )
}
export default TraitIcon;