import React from "react";
import Button from "react-bootstrap/esm/Button";
import Card from "react-bootstrap/Card";
import { useState,useEffect } from "react";
import { useFirebase } from "../context/Firebase";
import { useNavigate } from "react-router-dom";
const BookCard=(props)=>{
    const firebase=useFirebase();
    const [url,seturl]=useState(null);

const navigate=useNavigate();
   
useEffect(()=>{
    firebase.getimgURL(props.imageURL).then((url)=>seturl(url));
   },[]);

   console.log(props);
 return(
    <div className="container mt-5">
    <Card style={{ width: '18rem', }}>
      <Card.Img variant="top" src={url} />
      <Card.Body>
        <Card.Title>{props.name}</Card.Title>
        <Card.Text>
         Title of book is <b>{props.name}</b> and this book is
        sold by {props.displayName} and this book costs ₹ {props.price}
        </Card.Text>
        <Button onClick={e=>navigate(props.link)} variant="primary">View</Button>
        <h1></h1>
      </Card.Body>
    </Card>
    </div>
 )
}
export default BookCard;