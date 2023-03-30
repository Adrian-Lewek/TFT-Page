import '../style/NavBar.scss'
import {NavLink} from 'react-router-dom';
function NavBar (){
  return (
    <div className="NavBar">
      <div className="NavBar_container">
        <div className="NavBar_container_logo">
          <NavLink to="/">TFT PAGE</NavLink>
        </div>
        <div className="NavBar_container_menuItems">
          <NavLink to="/profile">Profile</NavLink>
          <NavLink to="/Champions">Stats</NavLink>
          <NavLink to="/Items">Database</NavLink>
          <NavLink to="/Stats">Patch Notes</NavLink>
        </div>
      </div>
      
    </div>
  )
}
export default NavBar;