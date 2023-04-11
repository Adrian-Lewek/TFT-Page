import { useEffect, useState } from 'react';
import '../style/NavBar.scss'
import {NavLink} from 'react-router-dom';
function NavBar (){
  const [version, setVersion] = useState("13.7.1")
  useEffect(() =>{
    fetch('https://ddragon.leagueoflegends.com/api/versions.json')
    .then(response => {
      if(response.ok) return response.json();
      throw response;
    })
    .then(data => {
      setVersion(data[0])
    })
    .catch(error => console.log(error))
    
  },[])
  return (
    <div className="NavBar">
      <div className="NavBar_container">
        <div className="NavBar_container_logo">
          <NavLink to="/">TFT PAGE</NavLink>
        </div>
        <div className="NavBar_container_menuItems">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/stats">Stats</NavLink>
          <NavLink to={"/database/" + version}>Database</NavLink>
          <NavLink to="/patchNotes">Patch Notes</NavLink>
        </div>
      </div>
      
    </div>
  )
}
export default NavBar;