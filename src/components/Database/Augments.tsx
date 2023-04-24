import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { ILang_EN } from "../../interfaces";
import fnv from "fnv-plus";
import AugmentsList from "./AumentsList";

interface Props {
  dataInfoAll: ILang_EN;
}
interface IAugments {
  id: string, 
  image: { full: string},
  name:string, 
  tier: number
}

const Augments: React.FC<Props> = ({dataInfoAll}) => {
  const [augments, setAugment] = useState<IAugments[]>()
  const [heroAugments, setHeroAugments] = useState<IAugments[]>()
  const [currentAugmentType, setCurrentAugmentType] = useState("hero")
  const [loading, setLoading] = useState(true)
  const {version} = useParams()
  //tranform description to readable
  function descTransform(desc: string, variables: {[key: string]: number} | undefined) {
    let newStr = "";
    if (variables !== undefined){
      newStr = desc.replace(/<[^>]*>/g, "").replace(/@.*?@/g, match => {
        const value:string = match.split('@')[1];
        const normalKeys = Object.keys(variables).find(key => {
          return (key.toLowerCase() === value.toLowerCase()) 
        })
        if (normalKeys !== undefined) return variables[normalKeys].toString()
        if (value.indexOf('*100') !== -1) {
          const slicedValue = value.slice(0, value.indexOf('*100'))
          const SlicedKeys = Object.keys(variables).find(key => {
            return (key.toLowerCase() === slicedValue.toLowerCase()) 
          })
          if (SlicedKeys !== undefined) return (Math.round(variables[SlicedKeys] *100)).toString()
          const fnv_1a = fnv.fast1a32hex(slicedValue.toLowerCase())
          if (variables[`{${fnv_1a}}`] !== undefined) return (Math.round(variables[`{${fnv_1a}}`]*100)).toString()
        }
        const fnv_1a = fnv.fast1a32hex(value.toLowerCase())
        if (variables[`{${fnv_1a}}`] !== undefined) return variables[`{${fnv_1a}}`].toString()
        return ("0")
      })
    }
    return newStr
  }
  const augmentsList = () =>(currentAugmentType === "hero" ? heroAugments : augments)?.map(augment => {
    const augmentInfoAll = dataInfoAll.items.find(item => item.apiName === augment.id)
    const desc = descTransform(augmentInfoAll?.desc ?? "", augmentInfoAll?.effects);
    return (
      {
        name: augmentInfoAll?.name,
        desc: desc,
        hero: desc.split(' ')[2],
        img: 'https://ddragon.leagueoflegends.com/cdn/' + version + '/img/' + (currentAugmentType === "hero" ? 'tft-hero-augment/' : 'tft-augment/') + augment.image.full
      }
    )
  })
  // 
  useEffect(() => {
    Promise.all([
      fetch("https://ddragon.leagueoflegends.com/cdn/" + version + "/data/en_US/tft-hero-augments.json"),
      fetch("https://ddragon.leagueoflegends.com/cdn/" + version + "/data/en_US/tft-augments.json"),
    ])
    .then(responses => Promise.all(responses.map(response => response.json())))
    .then(dataAll => {
      setHeroAugments(Object.values(dataAll[0].data))
      setAugment(Object.values(dataAll[1].data))
    })
    .catch(error => {
      console.log(error);
    })
    .finally(() => setLoading(false));
  },[])
  return (
    <>
    {
      loading ? <div className="loader"></div>:
      <div className="augmentsContainer listContainer">
        <div className="title">Augments List</div>
        <div className="augmentsContainer_nav">
          <div className={"augmentsContainer_nav_item " + (currentAugmentType === "hero" ? "activeAugment" : "")} onClick={() =>setCurrentAugmentType("hero")}>Hero Augments</div>
          <div className={"augmentsContainer_nav_item " + (currentAugmentType === "normal" ? "activeAugment" : "")} onClick={() =>setCurrentAugmentType("normal")}>Normal Augments</div>
        </div>
        <div className="augmentsContainer_augments">
          {augmentsList()?.sort((a,b) => {
            if (a.hero < b.hero) {
              return -1;
            }
            if (a.hero > b.hero) {
              return 1;
            }
            return 0;
          }).map((augment, index) => {
            return (
              <AugmentsList img={augment.img} name={augment.name ?? ""} desc={augment.desc}/>
            )
          })} 
        </div>
      </div>
    }
    </>
  )
}
export default Augments;