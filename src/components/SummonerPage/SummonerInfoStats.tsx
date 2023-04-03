import WinrateBarComponent from "./WinrateBarComponent";

interface Props {
  name: string | undefined;
  doubleWinrate: string;
  soloWinrate: string;
  profileIconId: number | undefined;
}

const SummonerInfoStats: React.FC<Props> = ({ name, soloWinrate, doubleWinrate, profileIconId }) => {
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
          <div className="summonerInfo_stats_container_title">Winrate Solo: {soloWinrate}</div>
          <div className="summonerInfo_stats_container_progressbar"><WinrateBarComponent width={soloWinrate} /></div>

        </div>
        <div className="summonerInfo_stats_double summonerInfo_stats_container">
          <div className="summonerInfo_stats_container_title">Winrate Double: {doubleWinrate}</div>
          <div className="summonerInfo_stats_container_progressbar"><WinrateBarComponent width={doubleWinrate} /></div>
          <div className="summonerInfo_stats_container_title">Winrate Double: {doubleWinrate}</div>
          <div className="summonerInfo_stats_container_progressbar"><WinrateBarComponent width={doubleWinrate} /></div>
        </div>
      </div>
    </div>
    </>
  )
}

export default SummonerInfoStats;