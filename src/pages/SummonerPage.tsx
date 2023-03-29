import { FunctionComponent } from 'react';
import ShowRank from '../components/ShowRank';
interface animeType {
  summonerId: string | undefined,
  name: string | undefined
}
const SummonerPage: FunctionComponent<animeType> = ({ summonerId, name }) => {
  return (
    <div className="profileContainer">
      <ShowRank summonerId={summonerId} name={name} type="double"/>
      <ShowRank summonerId={summonerId} name={name} type="solo"/>
    </div>
  )
}
export default SummonerPage;