
import ShowRank from '../components/ShowRank';

function SummonerPage() {
  return (
    <div className="profileContainer">
      <ShowRank type="solo"/>
      <ShowRank type="double"/>
    </div>
  )
}
export default SummonerPage;