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
          <NavLink to="/">Home</NavLink>
          <NavLink to="/stats">Stats</NavLink>
          <NavLink to="/database">Database</NavLink>
          <NavLink to="/patchNotes">Patch Notes</NavLink>
        </div>
      </div>
      
    </div>
  )
}
export default NavBar;