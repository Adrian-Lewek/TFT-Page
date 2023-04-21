import { useState, useEffect } from "react";
import { IFiles, ILang_EN } from "../../interfaces";
import { useParams } from "react-router-dom";
import fnv from "fnv-plus";
interface ITraitsArray {
  image: string,
  id: string
}
interface IEffects {
  maxUnits: number,
  minUnits: number,
  style: number,
  variables: {
    [key: string]: number
  }
}
interface IProps {
  dataInfoAll: ILang_EN;
}
const Traits: React.FC<IProps> = ({dataInfoAll}) => {
  const {version} = useParams()
  const [traitsInfo, setTraitsInfo] = useState<ITraitsArray[]>()
  function traitDescTransform(desc: string, effects: IEffects[] | undefined){
    function swapVariable(value: string, eff: IEffects){
      if (value === "MinUnits") return eff.minUnits.toString();
          else if (value === "MaxUnits") return eff.maxUnits.toString();
          const normalKeys = Object.keys(eff.variables).find(key => {
            return (key.toLowerCase() === value.toLowerCase()) 
          })
          if (normalKeys !== undefined) return eff.variables[normalKeys].toString()
          
          if (value.indexOf('*100') !== -1) {
            const slicedValue = value.slice(0, value.indexOf('*100'))
            const SlicedKeys = Object.keys(eff.variables).find(key => {
              return (key.toLowerCase() === slicedValue.toLowerCase()) 
            })
            if (SlicedKeys !== undefined) return (Math.round(eff.variables[SlicedKeys] *100)).toString()
            const fnv_1a = fnv.fast1a32hex(slicedValue.toLowerCase())
            if (eff.variables[`{${fnv_1a}}`] !== undefined) return (Math.round(eff.variables[`{${fnv_1a}}`]*100)).toString()
          }
          const fnv_1a = fnv.fast1a32hex(value.toLowerCase())
          if (eff.variables[`{${fnv_1a}}`] !== undefined) return eff.variables[`{${fnv_1a}}`].toString()
          return "0"
    }
    let finalVersion:string[] = [desc]
    if(effects){
      const regex2 = /<row>(.*?)<\/row>/g;
      const secondCheck = desc.match(regex2)
      const rowCheck = secondCheck?.map(match => match.replace(/<\/?row>/g, ''));
      const regex = /<(expandRow)>(.*?)<\/\1>/;
      const firstCheck = regex.exec(desc);
      let values: string[] = [];
      const firstIndex = desc.indexOf("row") !== -1? desc.indexOf("<row>") : desc.indexOf("<expandRow>")
      const preValues = firstIndex !== -1?  desc.substring(0, firstIndex) : desc;
      let preValuesChanged: string = ""
      if(rowCheck !== undefined){
        values= effects.map((eff, index) => {
          return rowCheck[index].replace(/@.*?@/g, match => {
            return swapVariable(match.split('@')[1], eff);
          })
        })
      }
      else if (firstCheck !== null) {
        values = effects.map(eff => {
          return firstCheck[2].replace(/@.*?@/g, match => {
            return swapVariable(match.split('@')[1], eff);
           
          })
          
        })
      }
      if(preValues !== undefined){
        preValuesChanged = preValues.replace(/@.*?@/g, match => {
          return swapVariable(match.split('@')[1], effects[0]);
        })
      }
      finalVersion = preValuesChanged.replace(/<br\s*\/?>/g, "\n").split('\n').filter(item => item !== '').concat(values.filter(item => item !== '')).map(item => item.replace(/<[^>]*>/g, " "))
    }
    return finalVersion
  }
  useEffect(() => {
    fetch("https://ddragon.leagueoflegends.com/cdn/" + version + "/data/en_US/tft-trait.json")
    .then(response => {
      if(response.ok) return response.json();
      throw response
    })
    .then(data => {
      const dataTraits:IFiles = data
      const traitsArray = Object.values(dataTraits.data).map(trait => {
        return ({image: trait.image.full, id: trait.id})
      })
      setTraitsInfo(traitsArray)
    })
    .catch(error => console.log(error))
  },[])
  return (
    <>
    {traitsInfo === undefined? <div className="loader"></div> : 
      <div className="traitsContainer listContainer">
        <div className="title">Traits List</div>
        {traitsInfo.map((trait, index) => {
          const set = Object.values(dataInfoAll.sets).find(item => item.traits.find((traitName: { apiName: string; }) => traitName.apiName === trait.id))
          const traitsInfoAll = set?.traits.find((traitName: { apiName: string; }) => traitName.apiName === trait.id)
          return (
            <div key={index} className="traitsContainer_container">
              <div className="traitsContainer_container_upper">
                <img src={'https://ddragon.leagueoflegends.com/cdn/' + version + '/img/tft-trait/' + trait.image} alt="" />
                <div className="traitsContainer_container_title">{traitsInfoAll?.name}</div>
              </div>
              <div className="traitsContainer_container_down">
                <div className="traitsContainer_container_desc">{traitDescTransform(traitsInfoAll?.desc ?? "", traitsInfoAll?.effects).map((item, indexInfo)=> {
                  return (
                    <div key={indexInfo}>{item} <br/> </div>
                  )
                })}</div>
              </div>
            </div>
          )
          })}
      </div>
    }
    </>
  )
}
export default Traits;