
import ShowRank from '../components/ShowRank';

function SummonerPage() {
  return (
    <div className="profileContainer">
      <ShowRank type="double"/>
      <ShowRank type="solo"/>
    </div>
  )
}
export default SummonerPage;