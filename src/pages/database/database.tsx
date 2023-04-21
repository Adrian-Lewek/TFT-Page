import Champions from "../../components/Database/Champions";
import { useEffect, useState } from "react";
import Augments from "../../components/Database/Augments";
import { ILang_EN } from "../../interfaces";
import Traits from "../../components/Database/Traits";
import Items from "../../components/Database/Item";

const Database: React.FC = () => {
  const [currentComponent, setCurrentComponent] = useState<JSX.Element>()
  const [activeNavItem, setActiveNavItem] = useState("champions")
  const [data, setData] = useState<ILang_EN>()
  function handleChangeList(component:JSX.Element, active: string){
    setCurrentComponent(component)
    setActiveNavItem(active)
  }
  useEffect(() => {
    fetch("https://raw.communitydragon.org/latest/cdragon/tft/en_us.json")
    .then(response => {
      if(response.ok) return response.json();
      throw response
    })
    .then(data => {
      setCurrentComponent(<Champions dataInfoAll={data}/>)
      setData(data)
    })
    .catch(error => console.log(error))
  },[])
  return (
    <>
    <div className="banner">
      <img src="https://i.pinimg.com/originals/bf/f2/49/bff2497c130e8149d59fc7aed62f175d.png" alt="tft banner" />
      <div className="banner_downside"/>
    </div>
    {data ?
    <div className="database">
      <div className="database_container">
        <div className="database_container_navbar">
          <div className="database_container_navbar_title">
            Lists
          </div>
          <div className={"database_container_navbar_item " + (activeNavItem === "champions" ? "active" : "")} onClick={() => handleChangeList(<Champions dataInfoAll={data}/>, "champions") }>Champions</div>
          <div className={"database_container_navbar_item " + (activeNavItem === "augments" ? "active" : "")} onClick={() => handleChangeList(<Augments dataInfoAll={data}/>, "augments") }>Augments</div>
          <div className={"database_container_navbar_item " + (activeNavItem === "traits" ? "active" : "")} onClick={() => handleChangeList(<Traits dataInfoAll={data}/>, "traits") }>Traits</div>
        </div>
        <div className="database_container_leftSide">
          {currentComponent}
        </div>
      </div>
    </div>
    : <div className="loader"></div>
    }
    </>
  )
}
export default Database;