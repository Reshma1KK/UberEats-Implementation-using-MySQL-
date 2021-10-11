import React, {useState,useEffect} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Axios from "axios";
import NavigationBar from "../LogOut/NavigationBar.jsx";
import Links from "../LogOut/link.js";
import backendServer from "../../webConfig.js";

// axios.post(`${backendServer}/creategroup`, groupDetails).then((response) => {

function CustomerLogin() {

  const[emailErr,setEmailErr]=useState({});
  const[passwordErr,setPasswordErr]=useState({});


    const[email,setEmail] = useState("");
    const[password,setPassword] = useState("");
    const[user,setUser] = useState("");

    // const[passwordList,setPasswordList]=useState("");

    // useEffect(() => {
    //     Axios.get("http://localhost:3001/ShowPassword/Customer")
    //     .then((response) => {
    //       setPasswordList(response.data);
    //     })
    // }, [])


    const[customerStatus,setCustomerSatus]=useState("");

    const customerLogin = (e) => {
      e.preventDefault();
      const isValid = formValidation();
      if(isValid){
      Axios.post(`${backendServer}/CustomerLogin`,{
        email:email,
        password:password
      }).then((response) => {
        if(response.data.message){
          localStorage.setItem("isAuthenticated","false");
          setCustomerSatus(response.data.message)
        }
        else{
          setUser(response.data);
          localStorage.setItem("user", JSON.stringify(response.data));
          localStorage.setItem("isAuthenticated","true");
          setCustomerSatus("Logged In successfully!!");
          localStorage.setItem("cartVal","");
          window.open("./CustomerLandingPage","_self");
          console.log(JSON.stringify(response.data));
        }
      });
    }
};
  const formValidation = () => {
    const emailErr={};
    const passwordErr={};
    let isValid=true;


    if(email.trim().length <= 0){
      emailErr.emailIsIncorrect="Please enter a e-mail to verify!";
      isValid=false;
    }
    if(password.trim().length <= 0){
      passwordErr.passwordIsShort="Please enter a password";
      isValid=false;
    }

    setEmailErr(emailErr);
    setPasswordErr(passwordErr);
    return isValid;
  }
  return (
    <div>
    <NavigationBar
      link={Links[1].href}
      name={Links[1].hrefName}
    />
    <
    h1 className = "customer-heading" > Uber < span className = "heading-eats" > Eats < /span></h1 >
    <
    h1 className = "form-floating" > Welcome Back! < /h1> <
    div className = "form-floating" >
    <
    input type = "email"
    className = "form-control"
    id = "floatingInput"
    placeholder = "name@example.com"
    name = "email"
    type="email"
    onChange = {
      (e) => {
        setEmail(e.target.value);
      }
    }
    required
    / > <
    label
    htmlFor = "floatingInput" > Sign in with your email address < /label>
    {Object.keys(emailErr).map((key)=>{
      return <div style={{color:"red"}}>{emailErr[key]}</div>
    })}
     < /
    div > <
    div className = "form-floating mb-3" >
    <
    input type = "password"
    className = "form-control"
    id = "floatingPassword"
    placeholder = "Password"
    type="password"
    name = "password"
    onChange = {
      (e) => {
        setPassword(e.target.value);
      }
    }
    required
    / > <
    label
    htmlFor = "floatingPassword" > Password < /label>
    {Object.keys(passwordErr).map((key)=>{
      return <div style={{color:"red"}}>{passwordErr[key]}</div>
    })}
     < /
    div > <
    div className = "d-grid gap-2 form-floating" >
    <
    button onClick={customerLogin} type = "button"
    className = "btn btn-outline-primary" > Continue < /button> < /
    div >
    <center>
      <h4 className='err-msg'>{customerStatus}</h4>
    </center>
    <
    /div>
  );
}
export default CustomerLogin;
