import React from 'react'
import '../css/NavBar.css'

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
          <div className="search-wrapper">
            <span className="las la-search" />
            <input type="search" placeholder="Search here" />
          </div>
        
        </header>
      </div>
            
        </div>
    )
}

export default NavBar1
