import React,{useState,useEffect} from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {useNavigate} from "react-router-dom";
//importing custom hook useFirebase
import { useFirebase } from "../context/Firebase";
import "../App.css"

const LoginPage=()=>{

    const firebase=useFirebase();
    const navigate=useNavigate();

    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");

   console.log(firebase)
   //if loggedin ridirection to homepage using react-router 
   
    useEffect(()=>{
        if(firebase.isLoggedin){
            navigate('/');
        }
    },[firebase,useNavigate]);

    //function for submit listener
    const handlesubmit=async(e)=>{
    e.preventDefault();
    console.log('login in a user')
   const resp= await firebase.sign_in_email_password(email,password);
    console.log('login was successful',resp);
    };
   

    return(
        <div className="container mt-5">
           <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control 
        onChange={(e)=>setEmail(e.target.value)}
        value={email}
        type="email" placeholder="Enter email" />
        
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control 
        onChange={(e)=>setPassword(e.target.value)}
        value={password}
        type="password" placeholder="Password" />
        </Form.Group>
      <Button onClick={handlesubmit} variant="primary" type="submit">
        Log in
      </Button>
      <h1 className="mt-5 mb-5">OR</h1>
    </Form>
    <Button className="google-btn" onClick={firebase.sign_in_Google}>
        <img className="google-logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/120px-Google_%22G%22_logo.svg.png?20230822192911" alt="Google Logo"/>
        Login with Google
    </Button>
        </div>
    )
}
export default LoginPage;