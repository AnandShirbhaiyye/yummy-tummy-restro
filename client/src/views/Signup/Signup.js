import React, {useState}from "react";
import "./Signup.css";
import axios from "axios";

  function Signup() {
  const [name, setName]= useState("");
  const[email, setEmail] = useState("");
  const[phone, setPhone] = useState("");
  const[password, setPassword] = useState("");
  const[role, setRole] = useState("user")

  async function signupUser(){
    const response = await axios.post('/signup',{
      name:name,
      email:email,
      phone:phone,
      password:password,
      role:role
    })
    console.log(response.data)
    if(response.data.success){
      alert(response.data.message)
      window.location.href='/login'
    }
     else{
      alert(response.data.message);
      setName('')
      setEmail('')
      setPhone('')
      setPassword('')
     }
  }
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
                      value={name}
                      onChange={(e)=>setName(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e)=>setEmail(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e)=>setPassword(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="phone"
                      className="form-control"
                      id="mobile"
                      placeholder="Mobile Number"
                      value={phone}
                      onChange={(e)=>setPhone(e.target.value)}
                    />
                  </div>
                  <button type="button" className="btn btn-warning w-100"
                  onClick={signupUser}><b>Signup</b></button>
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