import React, { useEffect,useState } from "react";
import { useParams } from "react-router-dom";
import { useFirebase } from "../context/Firebase";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form"
const BookDetailPage=()=>{
    const params=useParams();
    const firebase=useFirebase();
    
    const [data,setdata]=useState(null);
    const [url,seturl]=useState(null);
    const[qnt,setqnt]=useState(1);
    console.log(params);

    useEffect(()=>{
     firebase.get_book_by_id(params.bookId)
     .then((val)=>setdata(val.data()));
    },[])

    useEffect(()=>{
     if(data){
        const imgURL=data.imageURL;
        firebase.getimgURL(imgURL)
        .then((URL)=>seturl(URL));
     }
    },[data])
    
   const placeOrder=async()=>{
   const result=await firebase.place_order(params.bookId,qnt);
   console.log('order placed',result);
   }

    if(!data){
        return(
            <h1>Loading...</h1>
        )
    }

    return <div className="container mt-5">
        <h1>{data.name}</h1>
        <img src={url} width="50%" style={{borderRadius:"20px"}}/>
        <h1><u>Details</u></h1>
        <h4>Price: ₹{data.price}</h4> <br />
        <h4>ISBN : {data.isbn}</h4>
        <h1><u>Owner Details</u></h1>
        <p> Name: {data.displayName}</p>
        <p> User email: {data.userEmail}</p>

        <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Quantity</Form.Label>
        <Form.Control 
        onChange={(e)=>setqnt(e.target.value)}
        value={qnt}
        type="Number" placeholder="Enter quantity" />
        
      </Form.Group>
        <Button onClick={placeOrder} variant="success">Buy Now</Button>
    </div>
}
export default BookDetailPage;