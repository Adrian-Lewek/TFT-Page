//component for showing all players who play match and stats
import {IFiles, ILittleLegendsImages, IMatchInfo} from '../../interfaces/index'
import AugmentIcon from './AugmentIcon'
import ChampionIcon from './ChampionIcon'
import TraitIcon from './TraitIcon'
interface Props {
  match: IMatchInfo | undefined
  tacticanInfo: ILittleLegendsImages | undefined
  version: string
  augments: IFiles | undefined,
  heroAugments: IFiles | undefined,
  champions: IFiles | undefined,
  items: IFiles | undefined,
  traitInfo: IFiles | undefined,
  getDoubleUpPlacement: (props:number) => number,
  getBackgroundColor: (props:number) => "#7d1092" | "#d8b01c" | "#9c530f" | "#949494" | "#2dc3f1" | undefined
}

const ShowAllPlayers: React.FC<Props> = ({match, tacticanInfo, version, champions, items, traitInfo, getBackgroundColor, heroAugments, augments, getDoubleUpPlacement}) => {
  const matches = match?.info.participants.sort((a,b) => a.placement - b.placement);
  return(
    <div className="morePlayerContainer_table">
    <table>
      <thead>
        <tr>
          <th>Placement</th>
          <th>Units</th>
          <th>Traits</th>
          <th>Augments</th>
          <th>Level</th>
          <th>Gold <br/> Remaining</th>
          <th>Round <br/>Eliminated</th>
        </tr>
        </thead>
        <tbody>
        {matches?.map((player, index) => {
          return(
            <tr key={index}>
              <td className='morePlayerContainer_placement'>
                <div className="morePlayerContainer_placement_cont">
                  <div className="morePlayerContainer_placement_place"> #{match?.info.tft_game_type === "pairs" ? getDoubleUpPlacement(player.placement) : player.placement} </div>
                  <div className="morePlayerContainer_placement_profilePic">
                    <img src={'https://ddragon.leagueoflegends.com/cdn/' + version + '/img/tft-tactician/' + tacticanInfo?.data[player?.companion.item_ID ?? 1].image.full} alt="" />
                  </div>
                </div>
              </td>
              <td className='morePlayerContainer_champions'>
              <div className="matchContainer_champions">
                {player?.units.sort((a,b)=>{
                  if(a.tier === b.tier) {
                    if(b.itemNames.length === a.itemNames.length) return b.rarity - a.rarity
                    return b.itemNames.length - a.itemNames.length
                  }
                  return b.tier - a.tier
                }).map((unit, index) => {
                  if( champions?.data[unit.character_id] ) 
                    return (
                    <ChampionIcon 
                      key={index}
                      version={version}
                      name={champions.data[unit.character_id].name}
                      championsInfo={champions} 
                      itemsInfo={items} tier={unit.tier} 
                      rarity={unit.rarity} 
                      items={unit.itemNames} 
                      championId={unit.character_id}
                    />
                    );
                  else return null;
          })}
        </div>
              </td>
              <td className='morePlayerContainer_traits'>
                <div className="morePlayerContainer_traits_con">
                  {player ? player.traits.filter(trait => trait.tier_current > 0).sort((a,b) => b.style - a.style).map((trait, index) => {
                    if(traitInfo?.data[trait.name] !== undefined)
                    return(
                      <TraitIcon name={traitInfo?.data[trait.name].name } key={index} url={'https://ddragon.leagueoflegends.com/cdn/' + version + '/img/tft-trait/' + traitInfo?.data[trait.name].image.full} styles={{backgroundColor: getBackgroundColor(trait.style)}}/>
                    )
                    else return null;
                  }) : ""}
                </div>
              </td>
              <td className='morePlayerContainer_augments'>
                <div className="morePlayerContainer_augments_con">
                  {player ? player.augments.map((augment, index) => {
                    if( heroAugments?.data[augment] || augments?.data[augment]){
                      const img = heroAugments?.data[augment] ? 'https://ddragon.leagueoflegends.com/cdn/' + version + '/img/tft-hero-augment/' + heroAugments.data[augment].image.full : 'https://ddragon.leagueoflegends.com/cdn/' + version + '/img/tft-augment/' + augments?.data[augment].image.full;
                      return(<AugmentIcon key={index} name={heroAugments?.data[augment] ? heroAugments.data[augment].name  : (augments?.data[augment].name ?? "")} url={img}/>)
                    } else return null
                  }) : ""}
                </div>
              </td>
              <td>{player.level}</td>
              <td>{player.gold_left}</td>
              <td>{player.last_round}</td>
            </tr>
          )
        })}
        </tbody>
    </table>
    </div>
  )
}
export default ShowAllPlayers;
