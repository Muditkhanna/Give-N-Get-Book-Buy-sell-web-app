import React,{useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
//importing custom hook useFirebase
import { useFirebase } from "../context/Firebase";

const RegisterPage=()=>{

    const firebase=useFirebase();
    const navigate=useNavigate();
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");

    
    useEffect(()=>{
        if(firebase.isLoggedin){
            navigate('/');
        }
    },[firebase,navigate]);

    //function for submit listener
    const handlesubmit=async(e)=>{
    e.preventDefault();
    console.log('signing up a user')
    const resp= await firebase.sign_up_email_password(email,password);
    console.log('account was created',resp);
    };
    

    console.log(firebase);
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
        Create Account
      </Button>
    </Form>
        </div>
    )
}
export default RegisterPage;