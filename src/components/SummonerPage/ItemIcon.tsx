import {useState} from 'react'
import ShowInformations from './ShowInformations';
interface Props {
  url: string
  name: string
}

const ItemIcon: React.FC<Props> = ({url, name}) => {
  const [showInfo, setShowInfo] = useState(false)
  const handleMouseEnter = () => {
    setShowInfo(true);
  };

  const handleMouseLeave = () => {
    setShowInfo(false);
  };
  return (
    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="championContainer_items_itemImg">
      <img src={url} alt="" />
      {showInfo ? <ShowInformations name={name}/> : ""}
    </div>
  )
}
export default ItemIcon;