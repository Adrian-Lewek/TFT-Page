import {IFiles, ILittleLegendsImages, IMatchInfo} from '../../interfaces/index'
import ChampionIcon from './ChampionIcon'
import TraitIcon from './TraitIcon'
interface Props {
  match: IMatchInfo | undefined
  tacticanInfo: ILittleLegendsImages | undefined
  version: string
  heroAugments: IFiles | undefined,
  champions: IFiles | undefined,
  items: IFiles | undefined,
  traitInfo: IFiles | undefined,
  getBackgroundColor: (props:number) => "#7d1092" | "#d8b01c" | "#9c530f" | "#949494" | "#2dc3f1" | undefined
}

const ShowAllPlayers: React.FC<Props> = ({match, tacticanInfo, version, champions, items, traitInfo, getBackgroundColor}) => {
  const matches = match?.info.participants.sort((a,b) => a.placement - b.placement);
  return(
    <div className="morePlayerContainer_table">
    <table>
      <thead>
        <tr>
          <th>Placement</th>
          <th>Units</th>
          <th>Traits</th>
          <th>Losses</th>
          <th>Augments</th>
          <th>Gold Remaining</th>
          <th>Round Eliminated</th>
        </tr>
        </thead>
        <tbody>
        {matches?.map((player, index) => {
          return(
            <tr key={index}>
              <td className='morePlayerContainer_placement'>
                <div className="morePlayerContainer_placement_cont">
                  <div className="morePlayerContainer_placement_place"> #{player.placement} </div>
                  <div className="morePlayerContainer_placement_profilePic">
                    <img src={'http://ddragon.leagueoflegends.com/cdn/' + version + '/img/tft-tactician/' + tacticanInfo?.data[player?.companion.item_ID ?? 1].image.full} alt="" />
                  </div>
                </div>
              </td>
              <td className='morePlayerContainer_champions'>
              <div className="matchContainer_champions">
                {player?.units.map((unit, index) => {
                  return (<div className="championContainer" key={index}>
                    { champions?.data[unit.character_id] ? 
                  <ChampionIcon 
                  name={champions.data[unit.character_id].name}
                  championsInfo={champions} 
                  itemsInfo={items} tier={unit.tier} 
                  rarity={unit.rarity} 
                  items={unit.itemNames} 
                  championId={unit.character_id}
                /> : null}
            </div>)
          })}
        </div>
              </td>
              <td className='morePlayerContainer_traits'>
                <div className="morePlayerContainer_traits_con">
                  {player ? player.traits.filter(trait => trait.tier_current > 0).sort((a,b) => b.style - a.style).map((trait, index) => {
                    return(
                      <TraitIcon name={traitInfo?.data[trait.name]? traitInfo?.data[trait.name].name : "" } key={index} url={'http://ddragon.leagueoflegends.com/cdn/13.6.1/img/tft-trait/' + traitInfo?.data[trait.name].image.full} styles={{backgroundColor: getBackgroundColor(trait.style)}}/>
                    )
                  }) : ""}
                </div>
              </td>
              <td>dsa</td>
              <td>dsa</td>
              <td>dsa</td>
              <td>dsa</td>
            </tr>
          )
        })}
        </tbody>
    </table>
    </div>
  )
}
export default ShowAllPlayers;
