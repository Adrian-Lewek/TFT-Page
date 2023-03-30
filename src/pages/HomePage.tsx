import { useState } from 'react';
import {FaSearch} from 'react-icons/fa'
import '../style/HomePage.scss';
import Select, { SingleValue } from 'react-select'
function HomePage () {
  const [searchUsername, setSearchUsername] = useState("");
  const [region, setRegion] = useState<string | undefined>("");
  const optionRegions = [
    {value: "eun1", label: "EUNE"},
    {value: "euw1", label: "EUW"},
    {value: "na", label: "NA"},
    {value: "kr", label: "KR"},
  ]

  
  return (
    <div className="HomePage">
      <div className="HomePage_mainBanner">
        <img src="https://i.pinimg.com/originals/bf/f2/49/bff2497c130e8149d59fc7aed62f175d.png" alt="" />
        <div className="HomePage_mainBanner_searchContainer">
          <div className="HomePage_mainBanner_searchContainer_item">
          <Select 
            options={optionRegions}  
            className="react-select-container"
            classNamePrefix="react-select"
            defaultValue={optionRegions[0]}
            name="year" 
            isClearable={false}
            onChange={(e) => setRegion(e?.value)}
          />
          </div>
          <div className="HomePage_mainBanner_searchContainer_item">
            <input type="text" name="searchUsername" placeholder="Summoner name..." value={searchUsername} onChange={(e) => setSearchUsername(e.target.value)} />
          </div>
          <div className="HomePage_mainBanner_searchContainer_item">
            <button ><FaSearch/></button>
          </div>
        </div>
      </div>
      <div className="HomePage_laderboardContainer"></div>
    </div>
  )
}
export default HomePage;