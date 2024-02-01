import React,{useState} from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useFirebase } from "../context/Firebase";
const ListingPage=()=>{

    const firebase=useFirebase();
    const [name,setName]=useState("");
    const[isbn,setIsbn]=useState("");
    const [price,setPrice]=useState("");
    const [coverimg,setCoverimg]=useState("");
    
    const handlesubmit=async(e)=>{
        e.preventDefault();
        await firebase.handle_new_listing(name,isbn,price,coverimg)
    }
    return(
        <div className="mt-5">
            <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Enter Book Name</Form.Label>
          <Form.Control 
          onChange={(e)=>setName(e.target.value)}
          value={name}
          type="text" placeholder="Book Name" />
          
        </Form.Group>
  
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>ISBN</Form.Label>
          <Form.Control 
          onChange={(e)=>setIsbn(e.target.value)}
          value={isbn}
          type="text" placeholder="ISBN Number"/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Price</Form.Label>
          <Form.Control 
          onChange={(e)=>setPrice(e.target.value)}
          value={price}
          type="text" placeholder="Book Price"/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Cover Image</Form.Label>
          <Form.Control 
          onChange={(e)=>setCoverimg(e.target.files[0])}
          type="file"/>
          </Form.Group>

        <Button onClick={handlesubmit} variant="primary" type="submit">
          Create
        </Button>
      </Form>
        </div>
    )
}
export default ListingPage;