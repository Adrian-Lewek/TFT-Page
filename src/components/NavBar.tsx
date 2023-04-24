import { useEffect, useState } from 'react';
import '../style/navbar.scss'
import {NavLink} from 'react-router-dom';
import { animated, useTransition } from 'react-spring';
import {GiHamburgerMenu} from 'react-icons/gi'
function NavBar (){
  const [version, setVersion] = useState("13.7.1")
  const [activeNavMobile, setActiveNavMobile] = useState(false)
  const transition = useTransition(activeNavMobile, {
    from: {height: 0, opacity: 0, marginTop: 0},
    enter: {height: 150, opacity: 1, marginTop: 10},
    leave: {height: 0, opacity: 0, marginTop: 0}
  })
  const NavItems = () => {
    return(
    <>
    <NavLink to="/">Home</NavLink>
    <NavLink to={"/database/" + version}>Database</NavLink>
    <NavLink to={"/patchNotes/" + version}>Patch Notes</NavLink>
    </>
    )
  }
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
          <div className="NavBar_container_logo_burger" onClick={() => setActiveNavMobile(prev => !prev)}><GiHamburgerMenu/></div>
        </div>
        <div className={"NavBar_container_menuItems"}>
          <NavItems/>
        </div>
        { transition((style, item) =>
          item ? <animated.div style={style} className={"navMobileActive"}>
          <NavItems/>
          </animated.div> : ""
        ) }
      </div>
      
    </div>
  )
}
export default NavBar;