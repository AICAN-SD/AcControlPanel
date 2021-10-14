import React from 'react'
import '../css/NavBar.css'
import NavBarDropDown from './NavBarDropDown'

function NavBar1() {
    return (
        <div>
             <div className="main-content">
        <header>
          <h2>
            <label htmlFor>
              <span className="las la-bars" />
            </label>
            Dashboard
          </h2>
        <NavBarDropDown></NavBarDropDown>
        
        </header>
      </div>
            
        </div>
    )
}

export default NavBar1
