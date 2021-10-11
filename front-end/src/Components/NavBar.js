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
          <div className="dropdown">
            <button
              className="btn btn-secondary dropdown-toggle btn1"
              type="button"
              id="dropdownMenu2"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Schedule
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
              <button className="dropdown-item" type="button">
                Action
              </button>
              <button className="dropdown-item" type="button">
                Another action
              </button>
              <button className="dropdown-item" type="button">
                Something else here
              </button>
            </div>
          </div>
          <div className="dropdown">
            <button
              className="btn btn-secondary dropdown-toggle btn2"
              type="button"
              id="dropdownMenu2"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              On Off Machines
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
              <button className="dropdown-item" type="button">
                Action
              </button>
              <button className="dropdown-item" type="button">
                Another action
              </button>
              <button className="dropdown-item" type="button">
                Something else here
              </button>
            </div>
          </div>
        </header>
      </div>
            
        </div>
    )
}

export default NavBar1
