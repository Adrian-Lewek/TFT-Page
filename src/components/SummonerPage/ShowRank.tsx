import { FunctionComponent} from 'react';
import {IDataSummonerRank} from '../../interfaces/index'
type iProps = {
  type: string,
  DataRank: IDataSummonerRank | undefined
}

const ShowRank: FunctionComponent<iProps> = ({ type, DataRank }) => {
  function showRank(){
    const img = "https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/ranked-emblem/emblem-" + (DataRank?.tier === undefined ? "" : DataRank?.tier.toLowerCase()) + ".png"
    return (
      <div className='rankContainer_rank'>
        { 
          DataRank?.tier === undefined? 
          <div className="rankContainer_rank_img rankContainer_rank_unrankedImg">
          <img src="https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-shared-components/global/default/unranked.png" alt="your Rank" />
          </div>
          : 
          <div className="rankContainer_rank_img">
          <img src={img} alt="your Rank" />
        </div>
        }
        

        <div className='rankContainer_rank_rankInfoTier rankContainer_rank_text'>{DataRank?.tier === undefined? "Unranked" : DataRank?.tier + " " + DataRank?.rank}</div>
        <div className='rankContainer_rank_rankInfo rankContainer_rank_text'>{DataRank?.tier === undefined? null : DataRank?.leaguePoints + " LP"}</div>
        <div className='rankContainer_rank_rankedInfo rankContainer_rank_text'><b>Ranked: </b> {type === "solo" ? "Solo/Duo" : "Double Up"}</div>
      </div>
    )
  }

  return (
    <div className="rankContainer">
      {showRank()}
    </div>
  )
}
export default ShowRank;