import React from 'react'

function SwitchButton() {
    return (
        <div>
             <label className="switch" >
              <input type="checkbox" />
              <span className="slider round">
                <i className="fa fa-on" />
              </span>
            </label>
        </div>
    )
}

export default SwitchButton
