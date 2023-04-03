import { useEffect, useState } from "react";
import Match from "./Match";
import { IAugments, ILittleLegendsImages } from "../../interfaces";
interface Props {
  match: string[]
  region: string;
  puuid: string
}

const MatchHistory: React.FC<Props> = ({match, region, puuid}) => {
  const [data, setData] = useState<ILittleLegendsImages>()
  const [augments, setAugment] = useState<IAugments>()
  const [heroAugments, setHeroAugments] = useState<IAugments>()
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
        fetch("http://ddragon.leagueoflegends.com/cdn/" + data[0] + "/data/en_US/tft-tactician.json"),
        fetch("http://ddragon.leagueoflegends.com/cdn/" + data[0] + "/data/en_US/tft-hero-augments.json"),
        fetch("http://ddragon.leagueoflegends.com/cdn/" + data[0] + "/data/en_US/tft-augments.json")
      ])
        .then(responses => Promise.all(responses.map(response => response.json())))
        .then(dataAll => {
          setData(dataAll[0]);
          setHeroAugments(dataAll[1]);
          setAugment(dataAll[2]);
          console.log(dataAll)
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
        {match.slice(0,7).map((item, index )=> <Match version={version ?? '13.6.1'} augments={augments} heroAugments={heroAugments} tacticanInfo={data} key={index} puuid={puuid} region={region} match={item}/>)}
      </div>
      </>
      }
      </>
  )
}
export default MatchHistory;