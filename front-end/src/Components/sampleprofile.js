import React from 'react'

function sampleprofile() {
    return (
        <div>
          <link
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.2/dist/css/bootstrap.min.css"
            rel="stylesheet"
            integrity="sha384-uWxY/CJNBR+1zjPWmfnSnVxwRheevXITnMqoEIeG1LJrdI0GlVs/9cVSyPYXdcSF"
            crossOrigin="anonymous"
          />
          <button type="button" className="btn btn-default btn2">
            Floor Profile
          </button>
          <div className="rectangle">
            <div>
              <input className="name" placeholder="Profile Name" />
            </div>
            <p>Choose Floors</p>
            <div className="row">
              <div className="col-sm-4">
                <span className="A">Floor 1</span>
                <div className="form-check chk">
                  <input
                    className="form-check-input ul"
                    type="checkbox"
                    defaultValue
                    id="flexCheckDefault"
                  />
                  <label className="form-check-label" htmlFor="flexCheckDefault">
                    Room 1
                  </label>
                </div>
              </div>
              <div className="col-sm-4">
                .<span className="B">Floor 2</span>
                <div className="form-check chk1">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    defaultValue
                    id="flexCheckDefault"
                  />
                  <label className="form-check-label" htmlFor="flexCheckDefault">
                    Room 2
                  </label>
                </div>
              </div>
            </div>
            <div className="row row1">
              <div className="col-sm-4">
                <input
                  type="text"
                  className="form-control"
                  aria-label="First name"
                />
              </div>
              <div className="col-sm-4">
                <input
                  type="text"
                  className="form-control"
                  aria-label="Last name"
                />
              </div>
              <div className="col-sm-4">
                <button type="button" className="btn btn-default btn1">
                  Add Field
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

export default sampleprofile
