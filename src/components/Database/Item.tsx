import { useEffect, useState } from "react";
import { IFiles, ILang_EN } from "../../interfaces";
import { useParams } from "react-router-dom";

interface IProps{
  dataInfoAll: ILang_EN;
}
interface ITraitsArray {
  image: string,
  id: string
}

const Items:React.FC<IProps> = ({dataInfoAll}) => {
  const [itemsList, setItemsList] = useState<ITraitsArray[]>();
  const {version} = useParams();
  useEffect(() => {
    fetch('https://ddragon.leagueoflegends.com/cdn/' + version + '/data/en_US/tft-item.json')
    .then(response => {
      if(response.ok) return response.json();
      throw response
    })
    .then(data => {
      const dataTraits:IFiles = data
      const traitsArray = Object.values(dataTraits.data).map(item => {
        return ({image: item.image.full, id: item.id})
      })
      setItemsList(traitsArray)
    })
    .catch(error => console.log(error))
  },[])
  return (
    <div className="itemsContainer listContainer">
      
    </div>
  )
}
export default Items