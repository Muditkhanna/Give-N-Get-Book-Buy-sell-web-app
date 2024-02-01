import React,{useEffect,useState} from "react";
import { useFirebase } from "../context/Firebase";
import BookCard from "../components/Card";
import {Container,Row,Col} from "react-bootstrap"

const HomePage=()=>{

    const firebase=useFirebase();
    const [books,setbooks]=useState([]);

    useEffect(()=>{
     firebase.list_all_books().then((books)=>setbooks(books.docs))
    },[]);

    return (
        <Container className="mt-5">
        <Row>
          {books.map((book) => (
            <Col key={book.id} xs={18} sm={6} md={4} lg={3} style={{marginLeft:'50px',marginRight:"20px"}}>
              <BookCard link={`/book/view/${book.id}`} id={book.id}{...book.data()} />
            </Col>
          ))}
        </Row>
      </Container>
    
    );
}
export default HomePage;