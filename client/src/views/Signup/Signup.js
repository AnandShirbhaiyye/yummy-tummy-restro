import React from "react";
import "./Signup.css";

function Signup() {
  return (
    <>
      <div className="container mt-3">
        <div className="signup">
          <div className="row">
            <h4 className="text-center signup-quote mt-2"><u>“Make a customer, not a sale.🤩”</u></h4>
            <h2 className="text-center mt-3">Yummy-Tummy...🍽️😋</h2>
            <div className="col-md-6">
              <div className="mt-5 ">
                <form>
                  <div className="mb-3 mt-5">
                    <input
                      type="text"
                      className="form-control"
                      id="fullName"
                      placeholder="FullName"
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="Email"
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder="Password"
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="phone"
                      className="form-control"
                      id="mobile"
                      placeholder="Mobile Number"
                    />
                  </div>
                  <button type="button" className="btn btn-warning w-100"><b>Signup</b></button>
                </form>
              </div>
            </div>
            <div className="col-md-6 mt-3 ">
              {/* <img
                src={restroImg}
                alt=""
                className="signup-restro-img mx-auto d-block"
              /> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;