//component for basic statisctic about summoner
import WinrateBarComponent from "./WinrateBarComponent";

interface Props {
  name: string | undefined;
  doubleWinrate: string;
  soloWinrate: string;
  profileIconId: number | undefined;
  placeSolo: number
  placeDouble: number
}
console.log()
const SummonerInfoStats: React.FC<Props> = ({ name, soloWinrate, doubleWinrate, profileIconId, placeSolo, placeDouble }) => {
  return (
    <>
    <div className="summonerInfo_icon">
      <img src={"https://raw.communitydragon.org/latest/game/assets/ux/summonericons/profileicon" + profileIconId + ".png"} alt="" />
    </div>
    <div className="summonerInfo_container">
      <div className="summonerInfo_name">
        {name}
      </div>
      <div className="summonerInfo_stats">
        <div className="summonerInfo_stats_solo summonerInfo_stats_container">
          <div className="summonerInfo_stats_container_title">Winrate Solo: {soloWinrate}</div>
          <div className="summonerInfo_stats_container_progressbar"><WinrateBarComponent width={soloWinrate} /></div>
          <div className="summonerInfo_stats_container_title">Avg Place Solo: {placeSolo}</div>
          <div className="summonerInfo_stats_container_progressbar"><WinrateBarComponent width={placeSolo !== 0 ? (100 - (placeSolo - 1) * 25).toFixed(2) + "%"  : "0"} /></div>

        </div>
        <div className="summonerInfo_stats_double summonerInfo_stats_container">
          <div className="summonerInfo_stats_container_title">Winrate Double: {doubleWinrate}</div>
          <div className="summonerInfo_stats_container_progressbar"><WinrateBarComponent width={doubleWinrate} /></div>
          <div className="summonerInfo_stats_container_title">Avg Place Double: {placeDouble}</div>
          <div className="summonerInfo_stats_container_progressbar"><WinrateBarComponent width={placeDouble !== 0 ? (100 - (placeDouble - 1) * 25).toFixed(2) + "%"  : "0"} /></div>
        </div>
      </div>
    </div>
    </>
  )
}

export default SummonerInfoStats;