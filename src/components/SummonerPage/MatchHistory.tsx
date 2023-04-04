import { useEffect, useState } from "react";
import Match from "./Match";
import { IFiles, ILittleLegendsImages } from "../../interfaces";
interface Props {
  match: string[]
  region: string;
  puuid: string
}

const MatchHistory: React.FC<Props> = ({match, region, puuid}) => {
  const [data, setData] = useState<ILittleLegendsImages>()
  const [augments, setAugment] = useState<IFiles>()
  const [heroAugments, setHeroAugments] = useState<IFiles>()
  const [champions, setChampions] = useState<IFiles>()
  const [items, setItems] = useState<IFiles>()
  const [loading, setLoading] = useState(true)
  const [version, setVersion] = useState()
  useEffect(() => {
    fetch('https://ddragon.leagueoflegends.com/api/versions.json')
    .then(response => {
      if(response.ok) return response.json();
      throw response;
    })
    .then(data => {
      setVersion(data[0])

      Promise.all([
        fetch("https://ddragon.leagueoflegends.com/cdn/" + data[0] + "/data/en_US/tft-tactician.json"),
        fetch("https://ddragon.leagueoflegends.com/cdn/" + data[0] + "/data/en_US/tft-hero-augments.json"),
        fetch("https://ddragon.leagueoflegends.com/cdn/" + data[0] + "/data/en_US/tft-augments.json"),
        fetch("https://ddragon.leagueoflegends.com/cdn/" + data[0] + "/data/en_US/tft-item.json"),
        fetch("https://ddragon.leagueoflegends.com/cdn/" + data[0] + "/data/en_US/tft-champion.json"),
      ])
        .then(responses => Promise.all(responses.map(response => response.json())))
        .then(dataAll => {
          setData(dataAll[0]);
          setHeroAugments(dataAll[1]);
          setAugment(dataAll[2]);
          setItems(dataAll[3]);
          setChampions(dataAll[4]);
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => setLoading(false));
      
    })
    .catch(error => {
      console.log(error);
    })

    

  }, [])
  return (
    <>
      { loading ? <div className="loader"/> : 
      <>
      <div className="matchHistory_lastPlace"></div>
      <div className="matchHistory_container">
        {match.slice(0,7).map((item, index )=> <Match version={version ?? '13.6.1'} champions={champions} items={items} augments={augments} heroAugments={heroAugments} tacticanInfo={data} key={index} puuid={puuid} region={region} match={item}/>)}
      </div>
      </>
      }
      </>
  )
}
export default MatchHistory;